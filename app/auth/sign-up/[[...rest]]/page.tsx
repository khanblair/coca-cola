import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const SignUpClient = dynamic(() => import("@/components/auth/SignUpClient"), { ssr: false });

export default function SignUpPage() {
  const { userId } = auth();
  if (userId) {
    redirect("/admin");
  }
  return <SignUpClient />;
}
