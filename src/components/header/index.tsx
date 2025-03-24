import { useParams } from "react-router";
import { CopyIcon, ResetIcon, ShareIcon } from "../../assets/icons";
import { useAppContext } from "../../context/AppStateProvider";
import "./style.css";
import toast from "react-hot-toast";

export default function Header() {
  const {
    code,
    isShareBtnLoading,
    setCode,
    setIsShareBtnLoading,
    setShareLink,
    setShowModal,
  } = useAppContext();

  const params = useParams();
  const codeId = params.id;

  const isShareDisabled = !!codeId || isShareBtnLoading;
  const isCopyDisabled = !!codeId;

  function onReset() {
    if (!!codeId) return;
    if (confirm("Are you sure yow want to reset?")) {
      setCode("");
    }

    // toast(
    //   (t) => (
    //     <span>
    //       "Are you sure yow want to reset?"
    //       <div className="resetToastBtn">
    //         <button
    //           onClick={() => {
    //             setCode("");
    //             toast.dismiss(t.id);
    //           }}
    //         >
    //           Yes
    //         </button>
    //         <button onClick={() => toast.dismiss(t.id)}>No</button>
    //       </div>
    //     </span>
    //   ),
    //   {
    //     duration: Infinity,
    //   }
    // );
  }

  function onCopyCode() {
    navigator.clipboard.writeText(code);
    toast.success("Text copied to clipboard");
  }

  async function onShare() {
    if (!code.trim() || !!codeId || isShareBtnLoading) return;
    setIsShareBtnLoading(true);
    const toastId = toast.loading("Loading...");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/share-code`,
        {
          method: "POST",
          body: JSON.stringify({ code: code }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const id = data?.data?.id;
      if (id) {
        const link = window.location.origin;
        setShareLink(`${link}/${id}`);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsShareBtnLoading(false);
    toast.dismiss(toastId);
  }

  return (
    <div className="header-container">
      <h2>Code Share</h2>
      <ul className="wrapper">
        <li
          className={`icon facebook ${
            isShareDisabled ? "icon-disabled" : "icon-enabled"
          }`}
          onClick={onShare}
        >
          <span className="tooltip">Share</span>
          <ShareIcon className="text-editor-icons" />
        </li>
        <li className="icon twitter icon-enabled" onClick={onCopyCode}>
          <span className="tooltip">Copy</span>
          <CopyIcon className="text-editor-icons" />
        </li>
        <li
          className={`icon instagram ${
            isCopyDisabled ? "icon-disabled" : "icon-enabled"
          }`}
          onClick={onReset}
        >
          <span className="tooltip">Reset</span>
          <ResetIcon className="text-editor-icons" />
        </li>
      </ul>
    </div>
  );
}
