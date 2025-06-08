import { redirect } from "react-router";

export async function action() {
    localStorage.removeItem("token");
    return redirect("/");
}