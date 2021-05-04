export default async function BookDetailsServices(BookId) {
  let result;
  if (BookId !== undefined && BookId !== "") {
    let endpoint = `/api/book/?id=${BookId}`;
    result = fetch(endpoint).then((res) => res.json());
  } 

  return result;
}
