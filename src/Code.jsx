import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const Code = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="editor1"
          width="50%" // Adjust the width as needed
          // ... other Ace Editor options ...
        />
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="editor2"
          width="50%" // Adjust the width as needed
          // ... other Ace Editor options ...
        />
      </div>
    </div>
  );
};

export default Code;
