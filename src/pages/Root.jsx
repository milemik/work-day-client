import {Outlet} from "react-router"
import NavBar from "../components/NavBar"


export default function Root() {
    return ( 
        <> 
        <NavBar />
        <div className="pt-20">
            <Outlet />
            </div>
        </>
    )
}