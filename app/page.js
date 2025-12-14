import AuthClient from "./auth-client";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="z-10 w-auto flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold m-4">TaskFlow</h1>
        <AuthClient />
      </div>
    </main>
  );
}