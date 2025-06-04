export async function action() {
    localStorage.removeItem("token");
    return null;
}