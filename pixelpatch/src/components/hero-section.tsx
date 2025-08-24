import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
            <Image 
                src="https://placehold.co/1920x1080.png" 
                alt="Abstract background" 
                fill
                className="object-cover opacity-20"
                data-ai-hint="abstract technology"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
        <div className="container relative z-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent-foreground to-primary">
                    TechFix Assist
                </h1>
                <p className="mt-6 text-xl md:text-2xl text-muted-foreground">
                    Your friendly neighborhood experts for PC repair and software setup.
                </p>
                <div className="mt-10">
                    <Button asChild size="lg" className="text-lg">
                        <Link href="#contact">Book a Service</Link>
                    </Button>
                </div>
            </div>
        </div>
    </section>
  );
}
