import './style.css';
import { useAppContext } from '../../context/AppStateProvider';

export function Modal(){

  const { shareLink, showModal, setShowModal } = useAppContext();

  function hideModal() {
    setShowModal(false);
  }

  function onCopyLink() {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard");
  }
  const showHideClassName = showModal ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <p>Copy this link: {shareLink}</p>
        <button onClick={onCopyLink}>Copy</button>
        <button type="button" onClick={hideModal}>
          Close
        </button>
      </section>
    </div>
  );
};
