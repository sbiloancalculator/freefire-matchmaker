
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
import { useTournaments } from "@/context/TournamentContext";

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
  const { verifyPayment } = useTournaments();
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
      
      // Call the tournament context to verify payment
      const status = await verifyPayment(tournamentId, values.utrNumber);
      setPaymentStatus(status);
      
      if (status === PaymentStatus.VERIFIED) {
        toast({
          title: "Payment verified successfully",
          description: "You have successfully joined the tournament",
        });
        onSuccess();
      } else if (status === PaymentStatus.UNDER_REVIEW) {
        toast({
          title: "Payment under review",
          description: "Your payment is being reviewed by the admin",
        });
        onSuccess();
      } else {
        toast({
          title: "Payment verification failed",
          description: "Please check your UTR number and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: error instanceof Error ? error.message : "Please check your UTR number and try again",
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
        <p className="text-sm text-muted-foreground">UPI ID: 9427415370@fam</p>
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
      
      {paymentStatus === PaymentStatus.REJECTED && (
        <Alert className="mt-4 border-red-200 bg-red-50">
          <AlertDescription className="text-red-600">
            Your payment verification failed. If you have any issues, please contact admin on WhatsApp: 9427415370
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
