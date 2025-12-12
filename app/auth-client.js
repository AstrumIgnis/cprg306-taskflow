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
                <div className="flex flex-col gap-4 max-w-xs">
                    <span>Signed in as {user.displayName}</span>
                    <a className="text-lg hover:underline" href="/task-board">Continue to your Shopping List</a>
                    <button className="bg-blue-500 p-2 rounded-lg text-align" onClick={() => firebaseSignOut()}>Sign out</button>
                </div>
            ) : (
                <button className="bg-blue-500 p-2 rounded-lg text-align" onClick={handleSignIn} disabled={loading}>
                    {loading ? "Signing in…" : "Sign in with GitHub"}
                </button>
            )}
        </div>
    );
}