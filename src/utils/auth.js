import { redirect } from "react-router";


export function UserLoggedIn() {
    const token = localStorage.getItem("token");
    if (token) {
        return token;
    }
    return null;
}


export function IsAuthenticated() {
    return UserLoggedIn();
}