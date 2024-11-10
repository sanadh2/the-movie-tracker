import Link from "next/link";
import { Button } from "./ui/button";

export default function LogIntoContinue(){
return <div className="p-4 grid place-items-center gap-2">
    <h2 className="font-mono text-xl font-bold text-red-500">You are not logged in</h2> 
    <p>Please log in to continue...</p>
    <Button asChild>
    <Link href={"/auth/signin"} className="">Sign In</Link>
    </Button>
</div>
}
