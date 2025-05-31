export default function FormError({ error }) {
    console.log("FORM" + error);
    return (
        <div className="text-red-500 font-bold text-xl">
            {error}
        </div>
    );
}