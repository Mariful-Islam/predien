import { useRef, useState } from "react";

export const SlateRenderer = ({data}) => {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };
  return (
    <div>
      {data &&
        JSON.parse(data)?.map((item, index) => (
          <div key={index}>
            {item.type === "paragraph" && (
              <div
                className={`mb-6 ${item?.align === "center" && "text-center"} ${
                  item?.align === "left" && "text-start"
                } ${item?.align === "right" && "text-end"} ${
                  item?.align === "justify" && "text-justify"
                } `}
              >
                {item.children?.map((item, index) => (
                  <div
                    key={index}
                    className={`${item?.bold && "font-bold"} ${
                      item?.italic && " italic"
                    } ${item?.underline && "underline"}`}
                  >
                    {item?.text}
                  </div>
                ))}
              </div>
            )}

            {item.type === "block-quote" && (
              <blockquote
                className={`pl-4 my-6 italic border-l-2 ${item?.align === "center" && "text-center"} ${
                  item?.align === "left" && "text-start"
                } ${item?.align === "right" && "text-end"} ${
                  item?.align === "justify" && "text-justify"
                } `}
              >
                {item.children?.map((item, index) => (
                  <div
                    key={index}
                    className={`${item?.bold && "font-bold"} ${
                      item?.italic && " italic"
                    } ${item?.underline && "underline"}`}
                  >
                    {item?.text}
                  </div>
                ))}
              </blockquote>
            )}

            {item.type === "paragraph" && item?.children?.map((v)=>v?.code===true) && (
              <div className="relative max-w-full border rounded-lg overflow-hidden bg-gray-900 text-white my-4">
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={handleCopy}
                    className="bg-gray-700 text-sm px-2 py-1 rounded hover:bg-gray-600 transition"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre
                  ref={codeRef}
                  className="resize-y overflow-auto p-4 font-mono text-sm whitespace-pre-wrap"
                  style={{ minHeight: "100px", maxHeight: "500px" }}
                >
                  <code>
                    {item.children?.map((child, idx) => (
                      <div key={idx}>{child.text}</div>
                    ))}
                  </code>
                </pre>
              </div>
            )}


            {item.type === "heading-one" && (
              <div
                id={item.children[0].text.replace(/\s+/g, '-').toLowerCase()}
                className={`text-3xl mt-4 font-bold scroll-mt-[150px] scroll-smooth ${
                  item?.align === "center" && "text-center"
                } ${item?.align === "left" && "text-start"} ${
                  item?.align === "right" && "text-end"
                } ${item?.align === "justify" && "text-justify"} `}
              >
                {item.children?.map((item, index) => (
                  <div
                    key={index}
                    className={`${item?.bold && "font-bold"} ${
                      item?.italic && "italic"
                    } ${item?.underline && "underline"}`}
                  >
                    {item?.text}
                  </div>
                ))}
              </div>
            )}

            {item.type === "heading-two" && (
              <div
                id={item.children[0].text.replace(/\s+/g, '-').toLowerCase()}

                className={`text-2xl font-semibold ${
                  item?.align === "center" && "text-center"
                } ${item?.align === "left" && "text-start"} ${
                  item?.align === "right" && "text-end"
                } ${item?.align === "justify" && "text-justify"} `}
              >
                {item.children?.map((item, index) => (
                  <div
                    key={index}
                    className={`${item?.bold && "font-bold"} ${
                      item?.italic && " italic"
                    } ${item?.underline && "underline"}`}
                  >
                    {item?.text}
                  </div>
                ))}
              </div>
            )}

            {item.type === "bulleted-list" && (
              <ul
                className={`pl-4 pt-2 ${
                  item?.align === "center" && "text-center"
                } ${item?.align === "left" && "text-start"} ${
                  item?.align === "right" && "text-end"
                } ${item?.align === "justify" && "text-justify"} `}
              >
                {item.children?.map((item, index) => (
                  <li
                    key={index}
                    className={`${item?.bold && "font-bold"} ${
                      item?.italic && " italic"
                    } ${item?.underline && "underline"}`}
                  >
                    {item?.children[0].text}
                  </li>
                ))}
              </ul>
            )}

            {item.type === "numbered-list" && (
              <ol
                className={`pl-4 pt-2 ${
                  item?.align === "center" && "text-center"
                } ${item?.align === "left" && "text-start"} ${
                  item?.align === "right" && "text-end"
                } ${item?.align === "justify" && "text-justify"} `}
              >
                {item.children?.map((item, index) => (
                  <li
                    key={index}
                    className={`${item?.bold && "font-bold"} ${
                      item?.italic && " italic"
                    } ${item?.underline && "underline"}`}
                  >
                    {item?.children[0].text}
                  </li>
                ))}
              </ol>
            )}


            {item.type === "code" && (
               <div className="relative max-w-full border rounded-lg overflow-hidden bg-gray-900 text-white">
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={handleCopy}
                    className="bg-gray-700 text-sm px-2 py-1 rounded hover:bg-gray-600 transition"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>

                <pre
                  ref={codeRef}
                  className="resize-y overflow-auto p-4 font-mono text-sm whitespace-pre-wrap"
                  style={{ minHeight: "100px", maxHeight: "500px" }}
                >
                  <code className={`language-${language}`}>
                    {item.children?.map((item, index) => (
                      <div>

                        {item?.text}
                      </div>
                    ))}
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    
                  </code>
                </pre>
              </div>
            )}

            {/* {item.type === "" && (
                <ol className={`pl-4 pt-2 ${item?.align === "center" && 'text-center' } ${item?.align === "left" && 'text-start' } ${item?.align === "right" && 'text-end' } ${item?.align === "justify" && 'text-justify' } `}>
                  {item.children?.map((item:any, index:number)=>(
                    <li key={index} className={`${item?.bold && 'font-bold'} ${item?.italic && ' italic'} ${item?.underline && 'underline' }`}>
                      {item?.children[0].text}
                     
                    </li>
                  ))}  
                </ol>
              )} */}
          </div>
        ))}
    </div>
  );
};
