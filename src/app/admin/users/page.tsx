'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  Users as UsersIcon, Search, Filter, Edit, Trash2, 
  ShieldCheck, Loader2, UserPlus, MoreVertical, 
  Mail, ArrowRight, ShieldAlert, CheckCircle2, Globe, ChevronRight
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { adminService } from '@/services/mock-api/admin';
import { UserNode } from '@/types/admin';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function UserCommunityManager() {
  const [users, setUsers] = useState<UserNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadData() {
      const res = await adminService.getUsers();
      setUsers(res.data);
      setLoading(false);
    }
    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Suspended': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    }
  };

  const handleAction = (id: string, action: string) => {
    toast({ title: "Action committed", description: `User ${id} has been ${action.toLowerCase()}ed.` });
  };

  if (loading) return <div className="py-40 flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <UsersIcon className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Community Command</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">Identity Registry</Text>
        </div>
        <Button className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8 transition-all scale-105 active:scale-95">
          <UserPlus className="mr-2 h-4 w-4" /> Provision Identity
        </Button>
      </header>

      {/* Toolbar */}
      <div className="bg-card/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search by identity name, email, or institutional node..." 
            className="pl-12 bg-background/50 h-12 border-white/10 rounded-xl text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 px-6 rounded-xl border-white/10 bg-background/30 gap-2 font-bold text-xs">
            <Filter className="h-4 w-4 text-primary" /> Filter Matrix
          </Button>
        </div>
      </div>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 border-b border-white/5">
                <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-6">User Identity</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest">Platform Persona</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Trust Level</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Lifecycle</TableHead>
                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map((user) => (
                <TableRow key={user.id} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                  <TableCell className="py-5 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-background/50 border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors">{user.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[150px]">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[8px] font-bold uppercase border-white/10 bg-black/20 px-2 h-5">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[8px] font-bold h-5 px-3 uppercase">{user.subscription}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Badge className={cn("text-[8px] font-bold uppercase border-none px-2 h-5", getStatusColor(user.status))}>{user.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-primary"><Edit className="h-3.5 w-3.5" /></Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><MoreVertical className="h-3.5 w-3.5" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 glass-card border-white/10 p-1">
                          <DropdownMenuLabel className="text-[9px] uppercase font-bold tracking-widest opacity-50 px-3 py-2">Account Control</DropdownMenuLabel>
                          <DropdownMenuItem className="rounded-lg h-9" onClick={() => handleAction(user.id, 'Verify')}>
                            <ShieldCheck className="mr-2 h-4 w-4 text-emerald-500" /> Verify Identity
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg h-9" onClick={() => handleAction(user.id, 'Suspend')}>
                            <ShieldAlert className="mr-2 h-4 w-4 text-amber-500" /> Suspend Access
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/5" />
                          <DropdownMenuItem className="text-destructive focus:bg-destructive/10 rounded-lg h-9" onClick={() => handleAction(user.id, 'Purge')}>
                            <Trash2 className="mr-2 h-4 w-4" /> Purge Identity
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="glass-card border-none bg-primary/5 p-8 flex flex-col gap-4 group">
          <div className="p-3 rounded-2xl bg-primary/10 w-fit text-primary group-hover:scale-110 transition-transform"><UsersIcon className="h-6 w-6" /></div>
          <Text variant="bodySmall" weight="bold" className="text-primary uppercase tracking-widest text-[10px]">Behavioral Audit</Text>
          <Text variant="caption" className="text-muted-foreground leading-relaxed">
            Identity churn is down 15% following the deployment of the **Expert Rewards** node. 92% of Pro users are engaging with the AI workspace weekly.
          </Text>
        </Card>

        <Card className="glass-card border-none bg-secondary/5 p-8 flex flex-col gap-4">
          <Text variant="bodySmall" weight="bold" className="text-secondary flex items-center gap-2 uppercase tracking-widest text-[10px]">
            <CheckCircle2 className="h-4 w-4" /> Vetting Queue
          </Text>
          <Text variant="caption" className="text-muted-foreground leading-relaxed">
            There are **12 expert candidates** awaiting institutional verification. 85% of applicants meet the Phase 2 credential matrix standards.
          </Text>
          <Button variant="link" className="p-0 h-auto text-secondary text-[10px] font-bold w-fit group" asChild>
            <Link href="/admin/creators/verification">
              Open Vetting Hub <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Card>

        <Card className="glass-card bg-emerald-500/5 border-emerald-500/20 p-8 flex flex-col gap-4">
          <Text variant="bodySmall" weight="bold" className="text-emerald-500 flex items-center gap-2 uppercase tracking-widest text-[10px]">
            <Globe className="h-4 w-4" /> Regional Mapping
          </Text>
          <Text variant="caption" className="text-muted-foreground leading-relaxed">
            Institutional adoption is peaking in the **London Cluster**. Recommend provision of 3 additional localized compliance nodes for Q3.
          </Text>
        </Card>
      </div>
    </div>
  );
}
