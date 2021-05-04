export default async function LoginService(userId, userPw) {
  let endpoint = "/api/auth/login";
  let result = fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      username: userId,
      password: userPw,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => res.json());

  return result;
}
