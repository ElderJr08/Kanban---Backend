/* eslint-disable @typescript-eslint/ban-ts-comment */
import { format } from "date-fns";
import { Request, Response, NextFunction } from "express";

export function printDeleteOrUpdateResponse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const json = res.json;
  //@ts-ignore
  res.json = function (body) {
    const isAllowedStatusCode = [200, 201].includes(res.statusCode);
    const isAllowedPath = /^\/cards\/\d+$/.test(req.path);
    const isAllowedMethod = ["PUT", "DELETE"].includes(req.method);

    const MESSAGE = {
      DELETE: "Removido",
      PUT: "Alterado",
    };

    console.log(res);

    if (isAllowedStatusCode && isAllowedPath && isAllowedMethod) {
      console.log(
        //@ts-ignore
        `${format(new Date(), "dd/MM/yyyy HH:mm:ss")} - Card ${req.params.id} - ${req.body.titulo} - ${MESSAGE[req.method]}`,
      );
    }

    json.call(this, body);
  };
  next();
}
