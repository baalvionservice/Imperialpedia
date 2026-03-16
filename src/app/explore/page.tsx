import React from 'react';
import { Container } from '@/design-system/layout/container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Text } from '@/design-system/typography/text';

/**
 * Knowledge Explorer Page - Testing ground for UI components.
 */
export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-20">
      <Container>
        <header className="mb-12">
          <Text variant="h1" className="text-4xl lg:text-6xl font-bold tracking-tight">Knowledge Explorer</Text>
          <Text variant="body" className="text-muted-foreground mt-4 text-xl">
            Discover and navigate the Imperialpedia global index of countries, companies, and technologies.
          </Text>
        </header>

        {/* UI Component Testing Section */}
        <Section 
          title="UI Component Matrix" 
          description="A demonstration of the reusable component system built for the Imperialpedia infrastructure."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Buttons & Badges */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Interactive Elements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <Text variant="bodySmall" className="font-bold uppercase tracking-wider text-primary">Button Variants</Text>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Join Waitlist</Button>
                    <Button variant="secondary">Start Research</Button>
                    <Button variant="outline">Learn More</Button>
                    <Button variant="ghost">View Code</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <Text variant="bodySmall" className="font-bold uppercase tracking-wider text-primary">Badge Taxonomy</Text>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Industry</Badge>
                    <Badge variant="secondary">Technology</Badge>
                    <Badge variant="outline">Country</Badge>
                    <Badge className="bg-emerald-500 text-white border-none">Success</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inputs */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Data Ingestion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Text variant="label">Global Search</Text>
                  <Input placeholder="Search keywords..." />
                </div>
                <div className="space-y-2">
                  <Text variant="label">AI Research Prompt</Text>
                  <Input placeholder="Ask the analyst anything..." />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Initialize Query</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Market Data Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entity</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Valuation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">NVIDIA</TableCell>
                      <TableCell><Badge variant="outline">AI/Chips</Badge></TableCell>
                      <TableCell className="text-emerald-500">Bullish</TableCell>
                      <TableCell className="text-right">$2.2T</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Japan</TableCell>
                      <TableCell><Badge variant="outline">Economy</Badge></TableCell>
                      <TableCell className="text-amber-500">Stable</TableCell>
                      <TableCell className="text-right">$4.2T</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Blockchain</TableCell>
                      <TableCell><Badge variant="outline">Finance</Badge></TableCell>
                      <TableCell className="text-secondary">Growth</TableCell>
                      <TableCell className="text-right">Variable</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </Section>
      </Container>
    </main>
  );
}
