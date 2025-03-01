
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PaymentStatus } from "@/lib/types";

// Mock payment verifications pending
const pendingPayments = [
  {
    id: "1",
    userId: "user123",
    userName: "Rahul Sharma",
    tournamentId: "1",
    tournamentName: "Morning Tournament",
    amount: 30,
    utrNumber: "UTRB123456789",
    status: PaymentStatus.PENDING,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: "2",
    userId: "user456",
    userName: "Priya Patel",
    tournamentId: "1",
    tournamentName: "Morning Tournament",
    amount: 30,
    utrNumber: "UTRA987654321",
    status: PaymentStatus.PENDING,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

export function PaymentVerification() {
  const [payments, setPayments] = useState(pendingPayments);

  const handleVerifyPayment = (paymentId: string) => {
    setPayments(payments.filter(payment => payment.id !== paymentId));
    toast.success("Payment verified successfully");
  };

  const handleRejectPayment = (paymentId: string) => {
    setPayments(payments.filter(payment => payment.id !== paymentId));
    toast.error("Payment rejected");
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payment Verifications</CardTitle>
          <Badge variant="outline" className="ml-2">{payments.length} pending</Badge>
        </div>
        <CardDescription>
          Manual verification of tournament registration payments - UPI ID: 9427415370@fam
        </CardDescription>
      </CardHeader>
      <CardContent>
        {payments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Tournament</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>UTR Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.userName}</TableCell>
                  <TableCell>{payment.tournamentName}</TableCell>
                  <TableCell>₹{payment.amount}</TableCell>
                  <TableCell className="font-mono">{payment.utrNumber}</TableCell>
                  <TableCell>{payment.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleVerifyPayment(payment.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleRejectPayment(payment.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No pending payment verifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
