import { createRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { convertBytes } from "./utils";
import { ArrowLeft, Document, Folder, Home } from "iconsax-react";
import { createClassStr } from "easier-class";

type Props = {
  className?: string;
  onSelect: (entity: EntityProps) => void;
};

type State = {
  path: string;
  items: EntityProps[];
};

export default function FinderView(props: Props) {
  const { onSelect, className } = props;
  const [state, setState] = useState<State>();
  const locRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (!state) {
      fetchData();
    }
  }, [state]);

  function fetchData(path?: string) {
    fetch(`/api/ls${path ? `?path=${path}` : ""}`)
      .then((rs) => rs.json() as Promise<State>)
      .then((rs) => {
        setState({
          path: rs.path,
          items: rs.items.sort(sortEntities),
        });
        locRef.current && (locRef.current.value = rs.path);
      })
      .catch((err) => {
        toast.error(err.toString());
      });
  }

  if (!state) {
    return (
      <div className={ctnClassName}>
        <i>loading...</i>
      </div>
    );
  }

  function handleBack() {
    const npath = state.path.substring(0, state.path.lastIndexOf("/"));
    fetchData(npath);
  }

  function handleInputChange(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key === "Enter") {
      fetchData(ev.currentTarget.value);
    }
  }

  function renderItem(item: EntityProps) {
    function handleClick() {
      if (item.isDirectory) {
        fetchData(item.path);
      } else {
        onSelect(item);
      }
    }

    return (
      <div className="flex flex-row py-1 gap-2" key={`en-${item.name}`}>
        {item.isDirectory ? (
          <Folder variant="Bold" className="text-blue-600 mt-[2px]" size={12} />
        ) : (
          <Document className="opacity-40 mt-[2px]" size={12} />
        )}
        <label
          onClick={handleClick}
          className="flex-1 cursor-pointer md:hover:text-blue-600 break-all"
        >
          {item.name}
        </label>
        <span className="whitespace-nowrap opacity-40">
          {convertBytes(item.size)}
        </span>
      </div>
    );
  }

  return (
    <div className={createClassStr(ctnClassName, className)}>
      <div className="p-2">
        <div className="flex flex-row items-center border rounded-lg">
        <button className="px-2" onClick={handleBack}>
          <ArrowLeft size={14} />
        </button>
        <input
          ref={locRef}
          className="w-full p-2 outline-none bg-zinc-100 border-x"
          onKeyDown={handleInputChange}
          placeholder={state.path}
        />
        <button className="px-2" onClick={() => fetchData()}>
          <Home size={14} />
        </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 divide-y">
        {state.items.map(renderItem)}
      </div>
    </div>
  );
}

const ctnClassName = "flex flex-col w-[280px] bg-white h-screen text-xs";

function sortEntities(a: EntityProps, b: EntityProps) {
  // Sắp xếp ưu tiên isDirectory là true
  if (a.isDirectory && !b.isDirectory) {
    return -1; // a đứng trước b
  } else if (!a.isDirectory && b.isDirectory) {
    return 1; // b đứng trước a
  } else {
    // Nếu cả hai isDirectory là true hoặc false thì sắp xếp theo tên
    if (a.name < b.name) {
      return -1; // a đứng trước b
    } else if (a.name > b.name) {
      return 1; // b đứng trước a
    } else {
      return 0; // giữ nguyên thứ tự
    }
  }
}
