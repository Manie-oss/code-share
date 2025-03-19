import { useState } from 'react'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import {CopyIcon, ResetIcon, ShareIcon} from './assets/icons.jsx';
import './App.css'

function App() {
  const [code, setCode] = useState('');

function onReset(){
  if (confirm("Are you sure yow want to reset?")) {
    setCode('');
  }
}

function onCopy(){
  navigator.clipboard.writeText(code);
  alert('Text copied to clipboard');
}

async function onShare() {
  const response = await fetch("http://localhost:3000/share-code", {
    method: "POST",
    body: JSON.stringify({ code: code }),
    headers: {
      "Content-Type": "application/json",
    }
  });
  const data = await response.json();
  console.log('response: ', data);
}

  return (
    <div className='main-container'>
      <h2 className='header'>Code Share</h2>
      <div className='editor-container'>
        <div className='editor-header'>
          <button className='icon-btn' onClick={onShare}><ShareIcon className='text-editor-icons'/></button>
          <button className='icon-btn' onClick={onCopy}><CopyIcon className='text-editor-icons'/></button>
          <button className='icon-btn' onClick={onReset}><ResetIcon className='text-editor-icons'/></button>
        </div>
        <div className='editor-content'>
          <Editor
            placeholder='// Write your code here'
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{height: '75vh'}}
            textareaClassName='text-editor'
          />
        </div>
      </div>
    </div>
  );
}

export default App;
