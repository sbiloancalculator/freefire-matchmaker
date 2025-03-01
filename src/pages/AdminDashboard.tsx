
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, Users, Trophy, DollarSign, UserPlus, Calendar, 
  AlertTriangle, Shield, FileText, Settings, Bell, CheckCircle, XCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { TournamentStatus, PaymentStatus } from "@/lib/types";
import { UserManagement } from "@/components/admin/UserManagement";
import { PaymentVerification } from "@/components/admin/PaymentVerification";
import { TournamentManagement } from "@/components/admin/TournamentManagement";
import { LegalCompliance } from "@/components/admin/LegalCompliance";
import { AdminSettings } from "@/components/admin/AdminSettings";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tournaments");

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

  // Mock data for admin dashboard summary
  const dashboardSummary = {
    totalUsers: 150,
    newUsers: 24,
    activeTournaments: 5,
    revenue: 12500,
    pendingVerifications: 2
  };

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
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardSummary.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +{dashboardSummary.newUsers} from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tournaments</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardSummary.activeTournaments}</div>
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
            <div className="text-2xl font-bold">₹{dashboardSummary.revenue}</div>
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
            <div className="text-2xl font-bold">{dashboardSummary.newUsers}</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardSummary.pendingVerifications}</div>
            <p className="text-xs text-muted-foreground">
              Require verification
            </p>
          </CardContent>
        </Card>
      </div>
      
      <PaymentVerification />
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="legal">Legal & Compliance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tournaments">
          <TournamentManagement />
        </TabsContent>
        
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="legal">
          <LegalCompliance />
        </TabsContent>
        
        <TabsContent value="settings">
          <AdminSettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>
                Important alerts and system messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-4 border rounded-lg bg-muted/20">
                  <Bell className="h-5 w-5 mr-3 text-blue-500" />
                  <div className="flex-1">
                    <h4 className="font-medium">Morning Tournament Starting Soon</h4>
                    <p className="text-sm text-muted-foreground">Morning tournament at 9:00 AM has 18/20 players registered</p>
                  </div>
                  <Badge variant="outline">6 min ago</Badge>
                </div>
                
                <div className="flex items-center p-4 border rounded-lg bg-muted/20">
                  <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                  <div className="flex-1">
                    <h4 className="font-medium">Payment Verification Pending</h4>
                    <p className="text-sm text-muted-foreground">2 new payment verifications need your approval</p>
                  </div>
                  <Badge variant="outline">2 hours ago</Badge>
                </div>
                
                <div className="flex items-center p-4 border rounded-lg bg-muted/20">
                  <Shield className="h-5 w-5 mr-3 text-amber-500" />
                  <div className="flex-1">
                    <h4 className="font-medium">Policy Update Required</h4>
                    <p className="text-sm text-muted-foreground">Terms of service need to be updated for compliance</p>
                  </div>
                  <Badge variant="outline">1 day ago</Badge>
                </div>
              </div>
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
            <div className="flex items-center">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Morning Tournament
                </p>
                <p className="text-sm text-muted-foreground">
                  Today at 9:00 AM
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-500">
                  18/20 players
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Evening Tournament
                </p>
                <p className="text-sm text-muted-foreground">
                  Today at 9:00 PM
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500">
                  12/20 players
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
