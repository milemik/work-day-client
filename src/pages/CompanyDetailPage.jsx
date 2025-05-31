import { Form, redirect, useLoaderData, useNavigation } from "react-router"

export default function CompanyDetailPage() {
    const data = useLoaderData();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    if (data.error) {
        return <h1 className="justify-items-center text-4xl text-red-400 font-bold">SERVER ERROR</h1>
    }

    return (
        <div className="justify-items-center grid gap-4">
            <Form method="PUT" className="grid gap-4">
                <input type="hidden" name="companyID" value={data.uuid} />
                <input name="name" type="text" defaultValue={data.name} placeholder="Company Name" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input name="type" type="text" defaultValue={data.type} placeholder="Company Type" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input name="address" type="text" defaultValue={data.address} placeholder="Address" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input name="city" type="text" defaultValue={data.city} placeholder="City" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input name="country" type="text" defaultValue={data.country} placeholder="Country" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input name="vat_number" type="text" defaultValue={data.vat_number} placeholder="VAT NO" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input name="email" type="email" defaultValue={data.email} placeholder="Email" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input name="swift" type="text" defaultValue={data.swift} placeholder="SWIFT" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input name="iban" type="text" defaultValue={data.iban} placeholder="IBAN" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input className="bg-blue-500 rounded-xl font-bold text-2xl cursor-pointer p-2" type="submit" value={isSubmitting ? "Submiting...":"EDIT"}/>
            </Form>
            <Form method="delete" className="grid gap-4">
                <input type="hidden" name="companyID" value={data.uuid} />
                <input className="bg-red-500 rounded-xl font-bold text-2xl cursor-pointer p-2" type="submit" value={isSubmitting? "Deleting...": "DELETE"} />
            </Form>
        </div>
    )
}


export async function GetCompanyDetail({request, params}) {
    const companyId = params.companyID;

    try {
        const response = await fetch(`http://localhost:8000/api/companies/${companyId}/`, {headers: {"Content-Type": "application/json"}})
        if (!response.ok) {
            return {"error": response.json()}
        }

        return await response.json()
    } catch {
        return {"error": "Server error"}
    }
}


export async function CompanyAction({request, params}) {
    const data = await request.formData();
    const companyId = data.get("companyID");
    console.log(request.method);

    if (request.method === "DELETE") {
        try {
            const response = await fetch(`http://localhost:8000/api/companies/${companyId}/delete/`, {method: "DELETE"})
            if (!response.ok) {
                return {"error": response.json()}
            }

            return redirect("/companies")
        } catch {
            return {"error": "Server error"}
        }
    } else if (request.method === "PUT") {
        try {
            const requestData = {
                "name": data.get("name"),
                "type": data.get("type"),
                "address": data.get("address"),
                "city": data.get("city"),
                "country": data.get("country"),
                "vat_number": data.get("vat_number"),
                "email": data.get("email"),
                "swift": data.get("swift"),
                "iban": data.get("iban")
            }
            console.log(requestData);
            const response = await fetch(`http://localhost:8000/api/companies/${companyId}/update/`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(requestData)
            })

            if (!response.ok) {
                return {"error": response.json()}
            }

            return {"message": "Company updated successfully"}
        } catch {
            return {"error": "Server error"}
        }
    } else {
        return {"error": "Invalid request method"}
    }
}   