'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  Edit, 
  Trash2, 
  Ban, 
  CheckCircle2, 
  Loader2,
  Filter,
  ShieldAlert
} from 'lucide-react';
import { usersService } from '@/services/data/users-service';
import { User, Role, UserStatus } from '@/types';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

/**
 * Refined User Management Dashboard.
 * Specialized control matrix for auditing platform identities and access.
 */
export default function UserControlDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await usersService.getUsers();
        if (response.data) setUsers(response.data);
      } catch (e) {
        console.error('Identity sync failure', e);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: UserStatus = 'active') => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] font-bold uppercase gap-1.5 h-6 px-2">
            <CheckCircle2 className="h-2.5 w-2.5" /> Active
          </Badge>
        );
      case 'suspended':
        return (
          <Badge variant="destructive" className="text-[10px] font-bold uppercase gap-1.5 h-6 px-2">
            <Ban className="h-2.5 w-2.5" /> Suspended
          </Badge>
        );
      default:
        return <Badge variant="outline" className="text-[10px] font-bold uppercase h-6 px-2">{status}</Badge>;
    }
  };

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast({ 
      title: "User Purged", 
      description: "Identity has been removed from the platform index.", 
      variant: "destructive" 
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <ShieldAlert className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Ecosystem Governance</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold">User Management</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Auditing identity and access nodes across the Imperialpedia Index.
          </Text>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-xl h-11 px-6 shadow-lg shadow-primary/20 font-bold">
          <UserPlus className="mr-2 h-4 w-4" /> Provision User
        </Button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-card/30 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search identity directory by name or email..." 
            className="pl-10 bg-background/50 h-11 border-white/10 rounded-xl" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-11 px-4 rounded-xl border-white/10 gap-2 font-bold text-xs bg-background/30">
          <Filter className="h-3.5 w-3.5" /> Matrix Filters
        </Button>
      </div>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20 border-b border-white/5">
                <TableHead className="pl-6 font-bold text-[10px] uppercase tracking-widest py-4">User Identity</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest">Email Node</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">System Role</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Status</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Date Joined</TableHead>
                <TableHead className="text-right pr-6 font-bold text-[10px] uppercase tracking-widest">Administrative Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
                    <Text variant="caption" className="mt-4 block animate-pulse font-bold tracking-widest uppercase">Syncing Identity Matrix...</Text>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center text-muted-foreground italic">
                    No matching identities localized in current search buffer.
                  </TableCell>
                </TableRow>
              ) : filteredUsers.map((user) => (
                <TableRow key={user.id} className="group hover:bg-muted/10 transition-colors border-b border-white/5">
                  <TableCell className="py-5 pl-6">
                    <span className="text-sm font-bold block">{user.name}</span>
                    <span className="text-[10px] text-muted-foreground font-mono uppercase">ID: {user.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground font-medium">{user.email}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Badge variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] font-bold uppercase tracking-tighter h-6 px-3">
                        {user.role}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      {getStatusBadge(user.status)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-xs text-muted-foreground font-mono">
                      {user.dateJoined ? format(new Date(user.dateJoined), 'MMM d, yyyy') : '—'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
