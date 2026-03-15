'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/design-system/typography/text';
import { 
  ShieldCheck, 
  Settings2, 
  Plus, 
  Trash2, 
  Loader2,
  Lock,
  Search,
  Users,
  ShieldAlert,
  ChevronRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { usersService } from '@/services/data/users-service';
import { RoleControl } from '@/types/system';
import { ALL_PERMISSIONS } from '@/services/mock-api/roles';
import { toast } from '@/hooks/use-toast';

/**
 * Role Governance and Permissions Hub.
 * Specialized control Matrix for managing platform personas and capability nodes.
 */
export default function RoleControlMatrixPage() {
  const [roles, setRoles] = useState<RoleControl[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState<RoleControl | null>(null);

  useEffect(() => {
    async function loadRoles() {
      try {
        const response = await usersService.getControlRoles();
        if (response.data) setRoles(response.data);
      } catch (e) {
        console.error('Role matrix sync failure', e);
      } finally {
        setLoading(false);
      }
    }
    loadRoles();
  }, []);

  const filteredRoles = roles.filter(role => 
    role.roleName.toLowerCase().includes(search.toLowerCase())
  );

  const handleTogglePermission = (permissionId: string) => {
    if (!currentRole) return;
    
    const hasPermission = currentRole.permissions.includes(permissionId);
    const updatedPermissions = hasPermission
      ? currentRole.permissions.filter(p => p !== permissionId)
      : [...currentRole.permissions, permissionId];
      
    setCurrentRole({ ...currentRole, permissions: updatedPermissions });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRole) return;

    // Simulate persistence
    setRoles(prev => prev.map(r => r.id === currentRole.id ? currentRole : r));
    
    toast({
      title: "Role Configuration Synchronized",
      description: `Access parameters for "${currentRole.roleName}" have been updated in the cryptographic index.`,
    });
    setIsEditing(false);
  };

  const handleDelete = (id: string, name: string) => {
    setRoles(prev => prev.filter(r => r.id !== id));
    toast({
      title: "Role Purged",
      description: `Persona "${name}" has been removed from the governance matrix.`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Lock className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">Security Governance</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold">Role Control Matrix</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Define system personas and assign functional nodes across the expert ecosystem.
          </Text>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-xl h-11 px-6 shadow-lg shadow-primary/20 font-bold">
          <Plus className="mr-2 h-4 w-4" /> Create Custom Role
        </Button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-card/30 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search roles by label or identifier..." 
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
                <TableHead className="pl-6 font-bold text-[10px] uppercase tracking-widest py-4">Role Identity</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Users Assigned</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest">Active Capability Nodes</TableHead>
                <TableHead className="text-right pr-6 font-bold text-[10px] uppercase tracking-widest">Governance Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
                    <Text variant="caption" className="mt-4 block animate-pulse font-bold tracking-widest uppercase">Retrieving Access Matrix...</Text>
                  </TableCell>
                </TableRow>
              ) : filteredRoles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-muted-foreground italic">
                    No matching roles localized in current governance buffer.
                  </TableCell>
                </TableRow>
              ) : filteredRoles.map((role) => (
                <TableRow key={role.id} className="group hover:bg-muted/10 transition-colors border-b border-white/5">
                  <TableCell className="py-5 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold uppercase tracking-tight block">{role.roleName}</span>
                        <span className="text-[9px] text-muted-foreground font-mono">ID: {role.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold">{role.usersAssigned.toLocaleString()}</span>
                      <span className="text-[9px] text-muted-foreground uppercase">Accounts</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map(p => (
                        <Badge key={p} variant="secondary" className="bg-primary/5 text-primary border-none text-[8px] font-bold py-0 h-4">
                          {p.replace('_', ' ')}
                        </Badge>
                      ))}
                      {role.permissions.length > 3 && (
                        <span className="text-[10px] text-muted-foreground font-bold ml-1">+{role.permissions.length - 3} more</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-9 px-3 text-xs font-bold gap-2 text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => {
                          setCurrentRole(role);
                          setIsEditing(true);
                        }}
                      >
                        <Settings2 className="h-3.5 w-3.5" /> Configure
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-muted-foreground hover:text-destructive transition-colors"
                        onClick={() => handleDelete(role.id, role.roleName)}
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

      {/* Governance Context Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card bg-primary/5 border-primary/20 p-6 flex flex-col gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 w-fit text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">Principle of Least Privilege</Text>
            <Text variant="caption" className="text-muted-foreground mt-1 leading-relaxed">
              Personas should only be assigned functional nodes required for their specific platform duties. This limits vertical traversal risk during account audits.
            </Text>
          </div>
        </Card>
        
        <Card className="glass-card border-secondary/20 p-6 flex flex-col gap-4">
          <div className="p-3 rounded-2xl bg-secondary/10 w-fit text-secondary">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">Capability Inheritance</Text>
            <Text variant="caption" className="text-muted-foreground mt-1 leading-relaxed">
              Custom roles inherit the base 'Reader' nodes by default. Ensure high-impact nodes like `system_config` are restricted to Super-Admin cohorts only.
            </Text>
          </div>
        </Card>

        <Card className="glass-card border-emerald-500/20 p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="p-3 rounded-2xl bg-emerald-500/10 w-fit text-emerald-500">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">Audit Trace Active</Text>
            <Text variant="caption" className="text-muted-foreground mt-1 leading-relaxed">
              Every modification to the Role Control Matrix is cryptographically logged in the System Audit Trail, attributing changes to the initiating administrator.
            </Text>
          </div>
        </Card>
      </div>

      {/* Role Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-white/10 p-0">
          <form onSubmit={handleSave}>
            <DialogHeader className="p-8 bg-primary/5 border-b border-white/5">
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <Settings2 className="h-6 w-6 text-primary" /> 
                Refine Persona: {currentRole?.roleName}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2">
                Toggle functional nodes to modify access parameters for this system persona.
              </DialogDescription>
            </DialogHeader>
            
            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                  <ShieldAlert className="h-4 w-4" /> Functional Node Matrix
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ALL_PERMISSIONS.map((perm) => (
                    <div 
                      key={perm.id} 
                      className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:bg-white/5 ${
                        currentRole?.permissions.includes(perm.id) 
                          ? 'border-primary/40 bg-primary/5 shadow-inner' 
                          : 'border-white/5 bg-background/30'
                      }`}
                      onClick={() => handleTogglePermission(perm.id)}
                    >
                      <Checkbox 
                        id={perm.id} 
                        checked={currentRole?.permissions.includes(perm.id)}
                        onCheckedChange={() => handleTogglePermission(perm.id)}
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <Label htmlFor={perm.id} className="text-sm font-bold cursor-pointer">{perm.label}</Label>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">{perm.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 bg-muted/20 border-t border-white/5 gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} className="h-12 px-6 rounded-xl font-bold">Cancel Reversion</Button>
              <Button type="submit" className="h-12 px-10 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                Synchronize Capability
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
