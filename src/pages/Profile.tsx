
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Wallet, Trophy, Edit2 } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { TournamentStatus } from "@/lib/types";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [freefireId, setFreefireId] = useState(user?.freefireId || "");

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Login</h1>
        <p className="mb-8">You need to be logged in to view your profile.</p>
      </div>
    );
  }

  // Mock tournament history data
  const tournamentHistory = [
    {
      id: "1",
      name: "Free Fire Cup Season 4",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      status: TournamentStatus.COMPLETED,
      result: "7th place",
      prize: 200
    },
    {
      id: "2",
      name: "Weekend Warriors",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      status: TournamentStatus.COMPLETED,
      result: "3rd place",
      prize: 500
    },
    {
      id: "3",
      name: "Pro Series Match",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: TournamentStatus.UPCOMING,
      result: null,
      prize: null
    }
  ];

  // Mock wallet transactions
  const walletTransactions = [
    {
      id: "1",
      type: "deposit",
      amount: 200,
      description: "Tournament winnings - Free Fire Cup",
      date: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000)
    },
    {
      id: "2",
      type: "withdraw",
      amount: 50,
      description: "Tournament entry fee - Weekend Warriors",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    },
    {
      id: "3",
      type: "deposit",
      amount: 500,
      description: "Tournament winnings - Weekend Warriors",
      date: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)
    },
    {
      id: "4",
      type: "withdraw",
      amount: 100,
      description: "Tournament entry fee - Pro Series",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ];

  const handleSaveFreefireId = () => {
    // In a real app, this would call an API to update the user's profile
    toast({
      title: "Profile Updated",
      description: "Your Free Fire ID has been updated successfully.",
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="mt-2">
                <Badge variant="outline" className="text-primary">
                  {user.status === 'admin' ? 'Admin' : 'Player'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Free Fire ID</p>
                {isEditing ? (
                  <div className="flex items-center mt-1 gap-2">
                    <Input 
                      value={freefireId} 
                      onChange={(e) => setFreefireId(e.target.value)}
                      placeholder="Enter your Free Fire ID" 
                    />
                    <Button size="sm" onClick={handleSaveFreefireId}>Save</Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="font-mono">{user.freefireId || "Not set"}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Wallet Balance</p>
                <p className="text-2xl font-bold">₹{user.walletBalance}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p>{format(user.createdAt, "MMMM yyyy")}</p>
              </div>
              
              <Button className="w-full">Add Funds</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:w-2/3">
          <Tabs defaultValue="tournaments">
            <TabsList className="mb-6">
              <TabsTrigger value="tournaments">My Tournaments</TabsTrigger>
              <TabsTrigger value="wallet">Wallet History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tournaments">
              <h2 className="text-2xl font-bold mb-4">Tournament History</h2>
              
              {tournamentHistory.length > 0 ? (
                <div className="space-y-4">
                  {tournamentHistory.map((tournament) => (
                    <Card key={tournament.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{tournament.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <CalendarDays className="h-4 w-4 mr-1" />
                              <span>{format(tournament.date, "MMMM d, yyyy")}</span>
                            </div>
                          </div>
                          <Badge className={tournament.status === TournamentStatus.COMPLETED ? "bg-gray-500" : "bg-blue-500"}>
                            {tournament.status}
                          </Badge>
                        </div>
                        
                        {tournament.status === TournamentStatus.COMPLETED && (
                          <div className="mt-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                                <span>{tournament.result}</span>
                              </div>
                              {tournament.prize && (
                                <div className="font-medium">
                                  Prize: ₹{tournament.prize}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted rounded-lg">
                  <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No tournaments yet</h3>
                  <p className="text-muted-foreground">
                    You haven't participated in any tournaments yet
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="wallet">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Wallet Transactions</h2>
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2" />
                  <span className="font-medium">Balance: ₹{user.walletBalance}</span>
                </div>
              </div>
              
              {walletTransactions.length > 0 ? (
                <div className="space-y-4">
                  {walletTransactions.map((transaction) => (
                    <Card key={transaction.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <Badge variant={transaction.type === "deposit" ? "default" : "destructive"} className="mr-2">
                                {transaction.type === "deposit" ? "Credit" : "Debit"}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {format(transaction.date, "MMM d, yyyy")}
                              </span>
                            </div>
                            <p className="mt-1">{transaction.description}</p>
                          </div>
                          <span className={`font-semibold ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}>
                            {transaction.type === "deposit" ? "+" : "-"}₹{transaction.amount}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted rounded-lg">
                  <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No transactions</h3>
                  <p className="text-muted-foreground">
                    You don't have any wallet transactions yet
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="settings">
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" value={user.name} className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={user.email} className="mt-1" disabled />
                    <p className="text-sm text-muted-foreground mt-1">
                      Your email address is used for login and notifications
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label htmlFor="ff-id">Free Fire ID</Label>
                    <Input 
                      id="ff-id" 
                      value={user.freefireId || ""} 
                      placeholder="Enter your Free Fire ID"
                      className="mt-1" 
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Required to participate in tournaments
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="mt-1" />
                  </div>
                  
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
