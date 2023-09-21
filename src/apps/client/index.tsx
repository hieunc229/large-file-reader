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

type State = {
  path: string;
  page: number;
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
  }, [params, content]);

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
      `/api/content?path=${nstate.path}&page=${nstate.page}&bytes=${pageSize}`
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

  return (
    <div className="h-screen w-screen bg-zinc-100 flex flex-col">
      <ContentView content={content} />
      <div className="flex flex-row gap-4 py-2 px-4 items-center text-xs bg-white shadow-lg">
        {state?.path && stats ? (
          <>
            <p className="flex-1">
              <Input
                onKeyDown={handleSetPath}
                name="path"
                className="flex-1"
                placeholder={`${decodeURIComponent(state.path)} (${convertBytes(stats.size)})`}
              />
              
            </p>
            <Button theme="lightC1" onClick={prev} icon={ArrowLeft} />
            <Input
              // className="w-"
              placeholder={formatNumber(state.page) as any}
              onKeyDown={handleNavigate}
            />
            / {formatNumber(Math.floor(stats.size / pageSize))} pages
            <Button theme="lightC1" onClick={next} icon={ArrowRight} />
          </>
        ) : (
          <Input
            onKeyDown={handleSetPath}
            name="path"
            className="flex-1"
            placeholder="File path, then Enter"
          />
        )}
      </div>
      <Toaster />
    </div>
  );
}

function convertBytes(bytes: number) {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const convertedValue = (bytes / Math.pow(1024, i)).toFixed(2);
  return `${convertedValue} ${sizes[i]}`;
}

function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
