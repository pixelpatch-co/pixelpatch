
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const conversionRates = {
  USD: 1,
  RON: 4.65,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.37,
};

const currencySymbols = {
  USD: "$",
  RON: "Lei",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
}

type Currency = keyof typeof conversionRates;

const pricingData = [
    {
        title: "Software Installation",
        description: "Fresh and clean OS installation for optimal performance.",
        priceType: "selectable",
        options: [
            { name: "Windows 10", price: 40 },
            { name: "Windows 11", price: 50 },
            { name: "Windows 10 + Office", price: 70 },
            { name: "Windows 11 + Office", price: 80 },
        ],
        features: [
            "Genuine Windows License",
            "Driver Installation",
            "Essential Software Setup",
            "Performance Optimization"
        ],
        buttonText: "Select Service",
        highlight: false,
    },
    {
        title: "Hardware Support",
        description: "Upgrades and component installations.",
        price: null,
        priceType: "quote",
        features: [
            "RAM, SSD, GPU Upgrades",
            "Component Installation",
            "Consultation on best parts",
        ],
        buttonText: "Get a Quote",
        highlight: true,
    },
    {
        title: "Remote Assistance",
        description: "Troubleshooting from anywhere.",
        price: 18,
        priceType: "hourly",
        features: [
            "Software Troubleshooting",
            "Guidance and Tutoring",
            "Quick and Convenient",
        ],
        buttonText: "Book a Session",
        highlight: false,
    },
];

const initialSelectedPrices = pricingData.reduce((acc, card) => {
  if (card.priceType === 'selectable' && card.options) {
    acc[card.title] = card.options[0].price;
  }
  return acc;
}, {} as Record<string, number>);


export default function PricingSection() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selectedPrices, setSelectedPrices] = useState<Record<string, number>>(initialSelectedPrices);

  const handleCurrencyChange = (value: string) => {
    setCurrency(value as Currency);
  };

  const handleOptionChange = (cardTitle: string, price: string) => {
    setSelectedPrices(prev => ({ ...prev, [cardTitle]: Number(price) }));
  };

  const getConvertedPrice = (basePrice: number | null) => {
    if (basePrice === null) return null;
    const rate = conversionRates[currency];
    const converted = basePrice * rate;
    return converted.toFixed(2);
  };


  return (
    <section id="pricing" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold font-headline text-foreground">Our Pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Simple, transparent pricing for all our services. For a precise quote, please contact us with your specific needs.
          </p>
        </div>

        <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
                <p className="text-muted-foreground">Currency:</p>
                <Select onValueChange={handleCurrencyChange} defaultValue={currency}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(conversionRates).map(curr => (
                            <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingData.map((card, index) => (
            <Card key={index} className={`flex flex-col ${card.highlight ? 'border-primary shadow-xl' : ''}`}>
                <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                     <div>
                        {card.priceType === 'quote' ? (
                            <p className="text-4xl font-bold">By Quote</p>
                        ) : card.priceType === 'selectable' && card.options ? (
                           <p className="text-4xl font-bold">
                                {currencySymbols[currency]}{getConvertedPrice(selectedPrices[card.title])}
                            </p>
                        ) : (
                            <p className="text-4xl font-bold">
                                {currencySymbols[currency]}{getConvertedPrice(card.price!)}
                                {card.priceType === 'hourly' && <span className="text-lg font-normal text-muted-foreground">/hr</span>}
                            </p>
                        )}
                         {card.priceType === 'starting' && <p className="text-sm text-muted-foreground">Starting at</p>}
                    </div>

                    {card.priceType === 'selectable' && card.options && (
                        <div className="space-y-2">
                            <Label htmlFor={`service-option-${index}`}>Service Option</Label>
                             <Select onValueChange={(price) => handleOptionChange(card.title, price)} defaultValue={String(card.options[0].price)}>
                                <SelectTrigger id={`service-option-${index}`}>
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    {card.options.map(option => (
                                        <SelectItem key={option.name} value={String(option.price)}>
                                            {option.name} - {currencySymbols[currency]}{getConvertedPrice(option.price)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <ul className="space-y-2 pt-4">
                        {card.features.map((feature, i) => (
                             <li key={i} className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-primary" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                     <Button asChild className="w-full">
                        <Link href="#contact">{card.buttonText}</Link>
                    </Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
