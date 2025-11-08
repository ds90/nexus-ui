import Navbar from "@/components/layout/Navbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg overflow-y-auto">
                {children}
            </main>
        </>
    )
}