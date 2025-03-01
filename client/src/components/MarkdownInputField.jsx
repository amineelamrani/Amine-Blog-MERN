import MDEditor, { commands } from "@uiw/react-md-editor";
import { useSelector } from "react-redux";

export default function MarkdownInputField({ value, handleChange }) {
  const { theme } = useSelector((state) => state.user);

  return (
    <>
      <div className="flex flex-col w-full items-center gap-5">
        <h1 className="text-lg font-bold">Enter Article Content</h1>
        <div
          className="container flex flex-col lg:flex-row  w-full gap-5 px-24"
          data-color-mode={theme}
        >
          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <h1>Enter Article Content :</h1>
            <MDEditor
              preview="edit"
              name="content"
              height={500}
              value={value}
              onChange={handleChange}
              extraCommands={[commands.fullscreen]}
              textareaProps={{
                placeholder: "Please enter Markdown text",
                maxLength: 2500,
              }}
            />
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <h1>Article Preview</h1>
            <MDEditor
              preview="preview"
              value={value}
              height={500}
              commands={[]}
              extraCommands={[commands.fullscreen]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
