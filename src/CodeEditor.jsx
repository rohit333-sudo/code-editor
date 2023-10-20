import React, { useState, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import FileSaver from "file-saver";
import copy from "clipboard-copy";
// import prettier from "prettier";

const CodeEditor = () => {


  
  const [sliderValue, setSliderValue] = useState(17); // Initial value

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(Number(newValue));
    // setCode(code)
    // console.log(code,typeof sliderValue)
  }

  const [code, setCode] = useState(
    'function helloWorld() {\n  console.log("Hello, World!");\n}'
  );
  const [locked, setLocked] = useState(false);
  const editorRef = useRef(null);
  const [copied, setCopy] = useState("copy");

  const [saved, setsave] = useState("save");

  const [fileName, setFileName] = useState("code.txt"); // Default file name

  const [clear, setClear] = useState("Clear All");

  const handleCopy = () => {
    setCopy("Copied ...!");
    setTimeout(() => {
      setCopy("copy");
    }, 1000);

    console.log(code);
    copy(code) // Use clipboard-copy to copy text to the clipboard
      .then(() => {
        // alert('Code copied to clipboard');
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  const handleSave = () => {
    setsave("Saved ...!");
    setTimeout(() => {
      setsave("save");
    }, 1000);

    const content = code;

    // Create a Blob with the content
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

    // Use FileSaver.js to save the Blob as a text file with the user's chosen file name
    FileSaver.saveAs(blob, fileName);
  };

  const handleLockUnlock = () => {
    setLocked((prevState) => !prevState);
  };
  const handleClear = () => {
    setClear("Cleared ...!");
    setTimeout(() => {
      setClear("Clear All");
    }, 1000);
    setCode('function helloWorld() {\n  console.log("Hello, World!");\n}');
  };
  
  return (
    <div>
  
  <div className="btn-container">
  <div className="font-size-container">

 
<label className="font-size">font size</label>
<input
 type="range"
 min="17" 
 max="30"
 value={sliderValue}
 onChange={handleSliderChange}
/> 
<span> {sliderValue} </span> 
</div>
        <button onClick={handleCopy}>
          <i className="fa-regular fa-copy"></i>
          {copied}
        </button>
        <button onClick={handleSave}>
          <i className="fa-regular fa-floppy-disk"></i>
          {saved}
        </button>
        <button onClick={handleClear}>
          <i className="fa-regular fa-note-sticky"></i>
          {clear}
        </button>
        <button onClick={handleLockUnlock}>
          {locked ? (
            <i className="fa-solid fa-lock"></i>
          ) : (
            <i className="fa-solid fa-unlock"></i>
          )}
          {locked ? "Lock" : "Unlock"}
        </button>
      </div>
      <div>
        <label htmlFor="fileName">File Name:</label>
        <input
          type="text"
          id="fileName"
          value={fileName}
          placeholder="Enter file name"
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>

      <AceEditor
        ref={editorRef}
        mode="javascript"
        theme="monokai"
        onChange={(newCode) => setCode((newCode))}
        name="code-editor"
        fontSize={sliderValue}
        showPrintMargin={true}
        showGutter={!locked}
        highlightActiveLine={true}
        readOnly={locked}
        value={code}
      showFindButton={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          tabSize: 2, // Specify your desired tab size
        }}
        style={{ width: "100%", height: "400px", marginTop: "20px" }}
      />
    </div>
  );
};

export default CodeEditor;
