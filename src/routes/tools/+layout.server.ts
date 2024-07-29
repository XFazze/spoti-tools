import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
  const expire_mili_seconds = cookies.get("bearer_token_expire");
  if (new Date().getTime() > Number(expire_mili_seconds)) {
    redirect(301, "/");
  }
  const bearer_token = cookies.get("bearer_token");
  if (bearer_token === undefined || bearer_token === "") {
    redirect(301, "/");
  }
  return { bearer_token: bearer_token };
}
