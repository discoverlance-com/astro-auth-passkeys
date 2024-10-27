import {
  validateSessionToken,
  setSessionTokenCookie,
  deleteSessionTokenCookie,
} from "./lib/auth/session";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get("__session")?.value ?? null;

  if (token === null) {
    // No Token so send user to login if they are visiting authenticated routes
    if (context.url.pathname.startsWith("/dashboard")) {
      return context.redirect("/login");
    }

    context.locals.user = null;
    context.locals.session = null;
    return next();
  }

  const { session, user } = await validateSessionToken(token);
  if (session !== null) {
    setSessionTokenCookie(context, token, session.expires_at);
  } else {
    deleteSessionTokenCookie(context);
  }

  // Redirect user to login if they are visiting authenticated routes
  // and they are unauthenticated
  if (context.url.pathname.startsWith("/dashboard") && !session) {
    return context.redirect("/login");
  }

  context.locals.session = session;
  context.locals.user = user;
  return next();
});
