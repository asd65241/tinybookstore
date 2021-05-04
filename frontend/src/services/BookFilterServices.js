export default async function BookFilterServices(text) {
  let result;
  if (text !== undefined && text !== "") {
    let endpoint = `/api/book/?cat=${text}`;
    result = fetch(endpoint).then((res) => res.json());
  } else {
    // Fetch All
    let endpoint = "/api/book/?get=cat";
    result = fetch(endpoint).then((res) => res.json());
  }

  return result;
}
