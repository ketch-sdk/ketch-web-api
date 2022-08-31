export default async (url: string, fetchOptions: RequestInit): Promise<any> => {
  return fetch(url, fetchOptions).then((resp: Response) => resp.json())
}
