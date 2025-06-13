import { Form } from "react-router"

export default function WorkDay({workDay}) {
    return (
        <li key={workDay.uuid}>
            <Form className="flex gap-4 bg-blue-300 rounded-2xl p-4">
                <input type="hidden" name="uuid" value={workDay.uuid} />
                <input type="text" name=""/>
                <h3 className="text-xl font-bold">{workDay.company.name}</h3>
                <div className="justify-items-center">
                    <p className=" ">DATE:</p>
                    <p className="font-bold">{workDay.date}</p>
                </div>
                <div className="justify-items-center">
                    <p>HOURS WORKED:</p>
                    <p>{workDay.hours_worked}</p>
                </div>
                <div className="grid gap-4">
                    <p>WORK DESCRIPTION</p>
                    <p>{workDay.work_description}</p>
                </div>
                <button>Submit</button>
            </Form>
        </li>
    )
}