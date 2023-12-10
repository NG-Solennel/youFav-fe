type fetcherArgType = {
  method: "POST" | "PUT" | "GET" | "PATCH";
  token?: string;
  body?: any;
  route?: string;
  envName: string;
};

async function fetcher({
  envName,
  method,
  body,
  route,
  token,
}: fetcherArgType) {
  const baseUrl = process.env[envName];
  try {
    if (!baseUrl) throw new Error("Missing base api url");
    const response = await fetch(`${baseUrl}/${route}`, {
      method: method,
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : {
            "Content-Type": "application/json",
          },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error instanceof Error ? error.message : ""
    );
    throw error;
  }
}

export default fetcher;
