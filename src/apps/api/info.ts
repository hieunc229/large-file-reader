import fs from "fs";

import { Response, Request } from "express";
import { resError, resOK } from "./_utils/handlers";

type ReqQueryProps = {
  page: number;
  path: string;
  bytes: number
}

export default function handle(req: Request<any,any,any,ReqQueryProps>, res: Response) {

  const {  path } = req.query;

  if (!fs.existsSync(path)) {
    return resError(res, { error: "File doesn't exists"})
  }
  const fd = fs.openSync(path, 'r');
  
  const data = fs.fstatSync(fd)
  
  fs.close(fd);
  resOK(res, { data });
}