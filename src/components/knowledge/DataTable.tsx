import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps {
  headers: string[];
  rows: any[][];
}

export const DataTable = ({ headers, rows }: DataTableProps) => {
  return (
    <div className="rounded-xl border border-white/5 overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/20">
          <TableRow>
            {headers.map((h) => (
              <TableHead key={h} className="text-[10px] uppercase font-bold tracking-widest">{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} className="hover:bg-white/5 transition-colors">
              {row.map((cell, j) => (
                <TableCell key={j} className="text-sm">{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
