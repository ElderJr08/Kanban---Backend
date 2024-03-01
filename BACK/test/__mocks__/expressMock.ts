const mockRes = (statusCode = 0) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: any = {};

  res.end = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.statusCode = statusCode;

  return res;
};

const mockReq = ({
  body = {},
  path = "",
  method = "",
  headers = {},
  params = {},
  query = {},
  data = {},
}) => {
  const req = {
    body,
    path,
    method,
    headers,
    params,
    query,
    ...data,
  };
  return req;
};

const mockNext = () => {
  const next = jest.fn().mockReturnValue({});
  return next;
};

export { mockReq, mockRes, mockNext };
