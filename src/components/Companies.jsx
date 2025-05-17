import { useLoaderData } from "react-router"

export default function Companies() {

    const companies = useLoaderData()

    return (
        <div className="justify-items-center grid gap-4">
            <h1>Your Companies</h1>
            <ul className="grid gap-4">
                {companies.map((company) => <li key={company.uuid} className="text-2xl bg-blue-300 rounded-2xl p-4">{company.name}</li>)}
            </ul>
        </div>
    )
}