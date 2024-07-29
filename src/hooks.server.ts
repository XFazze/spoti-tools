export async function handle({ event, resolve }) {
  event.locals.bearer_token = event.cookies.get("bearer_token");
  event.locals.bearer_token_expire = event.cookies.get("bearer_token_expire");
  const response = await resolve(event);
  return response;
}
