export const parseLink = (link: string) => {
  let data = link;
  let arrData = data.split("link:");
  data = arrData.length === 2 ? arrData[1] : data;
  const result: {
    [key: string]: string;
  } = {};

  arrData = data.split(",");
  const regx = /<([^>]+)>;\s+rel="([^"]+)"/gi;

  for (const d of arrData) {
    const linkInfo = regx.exec(d);
    if (linkInfo && linkInfo!.length > 2) {
      result[linkInfo[2]] = linkInfo[1];
    }
  }

  return result;
};

export const parseSince = (url: string) => {
  try {
    const _url = new URL(url);
    const searchParams = new URLSearchParams(_url.search);
    return parseInt(searchParams.get("since") ?? "");
  } catch (e) {
    return null;
  }
};
