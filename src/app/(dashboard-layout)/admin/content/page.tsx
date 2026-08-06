import { redirect } from "next/navigation";

export default function ContentRootPage() {
  redirect("/admin/content/home");
}