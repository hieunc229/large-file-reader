import { createClassStr } from "easier-class";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

type Props = {
  content?: string;
  className?: string;
};

export default function ContentView(props: Props) {
  const { content, className } = props;

  const html = Prism.highlight(content, Prism.languages.xml, "xml");

  return (
    <div
      className={createClassStr(
        "flex-1 overflow-y-auto whitespace-break-spaces p-4 md:p-8 text-xs w-full",
        className
      )}
    >
      <div className="max-w-full w-[960px] mx-auto">
        <code dangerouslySetInnerHTML={{ __html: html || "(no content)" }} />
      </div>
    </div>
  );
}
