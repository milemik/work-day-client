import { redirect } from "react-router";


export function UserLoggedIn() {
    if (localStorage.getItem("token")) {
        return true;
    }
    return false;
}


export function IsAuthenticated() {
    if (!UserLoggedIn) {
        return redirect("/auth/login/");
    }
    return null;
}