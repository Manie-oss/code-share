import { Modal } from "./components/modal";
import Header from "./components/header";
import TextEditor from "./components/text-editor";
import './App.css';

function App() {
  return (
    <div className="main-container">
      <div className="editor-container">
        <Header />
        <TextEditor />
      </div>
      <Modal />
    </div>
  );
}

export default App;
