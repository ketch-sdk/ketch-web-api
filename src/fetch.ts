export default async (url: string, fetchOptions: RequestInit): Promise<any> => {
  const resp = await fetch(url, fetchOptions)
  return resp.json()
}
