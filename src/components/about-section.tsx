import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-headline text-foreground">About Us</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our goal is to take the stress out of technology, so you can get back to what's important. Whether it's a slow computer, a virus infection, or a new hardware upgrade, we're here to provide expert service you can trust.
          </p>
        </div>
      </div>
    </section>
  );
}
