import { useParams } from "react-router";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import { useAppContext } from "./../../context/AppStateProvider";
import { useEffect } from "react";
import "./style.css";

function TextEditor() {
  const { code, setCode } = useAppContext();

  const params = useParams();
  const codeId = params.id;

  async function getCode() {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/get-code/${codeId}`
    );
    const data = await response.json();
    setCode(data.data.code);
  }

  useEffect(() => {
    if (codeId) {
      getCode();
    }
  }, [codeId]);

  return (
    <div className="card">
      <div className="header">
        <div className="top">
          <div className="circle">
            <span className="red circle2"></span>
          </div>
          <div className="circle">
            <span className="yellow circle2"></span>
          </div>
          <div className="circle">
            <span className="green circle2"></span>
          </div>
          <div className="title">
            <p id="title2"></p>
          </div>
        </div>
      </div>
      <div className="code-container">
        <Editor
          placeholder="// Write your code here"
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.cpp, "cpp")}
          padding={10}
          style={{ height: "75vh", overflow: "auto"}}
          textareaClassName="text-editor"
          readOnly={!!codeId}
        />
      </div>
    </div>
  );
}

export default TextEditor;
