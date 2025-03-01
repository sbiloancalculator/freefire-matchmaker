
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TournamentCard } from "@/components/tournament/TournamentCard";
import { Search } from "lucide-react";
import { TournamentStatus, Tournament } from "@/lib/types";

// Mock data for tournaments
const mockTournaments: Tournament[] = [
  {
    id: "1",
    name: "Free Fire Cup Season 5",
    description: "Join the biggest Free Fire tournament of the season!",
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
    description: "Compete with the best Free Fire players this weekend.",
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
    description: "Elite tournament for experienced players only.",
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
    description: "Team up with friends and compete against other squads.",
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
    description: "Monthly Free Fire tournament for all skill levels.",
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

const Tournaments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTournaments = mockTournaments.filter((tournament) => {
    // Filter by search term
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    let matchesTab = true;
    if (activeTab === "upcoming") {
      matchesTab = tournament.status === TournamentStatus.UPCOMING;
    } else if (activeTab === "active") {
      matchesTab = tournament.status === TournamentStatus.ACTIVE;
    } else if (activeTab === "completed") {
      matchesTab = tournament.status === TournamentStatus.COMPLETED;
    }
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tournaments</h1>
      
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tournaments..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Tournament Cards */}
      {filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No tournaments found</p>
          <Button onClick={() => setSearchTerm("")} className="mt-4">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Tournaments;
