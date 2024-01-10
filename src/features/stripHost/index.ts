export const stripHost = (url: string): string => {
  try {
    const urlObject = new URL(url);
    return urlObject.pathname + urlObject.search + urlObject.hash;
  } catch {
    return url;
  }
};
