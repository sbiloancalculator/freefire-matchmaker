
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FileText, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function LegalCompliance() {
  const [termsOfService, setTermsOfService] = useState(
    "Tournament Terms of Service\n\n" +
    "1. Eligibility: Players must be at least 18 years old to participate in tournaments with real money prizes.\n" +
    "2. Registration: Valid Free Fire ID and personal information are required for registration.\n" +
    "3. Entry Fee: ₹30 entry fee is non-refundable once verified.\n" +
    "4. Tournament Rules: All players must follow the game's terms of service and tournament rules.\n" +
    "5. Minimum Participants: Tournaments require minimum 20 participants to start.\n" +
    "6. Payment Verification: All payments require UTR number verification.\n" +
    "7. Room Details: Room ID and password will be shared with verified participants.\n" +
    "8. Disputes: All disputes will be resolved by the tournament administrator.\n" +
    "9. Refunds: Refunds will only be issued if a tournament is cancelled by administration.\n" +
    "10. Player Conduct: Harassment, cheating, or foul language will result in disqualification."
  );
  
  const [privacyPolicy, setPrivacyPolicy] = useState(
    "Privacy Policy\n\n" +
    "1. Information Collection: We collect personal information including name, email, Free Fire ID, and payment details.\n" +
    "2. Use of Information: Information is used for tournament registration, communication, and verification.\n" +
    "3. Data Security: We implement security measures to protect your personal information.\n" +
    "4. Third-Party Sharing: We do not share your information with third parties except as required by law.\n" +
    "5. User Rights: Users have the right to access, correct, or delete their personal information.\n" +
    "6. Cookies: We use cookies to improve user experience.\n" +
    "7. Contact Information: For privacy concerns, contact us at admin@freefiretournaments.com."
  );
  
  const [complianceSettings, setComplianceSettings] = useState({
    ageVerification: true,
    paymentVerification: true,
    identityVerification: false,
    autoRefund: true,
    dataRetention: true
  });
  
  const handleSaveTerms = () => {
    toast.success("Terms of Service updated successfully");
  };
  
  const handleSavePrivacy = () => {
    toast.success("Privacy Policy updated successfully");
  };
  
  const handleToggleSetting = (setting: string) => {
    setComplianceSettings({
      ...complianceSettings,
      [setting]: !complianceSettings[setting as keyof typeof complianceSettings]
    });
    toast.success(`Setting updated successfully`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Legal & Compliance</CardTitle>
            <CardDescription>
              Manage legal documents and compliance settings for tournaments
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="terms">
            <TabsList className="mb-4">
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="terms">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Tournament Terms of Service</h3>
                </div>
                
                <Textarea 
                  value={termsOfService} 
                  onChange={(e) => setTermsOfService(e.target.value)}
                  rows={15}
                />
                
                <Button onClick={handleSaveTerms}>Save Changes</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Privacy Policy</h3>
                </div>
                
                <Textarea 
                  value={privacyPolicy} 
                  onChange={(e) => setPrivacyPolicy(e.target.value)}
                  rows={15}
                />
                
                <Button onClick={handleSavePrivacy}>Save Changes</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="compliance">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Compliance Settings</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="age-verification" className="text-base">Age Verification</Label>
                      <p className="text-sm text-muted-foreground">
                        Require users to confirm they are 18 or older
                      </p>
                    </div>
                    <Switch 
                      id="age-verification" 
                      checked={complianceSettings.ageVerification}
                      onCheckedChange={() => handleToggleSetting('ageVerification')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="payment-verification" className="text-base">Payment Verification</Label>
                      <p className="text-sm text-muted-foreground">
                        Require UTR verification for all payments
                      </p>
                    </div>
                    <Switch 
                      id="payment-verification" 
                      checked={complianceSettings.paymentVerification}
                      onCheckedChange={() => handleToggleSetting('paymentVerification')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="identity-verification" className="text-base">Identity Verification</Label>
                      <p className="text-sm text-muted-foreground">
                        Require ID verification for large prize withdrawals
                      </p>
                    </div>
                    <Switch 
                      id="identity-verification" 
                      checked={complianceSettings.identityVerification}
                      onCheckedChange={() => handleToggleSetting('identityVerification')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-refund" className="text-base">Automatic Refunds</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically refund payments for cancelled tournaments
                      </p>
                    </div>
                    <Switch 
                      id="auto-refund" 
                      checked={complianceSettings.autoRefund}
                      onCheckedChange={() => handleToggleSetting('autoRefund')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-retention" className="text-base">Data Retention Policy</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically delete user data after account closure
                      </p>
                    </div>
                    <Switch 
                      id="data-retention" 
                      checked={complianceSettings.dataRetention}
                      onCheckedChange={() => handleToggleSetting('dataRetention')}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
