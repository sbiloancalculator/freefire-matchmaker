
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users } from "lucide-react";
import { Tournament, TournamentStatus } from "@/lib/types";

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
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

  return (
    <Card className="overflow-hidden transition-all-200 hover:shadow-md scale-on-hover">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={tournament.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070"} 
          alt={tournament.name} 
          className="w-full h-full object-cover"
        />
        <Badge 
          className={`absolute top-4 right-4 ${statusColors[tournament.status]}`}
        >
          {statusText[tournament.status]}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-1">{tournament.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-2">
          {tournament.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              {format(tournament.date, "MMM dd, yyyy")}
            </span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{tournament.time}</span>
          </div>
          
          <div className="flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">₹{tournament.prizePool}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              {tournament.participants}/{tournament.maxParticipants}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <span className="font-medium">Entry: ₹{tournament.entryFee}</span>
        <Button asChild>
          <Link to={`/tournaments/${tournament.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
