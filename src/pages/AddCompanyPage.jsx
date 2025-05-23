import { Form, redirect } from "react-router";


export default function AddCompanyPage() {
    return (
        <div className="justify-items-center grid gap-4">
            <h1 className="text-4xl">Add company</h1>
            <Form method="post" className="grid gap-4">
                <input className="rounded-xl border-2 border-blue-500 p-2" name="name" id="name" placeholder="Company Name" type="text" required/>
                <select className="rounded-xl border-2 border-blue-500 p-2" id="type" name="type" required>
                    <option className="font-bold" value="BASE">BASE</option>
                    <option className="font-bold" value="PARTNER">PARTNER</option>
                </select>
                <input className="bg-cyan-500 rounded-xl font-bold text-2xl" type="submit" value="ADD" />
            </Form>
        </div>
    )
}


export async function AddCompany({ request, params }) {
    const data = await request.formData();

    const reqData = {
        name: data.get("name"),
        type: data.get("type")
    }
    try {
        const response = await fetch("http://localhost:8000/api/companies/add/",
            { 
                method: "POST",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(reqData) 
            })
        if (!response.ok) {
            const resData = response.json();
            console.log(resData);
            return { "error": "error creating company" }
        }
        return redirect("companies/")
    } catch {
        return { "error": "server error" }
    }

}