import type { MetaFunction, LinksFunction, ActionFunction } from "@remix-run/react";

import stylesUrl from "../styles/index.css";
import * as React from "react";
import { redirect } from "@remix-run/node";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const action: ActionFunction = async ({ request }) => {
  const userName = new URLSearchParams(await request.text()).get("userName") as string;
  return redirect(`/game/${userName}`);
};

export default function Index() {
  return (
    <form method="post">
      <input name="userName" placeholder="Username" />
      <button>Submit</button>
    </form>
  );
}
