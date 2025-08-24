import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-xl">
              <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="Technician working on a computer" 
                  fill
                  className="object-cover"
                  data-ai-hint="computer repair"
              />
          </div>
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold font-headline text-foreground">About Us</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our goal is to take the stress out of technology, so you can get back to what's important. Whether it's a slow computer, a virus infection, or a new hardware upgrade, we're here to provide expert service you can trust.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              With years of experience and a passion for problem-solving, we pride ourselves on our transparent and reliable service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
