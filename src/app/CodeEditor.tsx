import MonacoEditor from '@monaco-editor/react';

export default function CodeEditor() {
  return (
    <MonacoEditor
    height="100%"
    defaultLanguage="javascript"
    defaultValue="// Your code here"
    options={{
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
    }}
  />
  )
}
