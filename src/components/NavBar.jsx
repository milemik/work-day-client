import { Form, useRouteLoaderData } from "react-router";
import NavBarLink from "./NabBarLink";

export default function NavBar() {

    const token = useRouteLoaderData("root");

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-md py-4 fixed top-0 left-0 w-full z-50">
            <ul className="flex justify-center gap-8 text-xl font-semibold">
                <NavBarLink toVal={"/"} text={"Home"} />
                {!token && <>
                    <NavBarLink toVal={"auth/login"} text={"Login"} />
                </>}
                {token && 
                    <>
                        <NavBarLink toVal={"work-days/"} text={"WorkDays"} />
                        <NavBarLink toVal={"companies/"} text={"Companies"} />     
                        <li>
                            <Form method="post" action="/auth/logout/">
                                <button type="submit" className="font-semibold cursor-pointer">Logout</button>
                            </Form>
                        </li>
                    </>
                }
                
            </ul>
        </nav>
    );
}
