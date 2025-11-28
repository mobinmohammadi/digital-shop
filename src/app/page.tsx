import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="container-custom pt-6">
      <div className="flex justify-end  gap-5">
        <UserButton />
        <ThemeToggle />
      </div>
    </div>
  );
}
