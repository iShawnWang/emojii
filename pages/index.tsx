import type { NextPage } from "next";
import { useState } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

const Home: NextPage = () => {
  const [text, setText] = useState("");

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
          marginTop: "30vh",
          marginBottom: "5vh",
        }}
      >
        <input
          style={{ width: "20vw" }}
          type="text"
          placeholder="请输入文字"
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
        />
        <button
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
      </div>
      <div
        id="text"
        style={{
          padding: "1vw",
          fontSize: 300,
          lineHeight: "100%",
          fontFamily: "Roboto,  sans-serif",
          textSizeAdjust: "none",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Home;
