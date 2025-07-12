import { useLoaderData, Link } from "react-router"
import Company from "./Company"

export default function Companies() {

    const data = useLoaderData()

    return (
        <div className="justify-items-center grid gap-4">
            <h1>Your Companies</h1>
            <ul className="grid gap-4">
                {data.map((company) => <Company company={company}/>)}
            </ul>
        </div>
    )
}