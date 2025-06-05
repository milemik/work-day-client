import { Link, redirect } from "react-router";
import Companies from "../components/Companies";

export default function CompanyPage() {
    return (
        <div className="grid gap-4 justify-items-center pt-4">
            <Link to="add" className="coursor-pointer bg-blue-300 p-4 rounded-2xl">Add company</Link>
            <Companies />
        </div>
    )
}

export async function GetCompanies() {
    const response = await fetch("http://localhost:8000/api/companies/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    if (response.status === 401 || response.status === 403) {
        return redirect("/auth/login/");
    }
    if (!response.ok) {
        return response;
    }
    return response;
}