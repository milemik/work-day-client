import { Link, redirect } from "react-router"
import WorkDays from "../components/WorkDays"

export default function WorkDaysPage() {
    return (
        <div className="grid gap-4 justify-items-center pt-4">
            <Link to="add" className="bg-cyan-500 rounded-xl font-bold text-2xl p-2">Add Work Day</Link>
            <WorkDays />
        </div>
    )
}


export async function GetWorkDays() {
    if (!localStorage.getItem("token")) {
        return redirect("/auth/login/");
    }
    try {
        const response = await fetch("http://localhost:8000/api/work-days/", {
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
            console.log("Faild to fetch data")
            return {"error": "Error fetching data"}
        }
        const resData = response.json();
        return resData;
    } catch {
        return {"error": "failed fetching data"}
    }
}