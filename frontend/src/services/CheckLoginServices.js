export default async function CheckLoginServices() {
  let endpoint = "/api/auth/login";

  let result = fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => res.json());

  return result;
}
