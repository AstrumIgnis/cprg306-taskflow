import AuthClient from "./auth-client";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold m-4">Shopping List App</h1>
      <AuthClient />
    </main>
  );
}