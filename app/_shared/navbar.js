export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-blue-950 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Left: Logo */}
                <a href="/" className="text-2xl font-extrabold tracking-wide hover:text-blue-300 transition-colors">TaskFlow</a>

                {/* Center / Right: Links */}
                <ul className="flex space-x-6 text-sm font-semibold">
                    <li>
                        <a href="/task-board" className="hover:text-blue-300 transition-colors">Ongoing Tasks</a>
                    </li>
                    <li>
                        <a href="/completed-task-board" className="hover:text-blue-300 transition-colors">Completed Tasks</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}