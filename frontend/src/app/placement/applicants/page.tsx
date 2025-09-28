"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { mockApplicants } from "@/mocks/fixtures/applicants";
import { StatusChip } from "@/components/sections/applications/status-chip";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ApplicantsPage() {
  const [q, setQ] = React.useState("");
  const [dept, setDept] = React.useState<string | undefined>();
  const [status, setStatus] = React.useState<string | undefined>();
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});

  const filtered = mockApplicants.filter((a) => {
    const mQ = q ? (a.name + a.role + a.company).toLowerCase().includes(q.toLowerCase()) : true;
    const mD = dept ? a.department === dept : true;
    const mS = status ? a.status === status : true;
    return mQ && mD && mS;
  });

  // sorting & pagination
  const [sortBy, setSortBy] = React.useState<"name" | "cgpa">("name");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const sorted = [...filtered].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
    return (a.cgpa - b.cgpa) * dir;
  });
  const [page, setPage] = React.useState(0);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageItems = sorted.slice(page * pageSize, page * pageSize + pageSize);

  const toggle = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const selectedIds = Object.keys(selected).filter((k) => selected[k]);
  
  const toggleAll = () => {
    const allSelected = pageItems.every(item => selected[item.id]);
    if (allSelected) {
      // Deselect all on current page
      const newSelected = { ...selected };
      pageItems.forEach(item => delete newSelected[item.id]);
      setSelected(newSelected);
    } else {
      // Select all on current page
      const newSelected = { ...selected };
      pageItems.forEach(item => newSelected[item.id] = true);
      setSelected(newSelected);
    }
  };
  
  const isAllSelected = pageItems.length > 0 && pageItems.every(item => selected[item.id]);
  const isIndeterminate = pageItems.some(item => selected[item.id]) && !isAllSelected;
  
  const bulkShortlist = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one applicant");
      return;
    }
    toast.success(`Shortlisted: ${selectedIds.length} applicants`);
  };
  
  const bulkReject = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one applicant");
      return;
    }
    toast.error(`Rejected: ${selectedIds.length} applicants`);
  };

  const exportCsv = () => {
    const rows = sorted.map((a) => [a.id, a.name, a.department, a.role, a.company, a.status, a.cgpa]);
    const header = ["id", "name", "department", "role", "company", "status", "cgpa"];
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "applicants.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Applicants</h1>
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, role, company" className="md:col-span-2" />
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="CSE">CSE</SelectItem>
              <SelectItem value="ECE">ECE</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="MentorPending">MentorPending</SelectItem>
              <SelectItem value="Shortlisted">Shortlisted</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={bulkShortlist} 
            disabled={selectedIds.length === 0}
            className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 disabled:opacity-50"
          >
            Bulk shortlist ({selectedIds.length})
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={bulkReject} 
            disabled={selectedIds.length === 0}
            className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50"
          >
            Bulk reject ({selectedIds.length})
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv}>Export CSV</Button>
        </div>
      </Card>
      <Card className="p-0">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead className="w-10">
                <Checkbox 
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => { setSortBy("name"); setSortDir(sortDir === "asc" ? "desc" : "asc"); }}>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="cursor-pointer" onClick={() => { setSortBy("cgpa"); setSortDir(sortDir === "asc" ? "desc" : "asc"); }}>CGPA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.map((a) => (
              <TableRow key={a.id} className="hover:bg-white/60">
                <TableCell>
                  <Checkbox 
                    checked={!!selected[a.id]} 
                    onCheckedChange={() => toggle(a.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell className="text-muted-foreground">{a.department}</TableCell>
                <TableCell>{a.role} · {a.company}</TableCell>
                <TableCell><StatusChip status={a.status} /></TableCell>
                <TableCell>{a.cgpa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-2 text-sm">
          <div>Page {page + 1} of {totalPages}</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>Prev</Button>
            <Button variant="outline" size="sm" disabled={page + 1 >= totalPages} onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}


