import { Form, redirect, useLoaderData, useRouteLoaderData, useSearchParams } from "react-router";
import { useEffect, useState } from "react";


export default function AddWorkDayPage() {

    const [workDay, setWorkDay] = useState({
        company: "",
        date: "",
        hoursWorked: "",
        workDescription: ""
    });
    const accessToken = useRouteLoaderData("root");
    const companies = useLoaderData();
    const [params] = useSearchParams();
    const elId = params.get("id");
    useEffect(() => {
        if (elId) {
            const getWorkDay = async () => {
                const response = await fetch("http://localhost:8000/api/work-days/"+ params.get("id"), {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    method: "GET"
                })
                if (!response.ok) {
                    const resData = await response.json();
                    return new Response(JSON.stringify(resData), {status: response.status, headers: {"Content-Type": "application/json"}});
                }
                const data = await response.json();
                setWorkDay({
                    company: data.company.uuid,
                    date: data.date,
                    hoursWorked: data.hours_worked,
                    workDescription: data.work_description
                });
            }
            getWorkDay();
        }
    }, [elId, accessToken, params]);


    if (companies.error) {
        return <h1 className="justify-items-center text-4xl text-red-400 font-bold">SERVER ERROR</h1>
    }
    return (
        <div className="justify-items-center grid gap-4">
        <Form method={elId ? "put":"post"} className="grid gap-4 max-w-96">
            <input type="hidden" name="uuid" value={elId} />
            <label htmlFor="company">
                Select company
                <select className="rounded-xl border-2 border-blue-500 p-2" id="company" name="company" required>
                    {companies.map((company) => <option key={company.uuid} value={company.uuid} defaultValue={companies.uuid === workDay.company}>{company.name}</option>)}
                </select>
            </label>
            <input className="border-2 rounded-2xl p-4" id="date" type="date" name="date" defaultValue={workDay.date}/>
            <input className="border-2 rounded-2xl p-4" id="hoursWorked" type="number" name="hoursWorked" placeholder="Hours worked" defaultValue={workDay.hoursWorked} required />
            <textarea className="border-2 rounded-2xl p-4" id="workDescription" type="text" name="workDescription" placeholder="Work description" defaultValue={workDay.workDescription} required />
            <input className="bg-cyan-500 rounded-xl font-bold text-2xl cursor-pointer" type="submit" value="ADD" />
        </Form>
        </div>
    )
}


export async function AddWorkDay({ request }) {
    const data = await request.formData();
    const requestData = {
        company_id: data.get("company"),
        date: data.get("date"),
        hours_worked: data.get("hoursWorked"),
        work_description: data.get("workDescription")
    }
    if (request.method === "PUT") {
        try {
            const response = await fetch(`http://localhost:8000/api/work-days/${data.get("uuid")}/update/`, {
                method: request.method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(requestData)
            })
            if (!response.ok) {
                const resData = await response.json();
                return { "error": resData }
            }
            return redirect("/work-days")
        } catch {
            return { "error": "server error" }
        }
    }
    else {
        try {
            const response = await fetch("http://localhost:8000/api/work-days/add/", {
                method: request.method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(requestData)
            })
            if (!response.ok) {
                const resData = await response.json();
                return { "error": resData }
            }
            return redirect("/work-days")
        } catch {
            return { "error": "server error" }
        }
    }
}