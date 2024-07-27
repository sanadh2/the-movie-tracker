import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex justify-center items-center flex-col">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
