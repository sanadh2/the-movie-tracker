import PageLayout from "@/components/PageLayout";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <PageLayout className="flex justify-center items-center">
      <SignIn afterSignOutUrl={"/"} />;
    </PageLayout>
  );
}
