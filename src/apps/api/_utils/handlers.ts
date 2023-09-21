import { Response } from "express";

export function resError(
  res: Response,
  options?: { error?: string | Error; status?: number }
) {
  const { status = 400 } = options || {};
  const error = options.error
    ? typeof options.error === "string"
      ? options.error
      : options.error.toString()
    : "Failed";
  res.status(status).json({
    error,
  });
}

export function resOK(res: Response, options?: { data: any; status?: number }) {
  const { status = 200, data = { status: "ok" } } = options || {};

  res.status(status).json(data);
}
