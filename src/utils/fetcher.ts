type fetcherArgType = {
  method: "POST" | "PUT" | "GET" | "PATCH" | "DELETE";
  token?: string;
  body?: any;
  route?: string;
  envName: string;
  withoutContentType?: boolean;
};

async function fetcher({
  envName,
  method,
  body,
  route,
  token,
  withoutContentType,
}: fetcherArgType) {
  const baseUrl = process.env[envName];
  if (!baseUrl) throw new Error("Missing base api url");

  const response = await fetch(`${baseUrl}/${route}`, {
    method: method,
    headers:
      token && !withoutContentType
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : token && withoutContentType
        ? {
            Authorization: `Bearer ${token}`,
          }
        : { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
  if (!response.ok) {
    return response.status;
  }
  const data = await response.json();
  return data;
}

export default fetcher;
