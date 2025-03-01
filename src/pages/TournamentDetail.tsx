
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PaymentForm } from "@/components/tournament/PaymentForm";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Trophy, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { TournamentStatus, Tournament } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

// Mock data for tournaments
const mockTournaments: Tournament[] = [
  {
    id: "1",
    name: "Free Fire Cup Season 5",
    description: "Join the biggest Free Fire tournament of the season with players from all across India. This tournament features 4 rounds of intense Battle Royale action, with points for both eliminations and placement. Top performers from each group will advance to the finals, where they'll compete for the championship title and the biggest share of the prize pool.",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    time: "8:00 PM",
    entryFee: 50,
    prizePool: 5000,
    participants: 76,
    maxParticipants: 100,
    status: TournamentStatus.UPCOMING,
    image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=2070"
  },
  {
    id: "2",
    name: "Weekend Battle Royale",
    description: "Compete with the best Free Fire players this weekend in an action-packed tournament. This event features a dynamic zone pattern that forces more frequent engagements and tests your adaptability under pressure. Strategy and skill will determine who claims victory.",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    time: "6:00 PM",
    entryFee: 30,
    prizePool: 3000,
    participants: 42,
    maxParticipants: 50,
    status: TournamentStatus.UPCOMING,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070"
  },
  {
    id: "3",
    name: "Pro Series Match",
    description: "Elite tournament for experienced players only. This high-stakes tournament brings together the most skilled Free Fire players in a format designed to showcase tactical gameplay and precision shooting. Custom loadouts and enhanced loot tables create intense combat scenarios from drop to final circle.",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    time: "9:00 PM",
    entryFee: 100,
    prizePool: 10000,
    participants: 24,
    maxParticipants: 30,
    status: TournamentStatus.UPCOMING,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070"
  },
  {
    id: "4",
    name: "Squad Challenge",
    description: "Team up with friends and compete against other squads in this team-based tournament. Coordination and communication are key as you battle through multiple rounds to claim the championship. Special scoring bonuses for team wipes and objective captures.",
    date: new Date(),
    time: "7:30 PM",
    entryFee: 40,
    prizePool: 4000,
    participants: 50,
    maxParticipants: 50,
    status: TournamentStatus.ACTIVE,
    roomId: "123456",
    password: "gameon",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070"
  },
  {
    id: "5",
    name: "Free Fire League",
    description: "Monthly Free Fire tournament for all skill levels. This recurring championship features graduated skill brackets to ensure fair competition for all players. Progress through the ranks to face increasingly challenging opponents and earn your place among the elite.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    time: "8:00 PM",
    entryFee: 50,
    prizePool: 5000,
    participants: 100,
    maxParticipants: 100,
    status: TournamentStatus.COMPLETED,
    image: "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=2068"
  }
];

const TournamentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const tournament = mockTournaments.find((t) => t.id === id);

  if (!tournament) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Tournament Not Found</h1>
        <p className="mb-8">The tournament you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/tournaments">Back to Tournaments</Link>
        </Button>
      </div>
    );
  }

  const handleJoinTournament = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to join the tournament",
        variant: "destructive",
      });
      return;
    }
    
    setIsPaymentDialogOpen(true);
  };

  const statusColors = {
    [TournamentStatus.UPCOMING]: "bg-blue-500",
    [TournamentStatus.ACTIVE]: "bg-green-500",
    [TournamentStatus.COMPLETED]: "bg-gray-500",
  };

  const statusText = {
    [TournamentStatus.UPCOMING]: "Upcoming",
    [TournamentStatus.ACTIVE]: "Live Now",
    [TournamentStatus.COMPLETED]: "Completed",
  };

  const percentFilled = (tournament.participants / tournament.maxParticipants) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/tournaments" className="inline-flex items-center text-primary mb-6 hover:underline">
        ← Back to Tournaments
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
            <img 
              src={tournament.image} 
              alt={tournament.name} 
              className="w-full h-full object-cover"
            />
            <Badge 
              className={`absolute top-4 right-4 ${statusColors[tournament.status]}`}
            >
              {statusText[tournament.status]}
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{tournament.name}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="inline-flex items-center bg-muted px-3 py-1 rounded-full">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{format(tournament.date, "MMMM dd, yyyy")}</span>
            </div>
            
            <div className="inline-flex items-center bg-muted px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-2" />
              <span>{tournament.time}</span>
            </div>
            
            <div className="inline-flex items-center bg-muted px-3 py-1 rounded-full">
              <Trophy className="h-4 w-4 mr-2" />
              <span>₹{tournament.prizePool} Prize Pool</span>
            </div>
            
            <div className="inline-flex items-center bg-muted px-3 py-1 rounded-full">
              <Users className="h-4 w-4 mr-2" />
              <span>{tournament.participants}/{tournament.maxParticipants} Participants</span>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none mb-8">
            <h2 className="text-2xl font-semibold mb-4">About This Tournament</h2>
            <p>{tournament.description}</p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8">Rules & Format</h2>
            <ul>
              <li>All participants must have a valid Free Fire account</li>
              <li>Players must join the room 15 minutes before the start time</li>
              <li>Use of hacks, mods, or cheating tools will result in immediate disqualification</li>
              <li>Tournament will be played in Battle Royale mode with standard settings</li>
              <li>Points will be awarded for both eliminations and placement</li>
              <li>Final rankings will be determined by total points across all matches</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8">Prize Distribution</h2>
            <ul>
              <li>1st Place: ₹{tournament.prizePool * 0.5}</li>
              <li>2nd Place: ₹{tournament.prizePool * 0.3}</li>
              <li>3rd Place: ₹{tournament.prizePool * 0.15}</li>
              <li>4th-10th Place: Share of ₹{tournament.prizePool * 0.05}</li>
            </ul>
          </div>
          
          {tournament.status === TournamentStatus.ACTIVE && tournament.roomId && tournament.password && (
            <Alert className="mb-8 border-green-500">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle>Room Details Available</AlertTitle>
              <AlertDescription className="font-mono">
                Room ID: {tournament.roomId} | Password: {tournament.password}
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        {/* Sidebar */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Tournament Details</CardTitle>
              <CardDescription>Join this tournament for ₹{tournament.entryFee}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Participants</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{tournament.participants}/{tournament.maxParticipants}</span>
                  <span className="text-sm text-muted-foreground">
                    {tournament.maxParticipants - tournament.participants} spots left
                  </span>
                </div>
                <Progress value={percentFilled} className="h-2" />
              </div>
              
              {tournament.status === TournamentStatus.UPCOMING && percentFilled >= 90 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Limited Spots</AlertTitle>
                  <AlertDescription>
                    Only {tournament.maxParticipants - tournament.participants} spots remaining. Join now!
                  </AlertDescription>
                </Alert>
              )}
              
              {tournament.status === TournamentStatus.COMPLETED && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Tournament Completed</AlertTitle>
                  <AlertDescription>
                    This tournament has already taken place.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            
            <CardFooter>
              {tournament.status === TournamentStatus.UPCOMING && (
                <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full" 
                      onClick={handleJoinTournament}
                      disabled={tournament.participants >= tournament.maxParticipants}
                    >
                      Join Tournament
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Join Tournament</DialogTitle>
                      <DialogDescription>
                        Complete payment to secure your spot in the tournament
                      </DialogDescription>
                    </DialogHeader>
                    <PaymentForm 
                      tournamentId={tournament.id} 
                      entryFee={tournament.entryFee} 
                      onSuccess={() => setIsPaymentDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              )}
              
              {tournament.status === TournamentStatus.ACTIVE && (
                <Button className="w-full" variant={tournament.roomId ? "default" : "outline"}>
                  {tournament.roomId ? "Join Match Room" : "Waiting to Start"}
                </Button>
              )}
              
              {tournament.status === TournamentStatus.COMPLETED && (
                <Button asChild className="w-full" variant="outline">
                  <Link to="/tournaments">View Results</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;
