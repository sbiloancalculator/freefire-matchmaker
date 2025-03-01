
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { toast } from "sonner";

// Mock user data
const recentUsers = [
  {
    id: "user123",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    freefireId: "FF123456",
    registeredDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "active",
    whatsapp: "9427415370"
  },
  {
    id: "user456",
    name: "Priya Patel",
    email: "priya@example.com",
    freefireId: "FF789012",
    registeredDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "active",
    whatsapp: "9427415370"
  },
  {
    id: "user789",
    name: "Amit Kumar",
    email: "amit@example.com",
    freefireId: "FF345678",
    registeredDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: "active",
    whatsapp: "9427415370"
  }
];

export function UserManagement() {
  const [users, setUsers] = useState(recentUsers);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const handleBanUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? {...user, status: user.status === "banned" ? "active" : "banned"} 
        : user
    ));
    
    toast.success(`User ${users.find(u => u.id === userId)?.status === "banned" ? "unbanned" : "banned"} successfully`);
  };

  const handleContactUser = (user: any) => {
    setSelectedUser(user);
    setShowContactDialog(true);
  };

  return (
    <>
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
                <TableHead>Free Fire ID</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className={user.status === "banned" ? "bg-red-50" : ""}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.freefireId}</TableCell>
                  <TableCell>{user.registeredDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`capitalize ${user.status === "banned" ? "text-red-500" : ""}`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleContactUser(user)}
                      >
                        Contact
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={user.status === "banned" ? "text-green-500" : "text-red-500"}
                        onClick={() => handleBanUser(user.id)}
                      >
                        {user.status === "banned" ? "Unban" : "Ban"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact User</DialogTitle>
            <DialogDescription>
              User contact information
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Name:</div>
                <div>{selectedUser.name}</div>
                
                <div className="font-medium">Email:</div>
                <div>{selectedUser.email}</div>
                
                <div className="font-medium">WhatsApp:</div>
                <div>{selectedUser.whatsapp}</div>
                
                <div className="font-medium">Free Fire ID:</div>
                <div>{selectedUser.freefireId}</div>
              </div>
              
              <div className="pt-2">
                <Button 
                  className="w-full"
                  onClick={() => {
                    window.open(`https://wa.me/${selectedUser.whatsapp}`, '_blank');
                  }}
                >
                  Open WhatsApp Chat
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
