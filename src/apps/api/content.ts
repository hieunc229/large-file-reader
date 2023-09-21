import fs from "fs";

import { Response, Request } from "express";
import { resError } from "./_utils/handlers";

type ReqQueryProps = {
  page: number;
  path: string;
  bytes: number
}

export default function handle(req: Request<any,any,any,ReqQueryProps>, res: Response) {

  const { page, path, bytes = 5000 } = req.query;

  if (!fs.existsSync(path)) {
    return resError(res, { error: `File doesn't exists: ${path}`})
  }

  res.setHeader("content-length", bytes);
  
  fs.createReadStream(path, { start: page * bytes, end: (page + 1) * bytes })
    .pipe(res)
 
  
}