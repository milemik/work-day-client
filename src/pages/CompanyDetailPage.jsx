import { Form, redirect, useLoaderData } from "react-router"

export default function CompanyDetailPage() {

    const data = useLoaderData();

    if (data.error) {
        return <h1 className="justify-items-center text-4xl text-red-400 font-bold">SERVER ERROR</h1>
    }

    return (
        <div className="justify-items-center grid gap-4">
            <h1 className="text-4xl">{data.name}</h1>
            <h2 className="text-3xl">{data.type}</h2>
            <Form method="delete" className="grid gap-4">
                <input type="hidden" name="companyID" value={data.uuid} />
                <input className="bg-red-500 rounded-xl font-bold text-2xl" type="submit" value="DELETE" />
            </Form>
        </div>
    )
}


export async function GetCompanyDetail({request, params}) {
    const companyId = params.companyID;
    console.log(params)

    try {
        const response = await fetch(`http://localhost:8000/api/companies/${companyId}/`, {headers: {"Content-Type": "application/json"}})
        if (!response.ok) {
            console.log("error" + response.json())
            return {"error": response.json()}
        }

        return await response.json()
    } catch {
        return {"error": "Server error"}
    }
}


export async function DeleteCompany({request, params}) {
    const data = await request.formData();
    const companyId = data.get("companyID");
    console.log(companyId)

    try {
        const response = await fetch(`http://localhost:8000/api/companies/${companyId}/delete/`, {method: "DELETE"})
        if (!response.ok) {
            console.log("error" + response.json())
            return {"error": response.json()}
        }

        return redirect("companies/")
    } catch {
        return {"error": "Server error"}
    }
}   