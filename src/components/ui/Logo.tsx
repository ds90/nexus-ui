import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" 
            className="flex items-center space-x-2 px-2 py-1 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200 max-w-min"
            >
            <div className="w-10 h-10 bg-fixed rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">N</span>
            </div>
            <span className="text-2xl font-bold text-fixed">Nexus</span>
        </Link>
    )
}