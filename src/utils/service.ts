
export const fetchs = async ({ url, body = {}, method = 'POST', headers = {} }: any) => {
  const response: any = await fetch(`${url}`, {
    method: method,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: Object.keys(body).length ? JSON.stringify(body) : undefined,
  }).catch(error => console.log(`error`, error));

  const resultData = await response.json();
  return resultData
}