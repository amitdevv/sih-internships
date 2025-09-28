"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Building2, 
  MapPin, 
  DollarSign,
  ChevronDown,
  ChevronUp,
  MoreHorizontal
} from "lucide-react";

interface ListItem {
  id: string;
  title: string;
  company: string;
  [key: string]: any;
}

interface NotionListProps {
  title: string;
  icon: React.ReactNode;
  items: ListItem[];
  columns: Array<{
    key: string;
    label: string;
    render: (item: ListItem) => React.ReactNode;
    sortable?: boolean;
  }>;
  searchFields?: string[];
  filterOptions?: Array<{
    key: string;
    label: string;
    options: Array<{ value: string; label: string }>;
  }>;
  emptyMessage?: string;
}

export function NotionList({ 
  title, 
  icon, 
  items, 
  columns, 
  searchFields = ["title", "company"],
  filterOptions = [],
  emptyMessage = "No items found"
}: NotionListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter(item => {
      // Search filter
      const matchesSearch = searchFields.some(field => 
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Other filters
      const matchesFilters = Object.entries(filters).every(([key, value]) => 
        !value || value === "all" || item[key] === value
      );
      
      return matchesSearch && matchesFilters;
    });

    // Sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return sortOrder === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [items, searchTerm, filters, sortBy, sortOrder, searchFields]);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSort = (columnKey: string) => {
    if (sortBy === columnKey) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnKey);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {filteredAndSortedItems.length} items
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {filterOptions.map(filter => (
            <Select
              key={filter.key}
              value={filters[filter.key] || undefined}
              onValueChange={(value) => 
                setFilters(prev => ({ ...prev, [filter.key]: value || "" }))
              }
            >
              <SelectTrigger className="w-full sm:w-[160px] h-10">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter.label}</SelectItem>
                {filter.options.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border rounded-lg overflow-hidden">
        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-sm">{emptyMessage}</div>
          </div>
        ) : (
          <div>
            {/* Desktop Header */}
            <div 
              className="hidden lg:grid px-6 py-4 text-sm font-medium text-muted-foreground border-b bg-muted/30"
              style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
            >
              {columns.map(column => (
                <div 
                  key={column.key}
                  className={`flex items-center gap-2 ${
                    column.sortable ? "cursor-pointer hover:text-foreground" : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  {column.label}
                  {column.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp 
                        size={14} 
                        className={`${
                          sortBy === column.key && sortOrder === "asc" 
                            ? "text-foreground" 
                            : "text-muted-foreground/50"
                        }`} 
                      />
                      <ChevronDown 
                        size={14} 
                        className={`${
                          sortBy === column.key && sortOrder === "desc" 
                            ? "text-foreground" 
                            : "text-muted-foreground/50"
                        }`} 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Items */}
            <div className="hidden lg:block">
              {filteredAndSortedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="px-6 py-4 hover:bg-muted/30 transition-colors border-b last:border-b-0"
                  style={{ 
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                    gap: '1.5rem'
                  }}
                >
                  {columns.map(column => (
                    <div 
                      key={column.key}
                      className="flex items-center"
                    >
                      {column.render(item)}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Mobile Items - Card layout */}
            <div className="lg:hidden">
              {filteredAndSortedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-6 border-b last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  <div className="space-y-4">
                    {columns.map(column => (
                      <div key={column.key} className="flex items-start justify-between gap-4">
                        <span className="text-sm font-medium text-muted-foreground min-w-0 flex-shrink-0">
                          {column.label}
                        </span>
                        <div className="flex-1 min-w-0 text-right">
                          {column.render(item)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
