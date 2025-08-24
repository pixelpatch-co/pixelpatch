import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold font-headline text-foreground">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about our services. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How much do the services cost?</AccordionTrigger>
              <AccordionContent>
                The cost depends on the specific service required and the complexity of the issue. We provide a quote after a preliminary diagnosis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Where do the devices get shipped?</AccordionTrigger>
              <AccordionContent>
                The shipping details will be disclosed when answering your email.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How much does shipping cost?</AccordionTrigger>
              <AccordionContent>
                The shipping cost depends on the method of shipping you choose.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How long will the repair take?</AccordionTrigger>
              <AccordionContent>
                Repair times vary depending on the complexity of the issue. We aim to complete most software-related fixes within 24-48 hours after receiving the device. We'll provide a more specific timeline after the initial diagnosis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Should I back up my data before sending my device?</AccordionTrigger>
              <AccordionContent>
                We highly recommend that you back up all your important data before any repair service. While we take the utmost care with your device, you are responsible for any data loss that may occur.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>For hardware upgrades, who provides the new components?</AccordionTrigger>
              <AccordionContent>
                You are responsible for purchasing the new components. You will need to send the new parts to us, along with your PC if necessary, for installation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>How do I pay for the service?</AccordionTrigger>
              <AccordionContent>
                After you contact us and we confirm the service details and final price with you via email, we will send you a secure payment link through a trusted provider like Stripe or PayPal to complete your transaction.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
