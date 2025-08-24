
"use client";

import { useTransition, useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from '@/components/ui/label';

const romanianCities = [
    "București", "Cluj-Napoca", "Timișoara", "Iași", "Constanța", 
    "Craiova", "Brașov", "Galați", "Ploiești", "Oradea", "Brăila", 
    "Arad", "Pitești", "Sibiu", "Bacău", "Târgu Mureș", "Baia Mare", 
    "Buzău", "Botoșani", "Satu Mare", "Râmnicu Vâlcea", "Suceava",
    "Piatra Neamț", "Drobeta-Turnu Severin", "Focșani"
];

export default function ContactSection() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [otherShippingMethod, setOtherShippingMethod] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [remoteTool, setRemoteTool] = useState('');
  const [message, setMessage] = useState('');

  const isFormInvalid = useMemo(() => {
    if (!name || !email || !serviceType || !message) return true;
    if (serviceType === 'Mail-in Device' && !shippingMethod) return true;
    if (shippingMethod === 'Other' && !otherShippingMethod) return true;
    if (shippingMethod === 'EasyBox' && !shippingCity) return true;
    if (serviceType === 'Remote Assistance' && !remoteTool) return true;
    return false;
  }, [name, email, serviceType, message, shippingMethod, otherShippingMethod, shippingCity, remoteTool]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (isFormInvalid) {
        toast({
            variant: "destructive",
            title: "Please fill out all required fields.",
        });
        return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          toast({
            title: "Message Sent!",
            description: "Thank you for your message! We will get back to you soon.",
          });
          setName('');
          setEmail('');
          setServiceType('');
          setShippingMethod('');
          setOtherShippingMethod('');
          setShippingCity('');
          setRemoteTool('');
          setMessage('');
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was an error sending your message. Please try again.",
          });
        }
      } catch (error) {
         toast({
            variant: "destructive",
            title: "Network Error",
            description: "Could not send message. Please check your connection and try again.",
          });
      }
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-headline text-foreground">Get in Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question or need to book a service? Send a message below.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold font-headline mb-6">Contact Information</h3>
            <p className="text-muted-foreground mb-6">
              You can also reach us directly through the following channels. We typically respond within a few business hours.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary" />
                <a href="mailto:contact.pixelpatch@gmail.com" className="text-lg hover:underline">
                  contact.pixelpatch@gmail.com
                </a>
              </div>
            </div>
          </div>

          <Card className="p-8 shadow-lg">
            <form onSubmit={handleSubmit} action="https://usebasin.com/f/85080895f0de" method="POST" className="space-y-6">
              {/* Add a hidden field for the subject for better email organization */}
              <input type="hidden" name="_subject" value={`New message from ${name} - ${serviceType}`} />

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type</Label>
                <Select name="serviceType" onValueChange={setServiceType} value={serviceType} required>
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="Select a service option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remote Assistance">Remote Assistance</SelectItem>
                    <SelectItem value="Mail-in Device">Mail-in Device</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {serviceType === 'Remote Assistance' && (
                <div className="space-y-3">
                  <Label>How would you like to be assisted?</Label>
                  <RadioGroup name="remoteTool" onValueChange={setRemoteTool} value={remoteTool} className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="Remote PC Control" id="r-remote" />
                        <Label htmlFor="r-remote" className="font-normal">Remote PC Control</Label>
                      </div>
                  </RadioGroup>
                  <p className="text-sm text-muted-foreground">For "Remote PC Control", we will email you with further instructions.</p>
                </div>
              )}
              
              {serviceType === 'Mail-in Device' && (
                <div className="space-y-6">
                   <div className="space-y-3">
                        <Label>How will you send the device?</Label>
                        <RadioGroup name="shippingMethod" onValueChange={setShippingMethod} value={shippingMethod} className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem value="EasyBox" id="r-easybox" />
                                <Label htmlFor="r-easybox" className="font-normal">EasyBox</Label>
                            </div>
                             <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem value="Manual Delivery" id="r-manual" />
                                <Label htmlFor="r-manual" className="font-normal">Manual Delivery (You'll bring it to us)</Label>
                            </div>
                            <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem value="Other" id="r-other" />
                                <Label htmlFor="r-other" className="font-normal">Other</Label>
                            </div>
                        </RadioGroup>
                   </div>
                  {shippingMethod === 'Other' && (
                    <div className="space-y-2">
                        <Label htmlFor="otherShippingMethod">Please specify shipping method</Label>
                        <Input id="otherShippingMethod" name="otherShippingMethod" placeholder="e.g., Posta Romana" value={otherShippingMethod} onChange={(e) => setOtherShippingMethod(e.target.value)} />
                    </div>
                  )}
                  {shippingMethod === 'EasyBox' && (
                     <div className="space-y-2">
                        <Label htmlFor="shippingCity">Shipping From</Label>
                        <Select name="shippingCity" onValueChange={setShippingCity} value={shippingCity}>
                            <SelectTrigger id="shippingCity">
                                <SelectValue placeholder="Select your city" />
                            </SelectTrigger>
                            <SelectContent>
                                {romanianCities.sort().map(city => (
                                    <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">You can use any courier or an easybox. For faster service, we recommend shipping from a city near Bucharest.</p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="How can we help you today?" className="min-h-[150px]" value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              
              <Button type="submit" className="w-full" disabled={isPending || isFormInvalid}>
                {isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}

    