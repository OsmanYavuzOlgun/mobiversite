import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold mb-4 text-red-600">404</h1>
      <p className="text-lg text-gray-700 mb-6">Page not found</p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        aria-label="not found"
      >
        Go Home
      </Link>
    </div>
  );
}
