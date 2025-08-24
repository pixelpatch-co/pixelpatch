import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Laptop2,
  BriefcaseBusiness,
  ShieldCheck,
  ShieldX,
  GaugeCircle,
  HardDriveUpload,
  Globe,
  Package,
} from "lucide-react";

const services = [
  {
    icon: <Laptop2 className="w-12 h-12 text-primary" />,
    title: "Windows Installation",
    description: "Fresh and clean OS installation for optimal performance.",
  },
  {
    icon: <BriefcaseBusiness className="w-12 h-12 text-primary" />,
    title: "Office Setup",
    description: "Installation and configuration of Microsoft Office suite.",
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-primary" />,
    title: "Antivirus Installation",
    description: "Protect your computer from malware and online threats.",
  },
  {
    icon: <ShieldX className="w-12 h-12 text-primary" />,
    title: "Virus Removal",
    description: "Complete and thorough removal of viruses and spyware.",
  },
  {
    icon: <GaugeCircle className="w-12 h-12 text-primary" />,
    title: "PC Optimization",
    description: "Speed up your computer and improve its overall performance.",
  },
  {
    icon: <HardDriveUpload className="w-12 h-12 text-primary" />,
    title: "Hardware Upgrades",
    description: "Boost your PC's power with new components like RAM or SSDs.",
  },
  {
    icon: <Globe className="w-12 h-12 text-primary" />,
    title: "Remote Support",
    description: "Get expert help from anywhere with our secure remote assistance.",
  },
  {
    icon: <Package className="w-12 h-12 text-primary" />,
    title: "Mail-in Repairs",
    description: "Send us your device using any courier or an easybox locker. We'll fix it and ship it back to you.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-headline text-foreground">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to keep your PC running smoothly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
              <CardHeader>
                <div className="flex justify-center mb-4">{service.icon}</div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
