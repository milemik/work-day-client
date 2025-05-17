import { NavLink } from "react-router";

export default function NavBarLink({text, toVal}) {
    return (
        <li><NavLink to={toVal} className={({isActive}) => isActive ? "text-amber-200" : ""}>{text}</NavLink></li>
    )
}