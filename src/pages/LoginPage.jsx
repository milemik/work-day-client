import { Form, useActionData, redirect, useNavigation, Link } from "react-router";

export default function LoginPage() {
    const data = useActionData();

    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="justify-items-center grid gap-4">
            <h1 className="text-4xl font-bold text-center">Login</h1>
            { data && data.detail &&
                <h2 className="text-2xl text-red-500 font-semibold text-center">{data.detail}</h2>
            }
            { data && data.error &&
                <h2 className="text-2xl text-red-500 font-semibold text-center">{data.error}</h2>
            }
            <Form method="post" className="grid gap-4 max-w-96">
                <input className="border-2 rounded-2xl p-4" id="email" type="text" name="email" placeholder="EMAIL" required />
                <input className="border-2 rounded-2xl p-4" id="password" type="password" name="password"  placeholder="PASSWORD" required />
                <input className="bg-cyan-500 rounded-xl font-bold text-2xl cursor-pointer" type="submit" value={isSubmitting? "Submitting..." : "LOGIN"} />
            </Form>
            <p>Dont have account <Link to="/auth/singup/" className="cursor-pointer text-blue-500">register here</Link></p>
        </div>
    )
}

export async function LoginAction({request}) {
    const data = await request.formData();
    const requestData = {
        email: data.get("email"),
        password: data.get("password"),
    }
    try {
        const response = await fetch("http://localhost:8000/api/token/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestData)
        })
        if (!response.ok) {
            return response
        }
        const responseData = await response.json();
        localStorage.setItem("token", responseData.access);
        return redirect("/")
    } catch {
        return new Response(JSON.stringify({error: "Server error"}), {status: 500, headers: {"Content-Type": "application/json"}});
    }
}