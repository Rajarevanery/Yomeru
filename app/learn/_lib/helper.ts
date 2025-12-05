export function isValidUrl(str: string) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function extractYoutubeId(url: string) {
  if (isValidUrl(url)) {
    const obj = new URL(url);

    if (obj.searchParams.has("v")) {
      return obj.searchParams.get("v");
    }
  } else {
    return url;
  }
}
