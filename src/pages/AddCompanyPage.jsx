import { Form, redirect, useNavigation, useActionData } from "react-router";
import FormError from "../components/FormError";


export default function AddCompanyPage() {
    const navigation = useNavigation();
    const actionData = useActionData();

    const isSubmitting = navigation.state === "submitting";

    console.log(actionData);
    return (
        <div className="justify-items-center grid gap-4 pt-4">
            <h1 className="text-4xl">Add company</h1>
            {actionData?.error && <FormError error={actionData.error} />}
            <Form method="post" className="grid gap-4">
                <input className="rounded-xl border-2 border-blue-500 p-2" name="name" id="name" placeholder="Company Name" type="text" required/>
                <select className="rounded-xl border-2 border-blue-500 p-2" id="type" name="type" required>
                    <option className="font-bold" value="BASE">BASE</option>
                    <option className="font-bold" value="PARTNER">PARTNER</option>
                </select>
                <input name="address" type="text" placeholder="Address" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" required/>
                <input name="city" type="text" placeholder="City" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" required/>
                <input name="country" type="text" placeholder="Country" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" required/>
                <input name="vat_number" type="text" placeholder="VAT NO" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" required/>
                <input name="email" type="email" placeholder="Email" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input name="swift" type="text" placeholder="SWIFT" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input name="iban" type="text" placeholder="IBAN" className="border-2 border-blue-500 rounded-xl p-2 text-2xl" />
                <input className="bg-cyan-500 rounded-xl font-bold text-2xl" type="submit" value={isSubmitting ? "Submiting.." :"ADD"} />
            </Form>
        </div>
    )
}


export async function AddCompany({ request, params }) {
    const data = await request.formData();

    const reqData = {
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
    try {
        const response = await fetch("http://localhost:8000/api/companies/add/",
            { 
                method: "POST",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(reqData) 
            })
        if (!response.ok) {
            const resData = await response.json();
            // return { "error": resData }
            return new Response(JSON.stringify(resData), {status: 400, headers: {"Content-Type": "application/json"}})
        }
        return redirect("/companies")
    } catch {
        return { "error": "server error" }
    }

}