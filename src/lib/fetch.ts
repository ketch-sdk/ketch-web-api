export default (url: string, fetchOptions: RequestInit): Promise<any> => {
  return window.fetch(url, fetchOptions).then((resp: Response) => resp.json());
};
