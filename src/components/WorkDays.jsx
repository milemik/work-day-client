import { useLoaderData } from "react-router"
import WorkDay from "./WorkDay";

export default function WorkDays() {
    const data = useLoaderData();

    if (data.error) {
        return <div className="justify-items-center">
            <h1 className="text-4xl text-red-400 font-bold">Server error when fecthing data</h1>
        </div>
    }

    return (
        <div className="justify-items-center grid gap-4">
            <h1 className="text-4xl justify-center">Your work days</h1>
            <div>
                {data.length === 0 ? <p>No work days yet</p>: null}
                <ul className="grid gap-4">
                    {data.map((item) => <WorkDay key={item.uuid} workDay={item}/>)}
                </ul>
            </div>
        </div>
    )
}