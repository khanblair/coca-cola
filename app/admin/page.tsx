import React from "react";
import { Protect } from "@clerk/nextjs";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <Protect fallback={<div className="p-8 text-center">You do not have access to this page.</div>}>
      <AdminDashboard />
    </Protect>
  );
}
