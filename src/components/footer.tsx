import { Wrench } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center text-center">
          <div className="flex flex-col items-center">
            <Link href="#home" className="flex items-center gap-2 mb-4">
              <Wrench className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold font-headline text-foreground">
                PixelPatch
              </span>
            </Link>
            <p className="text-muted-foreground">Your friendly neighborhood PC experts.</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PixelPatch. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
