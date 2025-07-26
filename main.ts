import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

const PORT = 8000;
console.log(`Deno server running on http://localhost:${PORT}/`);

const handler = async (_request: Request): Promise<Response> => {
  try {
    const welcomeText = Deno.env.get("WELCOME_MESSAGE") || "Configurable text goes here!";
    const htmlTemplate = await Deno.readTextFile("./index.html");
    const finalHtml = htmlTemplate.replace("{{WELCOME_TEXT_PLACEHOLDER}}", welcomeText);

    return new Response(finalHtml, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

await serve(handler, { port: PORT });