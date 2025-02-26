import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import List from "@editorjs/list";

const EDITTOR_HOLDER_ID = "editor";

const Editor = (props) => {
  const ejInstance = useRef(null);
  const [editorData, setEditorData] = useState(props.data);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: "ERROR",
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async (api, event) => {
        editor
          .save()
          .then((outputData) => {
            props.setData((prevState) => ({
              ...prevState,
              blocks: outputData.blocks,
            }));
            setEditorData(outputData);
          })
          .catch((error) => {
            console.log("Saving failed: ", error);
          });
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [1],
            defaultLevel: 1,
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {},
          data: {
            withHeadings: true,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
      },
    });
  };

  return (
    <div id={EDITTOR_HOLDER_ID} className="py-2 bg-white rounded-md h-fit" />
  );
};

export default Editor;
