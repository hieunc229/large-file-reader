import fs from "fs";
import path from "path";
import { Response, Request } from "express";
import { resOK } from "./_utils/handlers";

type ReqQueryProps = {
  page: number;
  path: string;
  bytes: number;
};

const DEFAULT_PATH = process.env.ROOT_DIR || ".";

export default function handle(
  req: Request<any, any, any, ReqQueryProps>,
  res: Response
) {
  const { path: loc = DEFAULT_PATH } = req.query;

  const data = fs
    .readdirSync(loc)
    .map((name) => {
      const fullPath = path.join(loc, name)
      const stats = fs.statSync(fullPath);
      return {
        name,
        path: fullPath,
        size: stats.size,
        isDirectory: stats.isDirectory()
      }
    });

  
  resOK(res, { data: { items: data, path: path.resolve(loc) } });
}
