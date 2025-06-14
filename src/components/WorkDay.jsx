import { Link } from "react-router"

export default function WorkDay({workDay}) {
    return (
        <li key={workDay.uuid} className="grid gap-4">
            <div className="flex gap-4 bg-blue-300 rounded-2xl p-4">
                <h3 className="text-xl font-bold w-full">{workDay.company.name}</h3>
                <div className="justify-items-center w-full">
                    <p className=" ">DATE:</p>
                    <p className="font-bold">{workDay.date}</p>
                </div>
                <div className="justify-items-center w-full">
                    <p>HOURS WORKED:</p>
                    <p>{workDay.hours_worked}</p>
                </div>
                <div className="grid gap-4 w-full">
                    <p>WORK DESCRIPTION</p>
                    <p>{workDay.work_description}</p>
                </div>
                <Link to={`/work-days/add/?id=${workDay.uuid}`} className="rounded-xl font-bold text-2xl p-2 hover:text-white">Edit</Link>
            </div>
            
        </li>
    )
}