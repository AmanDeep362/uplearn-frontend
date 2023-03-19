import 'suneditor/dist/css/suneditor.min.css'
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import React, { useState } from "react";



export default function TextEditor() {
    const handleEditorChange = content => {
        console.log(content); 
    }
  return (
  <SunEditor
  style={{margin:"10%"}}
  // setContents="My contents"
  onChange={handleEditorChange}
  showToolbar={true}
  setOptions={{
    buttonList: [
      [
        'undo', 'redo',
        'font', 'fontSize', 'formatBlock',
        'paragraphStyle', 'blockquote',
        'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript',
        'fontColor', 'hiliteColor', 'textStyle',
        'removeFormat',
        'outdent', 'indent',
        'align', 'horizontalRule', 'list', 'lineHeight',
        'table', 'link', 'image', 'video', 'audio', /** 'math', */ // You must add the 'katex' library at options to use the 'math' plugin.
        /** 'imageGallery', */ // You must add the "imageGalleryUrl".
        'fullScreen', 'showBlocks', 'codeView',
        'preview', 'print', 'save', 'template',
      ]
    ]
  }}
/>
  )
}
