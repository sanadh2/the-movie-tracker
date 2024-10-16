import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex justify-center min-h-[80dvh] items-center flex-col">
      <h2 className="font-mono text-xl text-yellow-500">Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="border p-2 mt-2 bg-green-700 rounded-md">
        Return Home
      </Link>
    </div>
  );
}
