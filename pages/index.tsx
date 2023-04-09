import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { useQueryState, queryTypes } from "next-usequerystate";

const Home: NextPage = () => {
  const [magic, setMagic] = useState(false);
  const [text, setText] = useQueryState(
    "text",
    queryTypes.string.withDefault("表情文字")
  );
  const [fontSize, setFontSize] = useQueryState(
    "fontSize",
    queryTypes.integer.withDefault(300)
  );
  const [padding, setPadding] = useQueryState(
    "padding",
    queryTypes.integer.withDefault(1)
  );
  const [dark, setDark] = useQueryState(
    "dark",
    queryTypes.boolean.withDefault(false)
  );

  console.log(text);

  useEffect(() => {
    setMagic(true);
  }, []);

  if (!magic) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "15vh",
          marginBottom: "5vh",
        }}
      >
        <textarea
          style={{ width: "20vw" }}
          defaultValue={text}
          placeholder="请输入文字"
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
        />
        <button
          title="根据可见效果生成图片(不包括边框)"
          disabled={!text}
          style={{ marginLeft: 8 }}
          onClick={() => {
            html2canvas(document.getElementById("text")!, {}).then((canvas) => {
              saveAs(canvas.toDataURL(), `${text}.png`);
            });
          }}
        >
          生成
        </button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <input
              type="range"
              min={12}
              value={fontSize}
              max={300}
              name="fontSize"
              onChange={(e) => {
                setFontSize(Number(e.target.value));
              }}
            ></input>
            <label htmlFor="fontSize">文字大小</label>
          </div>
          <div>
            <input
              name="padding"
              type="range"
              min={0}
              value={padding}
              max={10}
              onChange={(e) => {
                setPadding(Number(e.target.value));
              }}
            ></input>
            <label htmlFor="padding">留白</label>
          </div>
          <div>
            <input
              name="dark"
              type="checkbox"
              checked={dark}
              onChange={(e) => {
                setDark(e.target.checked);
              }}
            ></input>
            <label htmlFor="dark">黑色背景</label>
          </div>
        </div>
      </div>
      <pre
        id="text"
        style={{
          background: dark ? "#2F2F2F" : "#fff",
          border: "1px solid #ededed",
          padding: padding + "vw",
          fontSize: fontSize,
          lineHeight: "100%",
          color: dark ? "#fff" : "#000",
          fontFamily: "Roboto,  sans-serif",
          textSizeAdjust: "none",
          margin: 0,
        }}
      >
        {text}
      </pre>
    </div>
  );
};

export default Home;
