
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Trophy, DollarSign, UserPlus, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { TournamentStatus, PaymentStatus } from "@/lib/types";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user && user.status !== "admin") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user || user.status !== "admin") {
    return null; // Don't render anything while redirecting
  }

  // Mock data for admin dashboard
  const recentTournaments = [
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
    },
    {
      id: "3",
      name: "Free Fire League",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      participants: 100,
      maxParticipants: 100,
      status: TournamentStatus.COMPLETED
    }
  ];

  // Mock payment verifications pending
  const pendingPayments = [
    {
      id: "1",
      userId: "user123",
      userName: "Rahul Sharma",
      tournamentId: "1",
      tournamentName: "Weekend Warriors Cup",
      amount: 100,
      utrNumber: "UTRB123456789",
      status: PaymentStatus.PENDING,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: "2",
      userId: "user456",
      userName: "Priya Patel",
      tournamentId: "1",
      tournamentName: "Weekend Warriors Cup",
      amount: 100,
      utrNumber: "UTRA987654321",
      status: PaymentStatus.PENDING,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];

  // Mock recent users
  const recentUsers = [
    {
      id: "user123",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      registeredDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "active"
    },
    {
      id: "user456",
      name: "Priya Patel",
      email: "priya@example.com",
      registeredDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "active"
    },
    {
      id: "user789",
      name: "Amit Kumar",
      email: "amit@example.com",
      registeredDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: "active"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Button onClick={() => navigate("/tournaments/create")} className="flex items-center">
            <Trophy className="mr-2 h-4 w-4" />
            Create Tournament
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">
              +12 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tournaments</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              2 tournaments this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,500</div>
            <p className="text-xs text-muted-foreground">
              +₹4,000 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Payment Verifications</CardTitle>
              <Badge variant="outline" className="ml-2">{pendingPayments.length} pending</Badge>
            </div>
            <CardDescription>
              Manual verification of tournament registration payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingPayments.length > 0 ? (
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
                  {pendingPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.userName}</TableCell>
                      <TableCell>{payment.tournamentName}</TableCell>
                      <TableCell>₹{payment.amount}</TableCell>
                      <TableCell className="font-mono">{payment.utrNumber}</TableCell>
                      <TableCell>{payment.date.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Verify
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
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
      </div>
      
      <Tabs defaultValue="tournaments" className="mb-8">
        <TabsList>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tournaments">
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
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTournaments.map((tournament) => (
                    <TableRow key={tournament.id}>
                      <TableCell className="font-medium">{tournament.name}</TableCell>
                      <TableCell>{new Date(tournament.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={
                          tournament.status === TournamentStatus.UPCOMING ? "bg-blue-500" : 
                          tournament.status === TournamentStatus.ACTIVE ? "bg-green-500" : 
                          "bg-gray-500"
                        }>
                          {tournament.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{tournament.participants}/{tournament.maxParticipants}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/tournaments/${tournament.id}`)}>
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <CardTitle>Users</CardTitle>
                <div className="flex items-center w-full md:w-auto">
                  <div className="relative flex-1 mr-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search users..."
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
                    <TableHead>Email</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.registeredDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Ban
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            Schedule for the next 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTournaments
              .filter(t => t.status === TournamentStatus.UPCOMING)
              .map((tournament) => (
                <div key={tournament.id} className="flex items-center">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {tournament.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(tournament.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">
                      {tournament.participants}/{tournament.maxParticipants}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
