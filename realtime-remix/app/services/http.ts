const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const API_URL = "http://localhost:5000";

export const httpService = {
  get: <ResponseType>(url: string): Promise<ResponseType> =>
    fetch(`${API_URL}/${url}`, { headers: defaultHeaders }).then((res) => res.json()),
  post: <BodyType, ResponseType>(url: string, body: BodyType): Promise<ResponseType> =>
    fetch(`${API_URL}/${url}`, {
      headers: defaultHeaders,
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json()),
};
