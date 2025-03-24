import { useAppContext } from '../../context/AppStateProvider';
import './style.css';

export function Modal(){

  const { shareLink, showModal, setShowModal } = useAppContext();

  function hideModal() {
    setShowModal(false);
  }

  function onCopyLink() {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard");
  }
  const showHideClassName = showModal ? "display-block" : "display-none";

  return (
    <div className={` backdrop ${showHideClassName}`} onClick={hideModal} >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p className="modalHeading">Copy this link</p>
        <p className="modalDescription shareLink" onClick={onCopyLink}>{shareLink}</p>

        <div className="buttonContainer">
          <button className="copyButton" onClick={onCopyLink}>Copy</button>
          <button className="closeButton" onClick={hideModal}>Close</button>
        </div>
      </div>
    </div>
  );
};
