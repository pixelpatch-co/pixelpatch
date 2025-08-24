
"use client";

import { useTransition } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  serviceType: z.string({ required_error: "Please select a service type." }),
  shippingMethod: z.string().optional(),
  otherShippingMethod: z.string().optional(),
  shippingCity: z.string().optional(),
  remoteTool: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
}).refine(data => {
  if (data.serviceType === 'Mail-in Device') {
    return !!data.shippingMethod;
  }
  return true;
}, {
  message: "Please select a shipping method.",
  path: ["shippingMethod"],
}).refine(data => {
  if (data.shippingMethod === 'Other') {
    return !!data.otherShippingMethod && data.otherShippingMethod.length > 2;
  }
  return true;
}, {
  message: "Please specify your shipping method (at least 3 characters).",
  path: ["otherShippingMethod"],
}).refine(data => {
  if (data.serviceType === 'Mail-in Device' && data.shippingMethod === 'EasyBox') {
    return !!data.shippingCity;
  }
  return true;
}, {
  message: "Please select a shipping city.",
  path: ["shippingCity"],
}).refine(data => {
    if (data.serviceType === 'Remote Assistance') {
        return !!data.remoteTool;
    }
    return true;
}, {
    message: "Please select a remote assistance method.",
    path: ["remoteTool"],
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

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
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", serviceType: undefined, message: "" },
  });

  const serviceType = form.watch("serviceType");
  const shippingMethod = form.watch("shippingMethod");

  const onSubmit = (values: ContactFormValues) => {
    startTransition(async () => {
      const result = await submitContactForm(values);
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: <pre className="whitespace-pre-wrap">{result.message}</pre>,
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

          <Card className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Remote Assistance">Remote Assistance</SelectItem>
                          <SelectItem value="Mail-in Device">Mail-in Device</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {serviceType === 'Remote Assistance' && (
                  <FormField
                    control={form.control}
                    name="remoteTool"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>How would you like to be assisted?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Remote PC Control" />
                              </FormControl>
                              <FormLabel className="font-normal">Remote PC Control</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                         <FormDescription>
                           For "Remote PC Control", we will email you with further instructions.
                         </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {serviceType === 'Mail-in Device' && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="shippingMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>How will you send the device?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="EasyBox" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  EasyBox
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Manual Delivery" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Manual Delivery (You'll bring it to us)
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Other" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Other
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {shippingMethod === 'Other' && (
                      <FormField
                        control={form.control}
                        name="otherShippingMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Please specify shipping method</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Posta Romana" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {shippingMethod === 'EasyBox' && (
                       <FormField
                        control={form.control}
                        name="shippingCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shipping From</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your city" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {romanianCities.sort().map(city => (
                                    <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              You can use any courier or an easybox. For faster service, we recommend shipping from a city near Bucharest.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="How can we help you today?" className="min-h-[150px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
}
