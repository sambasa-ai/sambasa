import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <header className="h-16 w-3/4"></header>
      <div className="flex-row flex w-3/4 gap-12">
        <div className="flex w-1/5 flex-col gap-1">
          <Link href="/settings/general">
            <Button className="w-full justify-start" variant="ghost">
              General
            </Button>
          </Link>
          <Link href="/settings/account">
            <Button className="w-full justify-start" variant="ghost">
              Account
            </Button>
          </Link>
          <Link href="/settings/models">
            <Button className="w-full justify-start" variant="ghost">
              Models
            </Button>
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
