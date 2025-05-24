import NavBarLink from "./NabBarLink";


export default function NavBar() {
    return (
        <nav className="bg-gray-400">
            <ul className="flex gap-4 text-3xl">
                <NavBarLink toVal={"/"} text={"Home"}/>
                <NavBarLink toVal={"work-days/"} text={"WorkDays"}/>
                <NavBarLink toVal={"companies/"} text={"Companies"}/>                  
            </ul>
        </nav>
    )
}