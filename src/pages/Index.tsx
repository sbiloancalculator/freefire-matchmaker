
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TournamentCard } from "@/components/tournament/TournamentCard";
import { TournamentStatus } from "@/lib/types";

const featuredTournaments = [
  {
    id: "1",
    name: "Free Fire Cup Season 5",
    description: "Join the biggest Free Fire tournament of the season!",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
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
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
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
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    time: "9:00 PM",
    entryFee: 100,
    prizePool: 10000,
    participants: 24,
    maxParticipants: 30,
    status: TournamentStatus.UPCOMING,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/80 to-primary overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000')] opacity-20 bg-cover bg-center"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Free Fire Tournament Hub
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join exciting tournaments, compete against the best players, and win amazing prizes!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/tournaments">Browse Tournaments</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-all-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Register</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Create your account with your Free Fire ID to join tournaments
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-all-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Pay Entry Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Make payment via UPI and verify with UTR number
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-all-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Join Match</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Get room ID and password on the tournament day
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-all-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Win Prizes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Top performers win from the prize pool
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Tournaments</h2>
            <Button asChild variant="outline">
              <Link to="/tournaments">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Compete?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join our growing community of Free Fire players and showcase your skills in our tournaments.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
