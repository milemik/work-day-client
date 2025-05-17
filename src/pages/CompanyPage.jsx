import { Link } from "react-router";
import Companies from "../components/Companies";

export default function CompanyPage() {
    return (
        <div className="grid gap-4 justify-items-center">
            <Link to="add" className="coursor-pointer bg-blue-300 p-4 rounded-2xl">Add company</Link>
            <Companies />
        </div>
    )
}

export async function GetCompanies() {
    const response = await fetch("http://localhost:8000/api/companies/")
    if (!response.ok) {
        return response.json()
    }
    return response.json()
}