"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Text } from "@/design-system/typography/text";
import {
  LayoutDashboard,
  FileText,
  Users,
  TrendingUp,
  ShieldAlert,
  Loader2,
  ChevronRight,
  Plus,
  Zap,
  BarChart3,
  History,
  Terminal,
  Edit,
  CheckCircle2,
  Trash2,
  MoreVertical,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { getCmsDashboardData } from "@/services/mock-api/admin-cms";
import { CMSDashboardData } from "@/types/system";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

/**
 * Integrated Admin CMS Dashboard.
 * Orchestrates content lifecycle and system-wide intelligence auditing.
 * Aligned with Prompt 42 requirements.
 */
export default function AdminCmsDashboardPage() {
  const [data, setData] = useState<CMSDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getCmsDashboardData();
        setData(response.data);
      } catch (e) {
        console.error("CMS synchronization failure", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAction = (title: string, action: string) => {
    toast({
      title: `Action Initiated: ${action}`,
      description: `Targeting intelligence node: "${title}"`,
    });
  };

  if (loading || !data) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Text
          variant="bodySmall"
          className="animate-pulse font-bold tracking-widest uppercase text-muted-foreground"
        >
          Establishing Governance Handshake...
        </Text>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-24 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-1">
            <LayoutDashboard className="h-4 w-4" />
            <Text
              variant="label"
              className="text-[10px] font-bold tracking-widest uppercase"
            >
              Admin Command Hub
            </Text>
          </div>
          <Text variant="h1" className="text-3xl font-bold tracking-tight">
            CMS Mission Control
          </Text>
          <Text variant="bodySmall" className="text-muted-foreground mt-1">
            Orchestrating intelligence nodes and user personas across the index.
          </Text>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-xl border-white/10 h-11 px-6 bg-card/30"
          >
            <Plus className="mr-2 h-4 w-4" /> New Category
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20 font-bold bg-primary hover:bg-primary/90 h-11 px-8">
            <Plus className="mr-2 h-4 w-4" /> Provision Node
          </Button>
        </div>
      </header>

      {/* Analytics Summary Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.analytics.map((item, idx) => (
          <Card
            key={idx}
            className="glass-card border-none shadow-xl group hover:border-primary/20 transition-all"
          >
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {item.metric}
              </CardTitle>
              {idx % 2 === 0 ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <BarChart3 className="h-4 w-4 text-primary" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.value.toLocaleString()}
              </div>
              <p className="text-[10px] text-emerald-500 font-bold mt-1 uppercase tracking-tighter">
                Stable Cycle
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main CMS Management Table */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="glass-card border-none shadow-2xl overflow-hidden">
            <CardHeader className="bg-card/30 border-b border-white/5 p-8 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" /> Intelligence
                  Management
                </CardTitle>
                <CardDescription>
                  Managing content lifecycle for high-scale research nodes.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary font-bold text-xs"
                asChild
              >
                <Link href="/admin/media">
                  Media Library <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 border-b border-white/5">
                    <TableHead className="pl-8 font-bold text-[10px] uppercase tracking-widest py-4">
                      Intelligence Title
                    </TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest">
                      Expert
                    </TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-center">
                      Status
                    </TableHead>
                    <TableHead className="text-right pr-8 font-bold text-[10px] uppercase tracking-widest">
                      Administrative Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.cms_content.map((item) => (
                    <TableRow
                      key={item.content_id}
                      className="hover:bg-white/5 border-b border-white/5 group transition-colors"
                    >
                      <TableCell className="pl-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold truncate max-w-[300px] block">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground mt-1 font-mono uppercase">
                            Updated: {item.last_updated}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
                            {item.author.charAt(0)}
                          </div>
                          <span className="text-xs font-medium">
                            {item.author}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Badge
                            className={cn(
                              "text-[9px] font-bold uppercase border-none px-2 h-5",
                              item.status === "Published"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : item.status === "Review"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => handleAction(item.title, "Edit")}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {item.status === "Review" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-emerald-500 transition-colors"
                              title="Approve"
                              onClick={() =>
                                handleAction(item.title, "Approve")
                              }
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                            onClick={() => handleAction(item.title, "Delete")}
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

        {/* System Logs Buffer */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none shadow-xl h-full flex flex-col">
            <CardHeader className="bg-card/30 border-b border-white/5 p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Terminal className="h-4 w-4" /> Platform Activity
                </CardTitle>
                <Badge
                  variant="outline"
                  className="border-primary/20 text-primary text-[8px] font-bold h-5 px-2"
                >
                  LIVE STREAM
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <div className="divide-y divide-white/5 overflow-y-auto max-h-[500px] no-scrollbar">
                {data.system_logs.map((log, i) => (
                  <div
                    key={i}
                    className="p-5 hover:bg-white/5 transition-colors space-y-2 group"
                  >
                    <div className="flex justify-between items-start">
                      <Text
                        variant="caption"
                        className="font-bold text-foreground group-hover:text-primary transition-colors leading-relaxed"
                      >
                        {log.event}
                      </Text>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground font-mono uppercase tracking-tighter">
                      <span>User: {log.user}</span>
                      <span>{log.timestamp.split(" ")[1]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 bg-muted/20 border-t border-white/5">
              <Button
                variant="ghost"
                className="w-full h-10 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary rounded-none"
                asChild
              >
                <Link href="/admin/control/activity-log">
                  View Global Audit Trail
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Strategic Redirect Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/roles">
          <Card className="glass-card bg-primary/5 border-primary/20 p-8 flex items-start gap-6 group hover:border-primary/40 transition-all cursor-pointer">
            <div className="p-4 rounded-3xl bg-primary/10 text-primary shrink-0 group-hover:scale-110 transition-transform">
              <Users className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <Text variant="bodySmall" weight="bold">
                Persona Architect
              </Text>
              <Text
                variant="caption"
                className="text-muted-foreground leading-relaxed"
              >
                Manage system roles and granular capability nodes for all{" "}
                {data.user_roles.length} administrative identities.
              </Text>
            </div>
          </Card>
        </Link>

        <Link href="/admin/analytics">
          <Card className="glass-card border-none bg-secondary/5 p-8 flex items-start gap-6 group hover:border-secondary/40 transition-all cursor-pointer">
            <div className="p-4 rounded-3xl bg-secondary/10 text-secondary shrink-0 group-hover:scale-110 transition-transform">
              <Activity className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <Text variant="bodySmall" weight="bold">
                Intelligence Analytics
              </Text>
              <Text
                variant="caption"
                className="text-muted-foreground leading-relaxed"
              >
                Analyze reach velocity and interaction depth across the
                programmatic search index.
              </Text>
            </div>
          </Card>
        </Link>

        <Link href="/admin/moderation">
          <Card className="glass-card border-none bg-amber-500/5 p-8 flex items-start gap-6 group hover:border-amber-500/40 transition-all cursor-pointer">
            <div className="p-4 rounded-3xl bg-amber-500/10 text-amber-500 shrink-0 group-hover:scale-110 transition-transform">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <Text variant="bodySmall" weight="bold">
                Integrity Gate
              </Text>
              <Text
                variant="caption"
                className="text-muted-foreground leading-relaxed"
              >
                Process reported content and enforce factual compliance across
                community dialogue nodes.
              </Text>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
