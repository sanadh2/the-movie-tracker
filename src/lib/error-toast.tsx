import { isAxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function handleAxiosError(error: unknown): void {
  if (isAxiosError(error)) {
    console.log("Error:", error.response?.data.error);

    if (error.response) {
      if (error.response.status === 401) {
        console.log("Unauthorized");
        toast({
          title: "Unauthorized",
          description: "Please sign in",
          variant: "destructive",
          action: (
            <ToastAction altText="Sign in">
              {/* <SignInButton>Sign in</SignInButton> */}
            </ToastAction>
          ),
        });
      } else {
        toast({
          title: error.response.data.error || "Error",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    } else if (error.request) {
      toast({
        title: "Network Error",
        description: "Please try again later.",
        variant: "destructive",
      });
    } else {
      toast({
        title: error.message || "An unknown error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  } else {
    toast({
      title: "An unknown error occurred",
      description: "Please try again later.",
      variant: "destructive",
    });
  }
}
