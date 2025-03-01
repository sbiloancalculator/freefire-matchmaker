
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Trophy, Users, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { TournamentStatus } from "@/lib/types";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  // Mock upcoming tournaments
  const upcomingTournaments = [
    {
      id: "1",
      name: "Weekend Warriors Cup",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      participants: 48,
      maxParticipants: 100,
      status: TournamentStatus.UPCOMING
    },
    {
      id: "2",
      name: "Pro Series Match",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      participants: 75,
      maxParticipants: 100,
      status: TournamentStatus.UPCOMING
    }
  ];

  // Mock registered tournaments
  const registeredTournaments = [
    {
      id: "3",
      name: "Free Fire League",
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      status: TournamentStatus.UPCOMING,
      roomId: "123456",
      password: "FF2023"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{user.walletBalance}</div>
            <p className="text-xs text-muted-foreground">
              Available for tournament entries
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tournaments Joined</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registeredTournaments.length}</div>
            <p className="text-xs text-muted-foreground">
              Active tournament registrations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Tournament</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registeredTournaments.length > 0 
                ? registeredTournaments[0].name
                : "None registered"}
            </div>
            <p className="text-xs text-muted-foreground">
              {registeredTournaments.length > 0 
                ? new Date(registeredTournaments[0].date).toLocaleDateString()
                : "Browse tournaments to join"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="registered" className="mb-8">
        <TabsList>
          <TabsTrigger value="registered">My Tournaments</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Tournaments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="registered">
          {registeredTournaments.length > 0 ? (
            <div className="grid gap-4">
              {registeredTournaments.map((tournament) => (
                <Card key={tournament.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{tournament.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <CalendarDays className="h-4 w-4 mr-2" />
                          {new Date(tournament.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Room ID:</span>
                          <span className="font-mono bg-muted px-2 py-1 rounded text-sm">{tournament.roomId}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Password:</span>
                          <span className="font-mono bg-muted px-2 py-1 rounded text-sm">{tournament.password}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/tournaments/${tournament.id}`)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No tournaments joined</h3>
              <p className="text-muted-foreground mb-4">
                Browse upcoming tournaments and join one now
              </p>
              <Button onClick={() => navigate("/tournaments")}>
                Browse Tournaments
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="grid gap-4">
            {upcomingTournaments.map((tournament) => (
              <Card key={tournament.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{tournament.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        {new Date(tournament.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {tournament.participants}/{tournament.maxParticipants} registered
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => navigate(`/tournaments/${tournament.id}`)}>
                      Join Tournament
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Need help?</CardTitle>
          <CardDescription>
            Contact our support team for any tournament related queries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Our support team is available 24/7 to help you with any issues you might encounter during tournaments.
          </p>
          <Button variant="outline">Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
