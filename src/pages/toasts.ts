import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, cookies }) => {
  const action = url.searchParams.get("action");

  if (!action) {
    return new Response(null, { status: 200 });
  }

  if (action === "clear") {
    cookies.delete("flash");
  }

  return new Response(null, { status: 200 });
};
