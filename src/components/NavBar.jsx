import NavBarLink from "./NabBarLink";

export default function NavBar() {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-md py-4">
            <ul className="flex justify-center gap-8 text-xl font-semibold">
                <NavBarLink toVal={"/"} text={"Home"} />
                <NavBarLink toVal={"work-days/"} text={"WorkDays"} />
                <NavBarLink toVal={"companies/"} text={"Companies"} />
            </ul>
        </nav>
    );
}