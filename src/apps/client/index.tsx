import "./styles.css";

import toast from "react-hot-toast";
import Input from "components/form/input";
import Button from "components/form/button";
import ContentView from "./components/ContentView";

import type { Stats } from "fs";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import FinderView from "./components/FinderView";
import { convertBytes, formatNumber } from "./components/utils";

type State = {
  path: string;
  page: number;
  size?: number;
};

const pageSize = 5000;

export default function Home() {
  const [params] = useSearchParams();

  const [state, setState] = useState<State | undefined>();
  const [content, setContent] = useState("");
  const [stats, setStats] = useState<Stats | undefined>();

  useEffect(() => {
    if (params.get("path") && !content) {
      fetchContent({
        path: params.get("path"),
        page: parseInt(params.get("page") || "0"),
      });
      fetchStats(params.get("path"));
    }

    document.addEventListener("keydown", handleKeyDown);

    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [params, content]);

  function handleKeyDown(ev: KeyboardEvent) {
    if (!ev.shiftKey && content) {
      switch (ev.key) {
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
      }
    }
  }

  function next() {
    setPage(state.page + 1);
  }

  function prev() {
    setPage(state.page - 1);
  }

  function setPage(no: number) {
    const nstate = { ...state, page: no };
    fetchContent(nstate);
  }

  function fetchStats(path: string) {
    fetch(`/api/info?path=${path}`)
      .then((rs) => rs.json())
      .then(setStats)
      .catch((err) => {
        toast.error(err.toString());
      });
  }

  function fetchContent(nstate: State) {
    setState(nstate);

    fetch(
      `/api/content?path=${nstate.path}&page=${nstate.page}&bytes=${
        nstate.size || pageSize
      }`
    )
      .then((rs) => rs.text())
      .then((rs) => {
        setContent(rs);
      })
      .catch((err) => {
        toast.error(err.toString());
      });
  }

  function handleSetPath(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key === "Enter") {
      const path = encodeURIComponent(ev.currentTarget.value);
      fetchContent({ path, page: 0 });
      fetchStats(path);
    }
  }

  function handleNavigate(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key === "Enter") {
      fetchContent({
        ...state,
        page: parseInt(ev.currentTarget.value.replace(/\./, "")),
      });
      ev.currentTarget.value = "";
    }
  }

  function handleFileSelected(entity: EntityProps) {
    setStats(entity as any);
    fetchContent({
      path: entity.path,
      page: 0,
      size: entity.size > pageSize ? pageSize : entity.size,
    });
  }

  return (
    <div className="h-screen w-screen bg-zinc-100 flex flex-row">
      <FinderView className="shadow-lg" onSelect={handleFileSelected} />
      <div className="flex-1 flex flex-col border-l">
        <div className="flex flex-row gap-4 py-1 px-4 items-center text-xs bg-white border-b">
          {stats ? (
            <>
              <p className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                {state.path.split("/").pop()}{" "}
                <span className="opacity-40">({convertBytes(stats.size)})</span>
              </p>
              <Button
                size="sm"
                theme="lightC1"
                onClick={prev}
                icon={ArrowLeft}
              />
              <Input
                placeholder={formatNumber(state.page) as any}
                onKeyDown={handleNavigate}
              />
              / {formatNumber(Math.floor(stats.size / pageSize))} pages
              <Button
                size="sm"
                theme="lightC1"
                onClick={next}
                icon={ArrowRight}
              />
            </>
          ) : (
            <i className="py-2">(no file selected)</i>
          )}
        </div>
        <ContentView content={content} fileName={state?.path || ""} />
      </div>
      <Toaster />
    </div>
  );
}
