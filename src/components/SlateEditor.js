"use client"

import { css } from '@emotion/css'
import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate, useSlateStatic, ReactEditor } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
  Node,
} from 'slate'
import { withHistory } from 'slate-history'
import { Button, Icon, Toolbar } from './components'
import Prism from 'prismjs'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import { normalizeTokens } from '@/utils/normalize-tokens'


const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}
const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']






const SlateEditor = ({onChange, value}) => {
  const ParagraphType = 'paragraph'
  const CodeBlockType = 'code-block'
  const CodeLineType = 'code-line'

  const [data, setData] = useState(value ? value : [
    {
      type: 'paragraph',
      children: [
        { text: '' }
      ],
    },
   
  ])

  // const renderElement = useCallback(props => <Element {...props} />, [])
  // Change your ElementWrapper component to look like this:
  const ElementWrapper = props => {
    const { attributes, children, element } = props
    const editor = useSlateStatic()
    
    if (element.type === CodeBlockType) {
      const setLanguage = language => {
        const path = ReactEditor.findPath(editor, element)
        Transforms.setNodes(editor, { language }, { at: path })
      }
      return (
        <div
          {...attributes}
          className={css(`
          font-family: monospace;
          font-size: 16px;
          line-height: 20px;
          margin-top: 0;
          background: rgba(0, 20, 60, .03);
          padding: 5px 13px;
        `)}
          style={{ position: 'relative' }}
          spellCheck={false}
        >
          <LanguageSelect
            value={element.language}
            onChange={e => setLanguage(e.target.value)}
          />
          {children}
        </div>
      )
    }
    
    if (element.type === CodeLineType) {
      return (
        <div {...attributes} style={{ position: 'relative' }}>
          {children}
        </div>
      )
    }

    // FIX: Instead of rendering generic tags, pass through to your Element component 
    // so image, block-quotes, headings, list-items, etc., actually render properly!
    return <Element {...props} />
  }

  // const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  
  const renderLeaf = props => {
    const { attributes, children, leaf } = props
    const { text, ...rest } = leaf
    return (
      <span {...attributes} className={Object.keys(rest).join(' ')}>
        {children}
      </span>
    )
  }

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])


  const decorateCodeBlock = ([block, blockPath]) => {
    const text = block.children.map(line => Node.string(line)).join('\n')
    const tokens = Prism.tokenize(text, Prism.languages[block.language])
    const normalizedTokens = normalizeTokens(tokens) // make tokens flat and grouped by line
    const decorations = []
    for (let index = 0; index < normalizedTokens.length; index++) {
      const tokens = normalizedTokens[index]
      let start = 0
      for (const token of tokens) {
        const length = token.content.length
        if (!length) {
          continue
        }
        const end = start + length
        const path = [...blockPath, index, 0]
        decorations.push({
          anchor: { path, offset: start },
          focus: { path, offset: end },
          token: true,
          ...Object.fromEntries(token.types.map(type => [type, true])),
        })
        start = end
      }
    }
    return decorations
  }


  const useDecorate = () => {
    return useCallback(([node, path]) => {
      if (SlateElement?.isElement(node) && node.type === CodeBlockType) {
        return decorateCodeBlock([node, path])
      }
      return []
    }, [])
  }

  const decorateCode = useDecorate()


  const LanguageSelect = props => {
  return (
    <select
      data-test-id="language-select"
      contentEditable={false}
      className={css`
        position: absolute;
        right: 5px;
        top: 5px;
        z-index: 1;
      `}
      {...props}
    >
      <option value="css">CSS</option>
      <option value="html">HTML</option>
      <option value="java">Java</option>
      <option value="javascript">JavaScript</option>
      <option value="jsx">JSX</option>
      <option value="markdown">Markdown</option>
      <option value="php">PHP</option>
      <option value="python">Python</option>
      <option value="sql">SQL</option>
      <option value="tsx">TSX</option>
      <option value="typescript">TypeScript</option>
      <option value="liquid">Liquid</option>


    </select>
  )
}


  const CodeBlockButton = () => {
    const editor = useSlateStatic()
    const handleClick = () => {
      Transforms.wrapNodes(
        editor,
        { type: CodeBlockType, language: 'html', children: [] },
        {
          match: n => SlateElement.isElement(n) && n.type === ParagraphType,
          split: true,
        }
      )
      Transforms.setNodes(
        editor,
        { type: CodeLineType },
        { match: n => SlateElement.isElement(n) && n.type === ParagraphType }
      )
    }
    return (
      <Button
        data-test-id="code-block-button"
        active
        onPointerDown={event => {
          event.preventDefault()
        }}
        onClick={handleClick}
      >
        <Icon>code</Icon>
      </Button>
    )
  }

  const insertImage = (editor, url) => {
    const text = { text: '' } // Void nodes still require an empty text child node
    const image = { type: 'image', url, children: [text] }
    
    Transforms.insertNodes(editor, image)
    // Insert an empty paragraph below the image so the user can keep typing easily
    Transforms.insertNodes(editor, { type: 'paragraph', children: [{ text: '' }] })
  }


  const ImageButton = () => {
    const editor = useSlateStatic()
    
    const handleInsert = (event) => {
      event.preventDefault()
      const url = window.prompt('Enter the URL of the image:')
      if (!url) return
      insertImage(editor, url)
    }

    return (
      <Button
        data-test-id="image-button"
        onMouseDown={handleInsert}
      >
        <Icon>image</Icon> 
      </Button>
    )
  }


  return (
    <div className=' border px-4 py-2 focus:ring-1 ring-blue-500 rounded-md'>
    <Slate 
      editor={editor} 
      initialValue={data}
      
      
      onChange={(value)=>{
        setData(value)
        onChange(value)
      }}
    
      
    >
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />

        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
        <CodeBlockButton />
        <ImageButton /> {/* <-- Add your new button here */}

      </Toolbar>
      <Editable
        decorate={decorateCode}
        renderElement={ElementWrapper}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        className='outline-none focus:outline-none h-[300px] overflow-auto'
        
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />

      <style>{prismThemeCss}</style>
    </Slate>
    </div>
  )
}
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes(editor, newProperties)
  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}
const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )
  return !!match
}
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}
export const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes} className='list-disc ml-4'>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol className='list-decimal ml-4' style={style} {...attributes}>
          {children}
        </ol>
      )

    case 'image':
      return (
        <div {...attributes} style={{ display: 'inline-block', margin: '10px 0' }}>
          <div contentEditable={false} style={{ position: 'relative' }}>
            <img
              src={element.url}
              alt={element.alt || 'Editor image'}
              className={css`
                display: block;
                max-width: 100%;
                max-height: 20em;
                border-radius: 4px;
                box-shadow: ${useSlateStatic().selection && '0 0 0 3px #3b82f6'}; // Highlights image when selected
              `}
            />
          </div>
          {children}
        </div>
      ) 
    default:
      return (
        <div style={style} {...attributes}>
          {children}
        </div>
      )
  }
}
export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.code) {
    children = <code>{children}</code>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  return <span {...attributes}>{children}</span>
}
const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}
const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}






// Prismjs theme stored as a string instead of emotion css function.
// It is useful for copy/pasting different themes. Also lets keeping simpler Leaf implementation
// In the real project better to use just css file
const prismThemeCss = `
/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

code[class*="language-"],
pre[class*="language-"] {
    color: black;
    background: none;
    text-shadow: 0 1px white;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
}

pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
    text-shadow: none;
    background: #b3d4fc;
}

pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
code[class*="language-"]::selection, code[class*="language-"] ::selection {
    text-shadow: none;
    background: #b3d4fc;
}

@media print {
    code[class*="language-"],
    pre[class*="language-"] {
        text-shadow: none;
    }
}

/* Code blocks */
pre[class*="language-"] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
    background: #f5f2f0;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
    padding: .1em;
    border-radius: .3em;
    white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
    color: slategray;
}

.token.punctuation {
    color: #999;
}

.token.namespace {
    opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
    color: #905;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
    color: #690;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
    color: #9a6e3a;
    /* This background color was intended by the author of this theme. */
    background: hsla(0, 0%, 100%, .5);
}

.token.atrule,
.token.attr-value,
.token.keyword {
    color: #07a;
}

.token.function,
.token.class-name {
    color: #DD4A68;
}

.token.regex,
.token.important,
.token.variable {
    color: #e90;
}

.token.important,
.token.bold {
    font-weight: bold;
}
.token.italic {
    font-style: italic;
}

.token.entity {
    cursor: help;
}`

export default SlateEditor