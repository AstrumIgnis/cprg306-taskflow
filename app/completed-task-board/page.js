import PageClient from './page-client';
import Navbar from "../_shared/navbar";

// Main page component that uses the client-side PageClient component
// If metadata is set in on a client side file, it will cause an error.

export default function Page() {
    return (
        <main className="min-h-screen bg-gray-100 text-gray-900">
            <Navbar />

            <header className="text-center py-6">
                <h1 className="text-3xl font-bold">
                    Completed Task Board
                </h1>
            </header>

            <PageClient />
        </main>
    );
}

export const metadata = {
    title: "Completed Task Board",
};