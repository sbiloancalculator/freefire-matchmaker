
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { TournamentStatus, Tournament } from "@/lib/types";
import { toast } from "sonner";

// Mock tournaments data
const recentTournaments: Tournament[] = [
  {
    id: "1",
    name: "Morning Tournament",
    description: "Daily morning tournament for Free Fire players",
    date: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    time: "9:00 AM",
    entryFee: 30,
    prizePool: 500,
    participants: 18,
    minParticipants: 20,
    maxParticipants: 50,
    status: TournamentStatus.UPCOMING
  },
  {
    id: "2",
    name: "Evening Tournament",
    description: "Daily evening tournament for Free Fire players",
    date: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours from now
    time: "9:00 PM",
    entryFee: 30,
    prizePool: 500,
    participants: 12,
    minParticipants: 20,
    maxParticipants: 50,
    status: TournamentStatus.UPCOMING
  },
  {
    id: "3",
    name: "Previous Tournament",
    description: "Yesterday's tournament",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    time: "9:00 PM",
    entryFee: 30,
    prizePool: 500,
    participants: 36,
    minParticipants: 20,
    maxParticipants: 50,
    status: TournamentStatus.COMPLETED
  }
];

export function TournamentManagement() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<Tournament[]>(recentTournaments);
  const [showRoomDialog, setShowRoomDialog] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [roomDetails, setRoomDetails] = useState({ roomId: "", password: "" });

  const handleStartTournament = (tournament: Tournament) => {
    if (tournament.participants < (tournament.minParticipants || 0)) {
      toast.error(`Cannot start tournament. Minimum ${tournament.minParticipants} players required.`);
      return;
    }
    
    setSelectedTournament(tournament);
    setShowRoomDialog(true);
  };

  const handleSubmitRoomDetails = () => {
    if (!roomDetails.roomId || !roomDetails.password) {
      toast.error("Room ID and password are required");
      return;
    }

    // Update tournament status and add room details
    const updatedTournaments = tournaments.map(t => {
      if (t.id === selectedTournament?.id) {
        return {
          ...t,
          status: TournamentStatus.ACTIVE,
          roomId: roomDetails.roomId,
          password: roomDetails.password
        };
      }
      return t;
    });

    setTournaments(updatedTournaments);
    setShowRoomDialog(false);
    toast.success("Tournament started successfully!");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>All Tournaments</CardTitle>
            <div className="flex items-center w-full md:w-auto">
              <div className="relative flex-1 mr-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tournaments..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Entry Fee</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournaments.map((tournament) => (
                <TableRow key={tournament.id}>
                  <TableCell className="font-medium">{tournament.name}</TableCell>
                  <TableCell>
                    {new Date(tournament.date).toLocaleDateString()} {tournament.time}
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      tournament.status === TournamentStatus.UPCOMING ? "bg-blue-500" : 
                      tournament.status === TournamentStatus.ACTIVE ? "bg-green-500" : 
                      "bg-gray-500"
                    }>
                      {tournament.status}
                    </Badge>
                  </TableCell>
                  <TableCell>₹{tournament.entryFee}</TableCell>
                  <TableCell>
                    {tournament.participants}/{tournament.maxParticipants}
                    {tournament.participants < (tournament.minParticipants || 0) && (
                      <Badge className="ml-2 bg-amber-500">
                        Min {tournament.minParticipants}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate(`/tournaments/${tournament.id}`)}
                      >
                        View
                      </Button>
                      
                      {tournament.status === TournamentStatus.UPCOMING && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStartTournament(tournament)}
                          disabled={tournament.participants < (tournament.minParticipants || 0)}
                        >
                          Start
                        </Button>
                      )}
                      
                      {tournament.status === TournamentStatus.ACTIVE && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Show room details
                            setSelectedTournament(tournament);
                            setRoomDetails({
                              roomId: tournament.roomId || "",
                              password: tournament.password || ""
                            });
                            setShowRoomDialog(true);
                          }}
                        >
                          Room Details
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showRoomDialog} onOpenChange={setShowRoomDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedTournament?.status === TournamentStatus.ACTIVE 
                ? "Tournament Room Details" 
                : "Start Tournament"}
            </DialogTitle>
            <DialogDescription>
              {selectedTournament?.status === TournamentStatus.ACTIVE
                ? "These details are shared with verified participants"
                : "Enter the game room details for participants"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="roomId">Room ID</Label>
              <Input 
                id="roomId" 
                value={roomDetails.roomId}
                onChange={(e) => setRoomDetails({...roomDetails, roomId: e.target.value})}
                placeholder="Enter the game room ID"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                value={roomDetails.password}
                onChange={(e) => setRoomDetails({...roomDetails, password: e.target.value})}
                placeholder="Enter the room password"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoomDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRoomDetails}>
              {selectedTournament?.status === TournamentStatus.ACTIVE ? "Update Details" : "Start Tournament"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
