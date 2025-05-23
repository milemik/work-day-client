import { Form, redirect, useLoaderData } from "react-router";

export default function AddWorkDayPage() {

    const companies = useLoaderData();

    if (companies.error) {
        return <h1 className="justify-items-center text-4xl text-red-400 font-bold">SERVER ERROR</h1>
    }
    return (
        <Form method="post" className="grid gap-4">
            <label htmlFor="company">
                Select company
                <select className="rounded-xl border-2 border-blue-500 p-2" id="company" name="company" required>
                    {companies.map((company) => <option value={company.uuid}>{company.name}</option>)}
                    <option value="2">Comp 2</option>
                </select>
            </label>
            <input id="date" type="date" name="date" />
            <input id="hoursWorked" type="number" name="hoursWorked" placeholder="Hours worked" required />
            <input id="workDescription" type="text" name="workDescription" placeholder="Work description" required />
            <input className="bg-cyan-500 rounded-xl font-bold text-2xl" type="submit" value="ADD" />
        </Form>
    )
}


export async function AddWorkDay({ request, params }) {
    const data = await request.formData();
    const requestData = {
        company_id: data.get("company"),
        date: data.get("date"),
        hours_worked: data.get("hoursWorked"),
        work_description: data.get("workDescription")
    }
    try {
        const response = await fetch("http://localhost:8000/api/work-days/add/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        })
        if (!response.ok) {
            const resData = await response.json();
            console.log(resData);
            return { "error": "error creating work day" }
        }
        return redirect("/work-days")
    } catch {
        return { "error": "server error" }
    }
}