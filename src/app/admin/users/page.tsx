'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Text } from '@/design-system/typography/text';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  MoreVertical, 
  Mail, 
  ShieldCheck, 
  Edit, 
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Ban,
  UserCircle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { usersService } from '@/services/data/users-service';
import { User, Role, UserStatus } from '@/types';
import { toast } from '@/hooks/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

/**
 * User Management and RBAC Dashboard.
 * Allows administrators to manage CMS users, assign roles, and control account status.
 */
export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await usersService.getUsers();
        setUsers(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const handleRoleChange = (userId: string, newRole: Role) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    toast({
      title: "Role Updated",
      description: `User role has been changed to ${newRole}.`,
    });
  };

  const handleStatusToggle = (userId: string, currentStatus: UserStatus = 'active') => {
    const newStatus: UserStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    
    toast({
      title: newStatus === 'suspended' ? "User Suspended" : "User Reactivated",
      description: `Access status for the user has been updated to ${newStatus}.`,
      variant: newStatus === 'suspended' ? 'destructive' : 'default',
    });
  };

  const handleDelete = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    toast({
      title: "User Purged",
      description: "User identity has been removed from the platform index.",
      variant: "destructive",
    });
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: UserStatus = 'active') => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] font-bold uppercase tracking-tighter"><CheckCircle2 className="h-3 w-3 mr-1" /> Active</Badge>;
      case 'suspended':
        return <Badge variant="destructive" className="text-[10px] font-bold uppercase tracking-tighter"><Ban className="h-3 w-3 mr-1" /> Suspended</Badge>;
      default:
        return <Badge variant="outline" className="text-[10px] font-bold uppercase">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <ShieldAlert className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Platform Governance</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold">User Administration</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Manage expert identities, administrative roles, and platform-wide access status.
          </Text>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-xl h-11 px-6 shadow-lg shadow-primary/20">
          <UserPlus className="mr-2 h-4 w-4" /> Add CMS User
        </Button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-card/30 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search directory by name or communication node..." 
            className="pl-10 bg-background/50 h-11 border-white/10 rounded-xl" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20 border-b border-white/5">
                <TableHead className="pl-6 font-bold text-[10px] uppercase tracking-widest">User Identity</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">System Role</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Access Status</TableHead>
                <TableHead className="text-right pr-6 font-bold text-[10px] uppercase tracking-widest">Administrative Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Loader2 className="h-10 w-10 text-primary animate-spin" />
                      <Text variant="caption" className="animate-pulse">Syncing User Directory...</Text>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground italic">
                    No users found matching your discovery parameters.
                  </TableCell>
                </TableRow>
              ) : filteredUsers.map((user) => (
                <TableRow key={user.id} className="group hover:bg-muted/10 transition-colors border-b border-white/5">
                  <TableCell className="py-5 pl-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-11 w-11 rounded-2xl border-2 border-white/5 group-hover:border-primary/30 transition-colors">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold flex items-center gap-1.5">
                          {user.name}
                          {user.role === 'admin' && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase tracking-tighter">
                          <Mail className="h-2.5 w-2.5" /> {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Select 
                        defaultValue={user.role} 
                        onValueChange={(val) => handleRoleChange(user.id, val as Role)}
                      >
                        <SelectTrigger className="w-[140px] h-9 text-[10px] font-bold uppercase tracking-widest bg-background/50 border-white/10 rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="creator">Creator</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      {getStatusBadge(user.status)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-9 px-3 text-xs font-bold gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <Edit className="h-3.5 w-3.5" /> View
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg border border-transparent hover:border-white/10">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52">
                          <DropdownMenuLabel className="text-[10px] uppercase font-bold tracking-widest opacity-50">Quick Management</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleStatusToggle(user.id, user.status)}>
                            {user.status === 'suspended' ? (
                              <><CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" /> Reactivate Account</>
                            ) : (
                              <><Ban className="mr-2 h-4 w-4 text-destructive" /> Suspend Access</>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShieldCheck className="mr-2 h-4 w-4" /> Force Password Reset
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:bg-destructive/10" onClick={() => handleDelete(user.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Identity
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Role Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card bg-primary/5 border-primary/20 p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <ShieldCheck className="h-16 w-16" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold" className="text-primary flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> System Control (Admins)
            </Text>
            <Text variant="caption" className="text-muted-foreground mt-2 leading-relaxed">
              {users.filter(u => u.role === 'admin').length} Active. Full system governance, taxonomy control, and global SEO auditing.
            </Text>
          </div>
        </Card>

        <Card className="glass-card bg-secondary/5 border-secondary/20 p-6 flex flex-col gap-4">
          <div>
            <Text variant="bodySmall" weight="bold" className="text-secondary flex items-center gap-2">
              <UserCircle className="h-4 w-4" /> Expert Creators
            </Text>
            <Text variant="caption" className="text-muted-foreground mt-2 leading-relaxed">
              {users.filter(u => u.role === 'creator').length} Active. Verified research publication and audience monetization capabilities.
            </Text>
          </div>
        </Card>

        <Card className="glass-card border-white/5 p-6 flex flex-col gap-4 bg-muted/5">
          <div>
            <Text variant="bodySmall" weight="bold" className="text-muted-foreground flex items-center gap-2">
              <UsersIcon className="h-4 w-4" /> Global Viewers
            </Text>
            <Text variant="caption" className="text-muted-foreground mt-2 leading-relaxed">
              Managing high-scale reader registration and community interaction status.
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
