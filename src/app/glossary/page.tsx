import Link from "next/link";
 const GlossaryLetterPage = () => {
    const alphabet = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
    return <div className='min-h-32 mx-auto max-w-4xl p-4 my-12 flex flex-wrap gap-4'>
        {alphabet.map((letter) => (
            <Link
                key={letter}
                href={`/glossary/${letter === "#" ? "num" : letter.toLowerCase()}`}
                className="hover:underline text-3xl p-5"
            >
                {letter}
            </Link>
        ))}
    </div>
}

export default GlossaryLetterPage;