import { Link } from "react-router"
import WorkDays from "../components/WorkDays"

export default function WorkDaysPage() {
    return (
        <>
            <Link to="add" className="bg-cyan-500 rounded-xl font-bold text-2xl p-2">Add Work Day</Link>
            <WorkDays />
        </>
    )
}


export async function GetWorkDays() {
    try {
        const response = await fetch("http://localhost:8000/api/work-days/")
        if (!response.ok) {
            console.log("Faild to fetch data")
            return {"error": "Error fetching data"}
        }
        const resData = response.json();
        return resData;
    } catch {
        return {"error": "failed fetching data"}
    }
}