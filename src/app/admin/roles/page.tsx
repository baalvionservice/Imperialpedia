'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/design-system/typography/text';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Settings2, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Loader2,
  Lock,
  Search,
  Info
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { usersService } from '@/services/data/users-service';
import { RoleDefinition } from '@/types';
import { ALL_PERMISSIONS } from '@/services/mock-api/roles';
import { toast } from '@/hooks/use-toast';

/**
 * Role and Permission Management Dashboard.
 * Allows administrators to define capabilities for platform staff and experts.
 */
export default function RoleManagementPage() {
  const [roles, setRoles] = useState<RoleDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState<RoleDefinition | null>(null);

  useEffect(() => {
    async function loadRoles() {
      try {
        const response = await usersService.getRoles();
        setRoles(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadRoles();
  }, []);

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

    if (currentRole.id) {
      setRoles(prev => prev.map(r => r.id === currentRole.id ? currentRole : r));
    } else {
      setRoles(prev => [...prev, { ...currentRole, id: Math.random().toString() }]);
    }

    toast({
      title: "Capabilities Updated",
      description: `Permissions for the "${currentRole.name}" role have been synchronized.`,
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Text variant="bodySmall" className="animate-pulse">Retrieving Access Matrix...</Text>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Lock className="h-4 w-4" />
            <Text variant="label" className="text-[10px] font-bold tracking-widest uppercase">System Security</Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold">Role Capabilities</Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Define and audit functional permissions for platform staff and the expert network.
          </Text>
        </div>
        <Button onClick={() => {
          setCurrentRole({ id: '', name: 'reader', description: '', permissions: [] });
          setIsEditing(true);
        }} className="rounded-xl shadow-lg shadow-primary/20 font-bold">
          <Plus className="mr-2 h-4 w-4" /> Create Custom Role
        </Button>
      </header>

      {/* Main Roles Table */}
      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20 border-b border-white/5">
                <TableHead className="pl-6 font-bold text-[10px] uppercase tracking-widest">Role Identity</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest">Description</TableHead>
                <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">Active Nodes</TableHead>
                <TableHead className="text-right pr-6 font-bold text-[10px] uppercase tracking-widest">Administrative Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id} className="group hover:bg-muted/10 transition-colors border-b border-white/5">
                  <TableCell className="py-5 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-tight">{role.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <Text variant="caption" className="text-muted-foreground leading-relaxed line-clamp-2">
                      {role.description}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-mono font-bold text-[10px] px-3">
                        {role.permissions.length} nodes
                      </Badge>
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
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive transition-colors">
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

      {/* Security Context Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card bg-primary/5 border-primary/20 p-6 flex flex-col gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 w-fit text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">Least Privilege Principle</Text>
            <Text variant="caption" className="text-muted-foreground mt-1 leading-relaxed">
              Users are assigned the minimum levels of access necessary to perform their roles. This limits platform risk and prevents lateral traversal during account compromise.
            </Text>
          </div>
        </Card>
        
        <Card className="glass-card border-secondary/20 p-6 flex flex-col gap-4">
          <div className="p-3 rounded-2xl bg-secondary/10 w-fit text-secondary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">Immutable Audit Chain</Text>
            <Text variant="caption" className="text-muted-foreground mt-1 leading-relaxed">
              Every permission change is logged in the cryptographic Audit Trail. Role modifications are attributed to the initiating administrator for total platform accountability.
            </Text>
          </div>
        </Card>

        <Card className="glass-card border-amber-500/20 p-6 flex flex-col gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 w-fit text-amber-500">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <Text variant="bodySmall" weight="bold">Inheritance Logic</Text>
            <Text variant="caption" className="text-muted-foreground mt-1 leading-relaxed">
              Platform roles utilize a flat inheritance model. To add higher-level permissions to a role, toggle the specific capability nodes within the Role Configuration hub.
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
                {currentRole?.id ? 'Configure Role' : 'Create Custom Role'}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2">
                Define functional nodes and access parameters for this persona.
              </DialogDescription>
            </DialogHeader>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Role Label</Label>
                  <Input 
                    value={currentRole?.name || ''} 
                    onChange={(e) => setCurrentRole(prev => prev ? { ...prev, name: e.target.value as any } : null)}
                    placeholder="e.g. Moderator" 
                    className="bg-background/50 border-white/5 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Internal Description</Label>
                  <Input 
                    value={currentRole?.description || ''} 
                    onChange={(e) => setCurrentRole(prev => prev ? { ...prev, description: e.target.value } : null)}
                    placeholder="Briefly explain this role's purpose..." 
                    className="bg-background/50 border-white/5 h-12"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4" /> Capability Matrix
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ALL_PERMISSIONS.map((perm) => (
                    <div 
                      key={perm.id} 
                      className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:bg-white/5 ${
                        currentRole?.permissions.includes(perm.id) 
                          ? 'border-primary/40 bg-primary/5' 
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
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit" className="h-12 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                Synchronize Role
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
