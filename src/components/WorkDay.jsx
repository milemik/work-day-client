export default function WorkDay({workDay}) {
    return (
        <li key={workDay.uuid}>
            <div className="grid gap-4">
                <h3 className="text-xl font-bold">{workDay.company.name}</h3>
                <p>{workDay.date}</p>
                <p>{workDay.hours_worked}</p>
                <p>{workDay.work_description}</p>
            </div>
        </li>
    )
}