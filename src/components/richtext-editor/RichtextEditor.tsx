import React, { forwardRef, Ref } from "react";
import ReactQuill from "react-quill"; // Assuming you're using ReactQuill or similar

interface RichtextEditorProps {
  formats?: string[]; // Define the type according to your needs
  modules?: any[]; // Define the type according to your needs
  theme?: string;
  [x: string]: any; // This allows for additional props
}

const RichtextEditor = forwardRef(
  ({ formats, modules, theme, ...props }: RichtextEditorProps, ref: Ref<any>) => {
    return (
      <ReactQuill
        ref={ref} // Attach the ref here
        formats={formats}
        modules={modules}
        theme={theme}
        {...props}
      />
    );
  }
);
RichtextEditor.displayName = "RichtextEditor";

export default RichtextEditor;
