import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import { CopyIcon, ResetIcon, ShareIcon } from "../../assets/icons";
import {Modal} from "./../modal"

function TextEditor() {
  const [code, setCode] = useState("");
  const [isShareBtnLoading, setIsShareBtnLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [modal, setModal] = useState(false);

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

  function onReset() {
    if (confirm("Are you sure yow want to reset?")) {
      setCode("");
    }
  }

  function onCopyCode() {
    navigator.clipboard.writeText(code);
    alert("Text copied to clipboard");
  }

  function onCopyLink(){
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard"); 
  }

  async function onShare() {
    if(!code.trim()) return;
    setIsShareBtnLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/share-code`, {
      method: "POST",
      body: JSON.stringify({ code: code }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const id = data?.data?.id;
    if(id){
        const link = window.location.origin;
        setShareLink(`${link}/${id}`);
        setModal(true);
    }
    setIsShareBtnLoading(false);
  }

  function hideModal(){
    setModal(false);
  }

  return (
    <div className="main-container">
      <h2 className="header">Code Share</h2>
      <div className="editor-container">
        <div className="editor-header">
          <button className="icon-btn" disabled={!!codeId || isShareBtnLoading} onClick={onShare}>
            <ShareIcon className="text-editor-icons" />
          </button>
          <button className="icon-btn" onClick={onCopyCode}>
            <CopyIcon className="text-editor-icons" />
          </button>
          <button className="icon-btn" disabled={!!codeId} onClick={onReset}>
            <ResetIcon className="text-editor-icons" />
          </button>
        </div>
        <div className="editor-content">
          <Editor
            placeholder="// Write your code here"
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => highlight(code, languages.js, 'js')}
            padding={10}
            style={{ height: "75vh" }}
            textareaClassName="text-editor"
            readOnly={!!codeId}
          />
        </div>
      </div>
      <Modal show={modal} handleClose={hideModal}>
            <p>Copy this link: {shareLink}</p>
            <button onClick={onCopyLink}>Copy</button>
      </Modal>
    </div>
  );
}

export default TextEditor;


