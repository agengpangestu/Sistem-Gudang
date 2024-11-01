export const joiError= (payload: any) =>  {
  return payload?.reduce((a: Record<string, string>, b:any) => {
    a[b.path[0]] = b.message.replace(/\"/g, "");
    return a
  }, {})
}