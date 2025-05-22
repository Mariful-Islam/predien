export const SlateRenderer = ({data}) => {
  return (
    <div>
      {data &&
        JSON.parse(data)?.map((item, index) => (
          <div key={index}>
            {item.type === "paragraph" && (
              <div
                className={`${item?.align === "center" && "text-center"} ${
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
            {item.type === "heading-one" && (
              <div
                id={`head-${index + 1}`}
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
