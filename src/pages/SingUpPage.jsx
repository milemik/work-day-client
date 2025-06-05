import { redirect, Form, Link, useActionData } from "react-router";

export default function SignUpPage() {

    const data = useActionData();
    return (
        <div className="justify-items-center grid gap-4">
            <h1 className="text-4xl font-bold text-center">Sign Up</h1>
            {data && <h1 className="text-2xl font-bold text-red-500">{data.email}</h1>}
            <Form method="post" className="grid gap-4 max-w-96">
                <input className="border-2 rounded-2xl p-4" id="email" type="text" name="email" placeholder="EMAIL" required />
                <input className="border-2 rounded-2xl p-4" id="password" type="password" name="password" placeholder="PASSWORD" required />
                <input className="bg-cyan-500 rounded-xl font-bold text-2xl cursor-pointer" type="submit" value={"SIGN UP"} />
            </Form>
            <p>Already have an account? <Link to="/auth/login/" className="text-blue-500 cursor-pointer">Login here</Link></p>
        </div>
    )
}


export async function action({request}) {
    const data = await request.formData();
    const requestData = {
        email: data.get("email"),
        password: data.get("password"),
    }
    try {
        const response = await fetch("http://localhost:8000/api/users/create/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestData)
        })
        if (!response.ok) {
            return response;
        }
        return redirect("/auth/login/");
    } catch {
        return new Response(JSON.stringify({error: "Server error"}), {status: 500, headers: {"Content-Type": "application/json"}});
    }
}