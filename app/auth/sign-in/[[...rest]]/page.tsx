import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const SignInClient = dynamic(() => import("@/components/auth/SignInClient"), { ssr: false });

export default function SignInPage() {
  const { userId } = auth();
  if (userId) {
    redirect("/admin");
  }
  return <SignInClient />;
}
