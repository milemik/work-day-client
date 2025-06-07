import WorkDayImg from '../assets/WorkDayImageW.png';

export default function HomePage() {
    return (
        <main className="grid justify-items-center items-center h-screen">
            <h1 className="text-3xl font-bold text-center">Wellcome to work day platform</h1>
            <img src={WorkDayImg} alt="Work Day" className="object-cover drop-shadow-2xl" />
            {/* Think what text would be a better fit here!? */}
            <div className="justify-items-center grid gap-4 pl-4 pr-4">
                <p className="text-xl text-center">You are a freelancer or company owner?</p>
                <p className="text-xl text-center">You are storing your work in excel files on your PC or cloud and it's starting to be a mess!?</p>
                <p className="text-xl text-center">Each client in separate excel file can be hard to manage.</p>
                <p className="text-xl text-center">Give this platform a try and let us know what you think!</p>
            </div>
        </main>
    )
}