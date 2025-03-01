
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, DollarSign } from "lucide-react";
import { toast } from "sonner";

export function AdminSettings() {
  const [settings, setSettings] = useState({
    siteTitle: "Free Fire Tournaments",
    contactWhatsApp: "9427415370",
    upiId: "9427415370@fam",
    entryFee: "30",
    tournamentTimes: {
      morning: "09:00",
      evening: "21:00"
    },
    minPlayers: "20",
    maxPlayers: "50",
    notifications: {
      paymentVerification: true,
      tournamentStart: true,
      userRegistration: true,
      lowParticipants: true
    }
  });

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  const handleToggleNotification = (setting: string) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [setting]: !settings.notifications[setting as keyof typeof settings.notifications]
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <CardTitle>System Settings</CardTitle>
          </div>
          <CardDescription>
            Configure system-wide settings for tournaments and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">General Settings</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input 
                    id="site-title" 
                    value={settings.siteTitle}
                    onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-whatsapp">Contact WhatsApp</Label>
                  <Input 
                    id="contact-whatsapp" 
                    value={settings.contactWhatsApp}
                    onChange={(e) => setSettings({...settings, contactWhatsApp: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Payment Settings</h3>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input 
                    id="upi-id" 
                    value={settings.upiId}
                    onChange={(e) => setSettings({...settings, upiId: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="entry-fee">Entry Fee (₹)</Label>
                  <Input 
                    id="entry-fee" 
                    type="number"
                    value={settings.entryFee}
                    onChange={(e) => setSettings({...settings, entryFee: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tournament Settings</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="morning-time">Morning Tournament Time</Label>
                  <Input 
                    id="morning-time" 
                    type="time"
                    value={settings.tournamentTimes.morning}
                    onChange={(e) => setSettings({
                      ...settings, 
                      tournamentTimes: {
                        ...settings.tournamentTimes,
                        morning: e.target.value
                      }
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="evening-time">Evening Tournament Time</Label>
                  <Input 
                    id="evening-time" 
                    type="time"
                    value={settings.tournamentTimes.evening}
                    onChange={(e) => setSettings({
                      ...settings, 
                      tournamentTimes: {
                        ...settings.tournamentTimes,
                        evening: e.target.value
                      }
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="min-players">Minimum Players</Label>
                  <Input 
                    id="min-players" 
                    type="number"
                    value={settings.minPlayers}
                    onChange={(e) => setSettings({...settings, minPlayers: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-players">Maximum Players</Label>
                  <Input 
                    id="max-players" 
                    type="number"
                    value={settings.maxPlayers}
                    onChange={(e) => setSettings({...settings, maxPlayers: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="payment-notification" className="text-base">Payment Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new payment verifications
                    </p>
                  </div>
                  <Switch 
                    id="payment-notification" 
                    checked={settings.notifications.paymentVerification}
                    onCheckedChange={() => handleToggleNotification('paymentVerification')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="tournament-notification" className="text-base">Tournament Start</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when tournaments are about to start
                    </p>
                  </div>
                  <Switch 
                    id="tournament-notification" 
                    checked={settings.notifications.tournamentStart}
                    onCheckedChange={() => handleToggleNotification('tournamentStart')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="user-notification" className="text-base">User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new user registrations
                    </p>
                  </div>
                  <Switch 
                    id="user-notification" 
                    checked={settings.notifications.userRegistration}
                    onCheckedChange={() => handleToggleNotification('userRegistration')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="participants-notification" className="text-base">Low Participants</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when tournaments have low participation
                    </p>
                  </div>
                  <Switch 
                    id="participants-notification" 
                    checked={settings.notifications.lowParticipants}
                    onCheckedChange={() => handleToggleNotification('lowParticipants')}
                  />
                </div>
              </div>
            </div>
            
            <Button onClick={handleSaveSettings}>Save All Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
