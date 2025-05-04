
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white text-black p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Left Side: Safeer Media App */}
        <h1 className="text-2xl font-bold">
          Safeer Media App
        </h1>

        {/* Right Side: Login & Register */}
        <div className="space-x-6">
          <Link href="/login" className="text-lg hover:bg-gray-100 p-3 rounded-md text-center">
  Login
</Link>
          <Link href="/register" className="text-lg hover:bg-gray-100 p-3 rounded-md text-center">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
