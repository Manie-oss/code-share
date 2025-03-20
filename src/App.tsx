import TextEditor from "./components/text-editor";
import { Routes, Route } from "react-router";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TextEditor />} />
      <Route path="/:id" element={<TextEditor />} />
    </Routes>
  );
}

export default App;
