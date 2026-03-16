'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Text } from '@/design-system/typography/text';
import { 
  Users as UsersIcon, 
  Search, 
  Filter, 
  Loader2, 
  ShieldCheck, 
  UserPlus, 
  MoreVertical,
  CheckCircle2,
  XCircle,
  Ban,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  UserCheck,
  Globe,
  Edit
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function UserIdentityRegistry() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Mock Identity Matrix
  const [users, setUsers] = useState([
    { id: 'u-1', name: "Eleanor Vance", email: "e.vance@imperialpedia.com", role: "Super Admin", tier: "Root", status: "Active" },
    { id: 'u-2', name: "Julian Wealth", email: "j.wealth@institutional.com", role: "Editor", tier: "Elite", status: "Active" },
    { id: 'u-3', name: "Sarah Crypto", email: "sarah@defi.io", role: "Expert Author", tier: "Pro", status: "Active" },
    { id: 'u-4', name: "Node Vendor #42", email: "vendor.42@discovery.com", role: "Data Vendor", tier: "Standard", status: "Suspended" },
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  const handleStatusToggle = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
    ));
    toast({ title: "Identity State Shifted", description: "Status change synchronized across all identity nodes." });
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'Root': return <Badge className="bg-primary text-white border-none text-[8px] font-bold uppercase h-5 px-2">Root Node</Badge>;
      case 'Elite': return <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-[8px] font-bold uppercase h-5 px-2">Elite</Badge>;
      default: return <Badge variant="outline" className="text-[8px] border-white/10 uppercase h-5 px-2">{tier}</Badge>;
    }
  };

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <UsersIcon className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Identity Orchestration</Text>
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
            placeholder="Search by name, email, or institutional ID..." 
            className="pl-12 bg-background/50 h-12 border-white/10 rounded-xl text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 px-6 rounded-xl border-white/10 bg-background/30 gap-2 font-bold text-xs">
            <Filter className="h-4 w-4 text-primary" /> Filter Segment
          </Button>
        </div>
      </div>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 border-b border-white/5">
                <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-6">Handshake Identity</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest">Platform Persona</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Trust Tier</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Lifecycle Status</TableHead>
                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
                    <Text variant="caption" className="mt-4 block animate-pulse font-bold tracking-widest uppercase">Syncing Identity Matrix...</Text>
                  </TableCell>
                </TableRow>
              ) : filtered.map((user) => (
                <TableRow key={user.id} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                  <TableCell className="py-5 pl-8">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 rounded-xl border-2 border-background ring-1 ring-white/10 shadow-xl group-hover:border-primary/30 transition-all">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs uppercase">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors">{user.name}</span>
                        <span className="text-[9px] text-muted-foreground font-mono truncate max-w-[150px]">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium text-foreground/70 uppercase tracking-tight">{user.role}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">{getTierBadge(user.tier)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Badge className={cn(
                        "text-[8px] font-bold uppercase border-none px-2 h-5",
                        user.status === 'Active' ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
                      )}>{user.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-primary"><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-destructive" onClick={() => handleStatusToggle(user.id)}>
                        {user.status === 'Active' ? <Ban className="h-3.5 w-3.5" /> : <UserCheck className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Segment Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card bg-primary/5 border-primary/20 p-8 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
            <UsersIcon className="h-24 w-24 text-primary" />
          </div>
          <Text variant="bodySmall" weight="bold" className="text-primary flex items-center gap-2 uppercase tracking-widest text-[10px]">
            <ShieldAlert className="h-4 w-4" /> Behavioral Audit
          </Text>
          <Text variant="caption" className="text-muted-foreground leading-relaxed">
            Identity churn is down 15% following the deployment of the **Expert Rewards** node. 92% of Pro users are engaging with the AI workspace weekly.
          </Text>
        </Card>

        <Card className="glass-card bg-secondary/5 border-secondary/20 p-8 flex flex-col gap-4">
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