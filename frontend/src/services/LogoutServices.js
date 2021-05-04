export default async function LogoutServices() {
  let endpoint = "/api/auth/login/?action=Logout";
  fetch(endpoint);
}
