import { NavLink } from "react-router";

export default function NavBarLink({text, toVal}) {
    return (
        <li><NavLink to={toVal} className={({isActive}) => isActive ? "text-white" : ""}>{text}</NavLink></li>
    )
}