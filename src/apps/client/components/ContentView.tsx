import { createClassStr } from "easier-class";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

type Props = {
  content?: string;
  className?: string;
  fileName: string
};

export default function ContentView(props: Props) {
  const { content, className, fileName } = props;

  let lang = fileName.toLowerCase().split(".").pop();

  const html = lang in Prism.languages ? Prism.highlight(content, Prism.languages[lang], lang) : content;

  return (
    <div
      className={createClassStr(
        "flex-1 overflow-y-auto whitespace-break-spaces p-4 md:py-6 text-xs w-full",
        className
      )}
    >
      <div className="w-full mx-w-[960px] mx-auto break-all">
        <code dangerouslySetInnerHTML={{ __html: html || "(no content)" }} />
      </div>
    </div>
  );
}
