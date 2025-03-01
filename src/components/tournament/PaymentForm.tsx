
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaymentStatus } from "@/lib/types";

// Validation schema
const formSchema = z.object({
  utrNumber: z.string().min(12, {
    message: "UTR number must be at least 12 characters",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface PaymentFormProps {
  tournamentId: string;
  entryFee: number;
  onSuccess: () => void;
}

export function PaymentForm({ tournamentId, entryFee, onSuccess }: PaymentFormProps) {
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      utrNumber: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsVerifying(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate verification (in a real app, this would call an actual API)
      // We're using a mock successful response
      setPaymentStatus(PaymentStatus.UNDER_REVIEW);
      
      toast({
        title: "Payment verification initiated",
        description: "We'll notify you once your payment is verified",
      });
      
      // In a real app, you would redirect to a confirmation page or refresh the tournament details
      onSuccess();
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Please check your UTR number and try again",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="text-center mb-6">
        <div className="bg-muted p-6 rounded-lg inline-flex items-center justify-center mb-3">
          <QrCode className="h-20 w-20" />
        </div>
        <p className="text-lg font-medium">Scan to Pay ₹{entryFee}</p>
        <p className="text-sm text-muted-foreground">UPI ID: freefiretournaments@ybl</p>
      </div>
      
      <Alert>
        <AlertDescription>
          1. Save the screenshot of payment<br />
          2. Copy your UTR/Reference number<br />
          3. Enter the UTR number below to verify
        </AlertDescription>
      </Alert>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="utrNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UTR Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter UTR/Reference number" {...field} />
                </FormControl>
                <FormDescription>
                  You can find this in your payment app's transaction history
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify Payment"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
