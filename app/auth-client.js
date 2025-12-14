"use client"

import { useState } from "react";

import { useUserAuth } from "./_utils/auth-context";;

export default function AuthClient() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            await gitHubSignIn();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="m-4">
            {user ? (
                <div className="flex flex-col items-center gap-4 p-6 border rounded-lg shadow-lg bg-white">
                    <span className="text-gray-700">Signed in as {user.displayName}</span>
                    <a className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg text-center" href="/task-board">Continue to your Task Board</a>
                    <button className="text-gray-600 hover:text-gray-800 py-1 px-4 rounded-lg border border-gray-300" onClick={() => firebaseSignOut()}>Sign out</button>
                </div>
            ) : (
                <button className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200" onClick={handleSignIn} disabled={loading}>
                    {loading ? "Signing in…" : "Sign in with GitHub"}
                </button>
            )}
        </div>
    );
}