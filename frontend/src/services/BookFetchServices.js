export default async function BookFetchServices(text) {
  let result;
  if (text !== undefined && text !== "") {
    let endpoint = `/api/book/?search=${text}`;
    result = fetch(endpoint).then((res) => res.json());
  } else {
    // Fetch All
    let endpoint = "/api/book/?get=all";
    result = fetch(endpoint).then((res) => res.json());
  }

  return result;
}