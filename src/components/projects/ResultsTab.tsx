import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Lead } from "@/types";
import { 
  Download, 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  Star,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowUpDown,
  Copy,
  Check
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from 'xlsx';

interface ResultsTabProps {
  leads: Lead[];
}

type SortField = 'name' | 'rating' | 'reviewCount' | 'category';
type SortDirection = 'asc' | 'desc';

export function ResultsTab({ leads }: ResultsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [hasEmailOnly, setHasEmailOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(leads.map(l => l.category).filter(Boolean));
    return Array.from(cats);
  }, [leads]);

  // Filter and sort leads
  const filteredLeads = useMemo(() => {
    let filtered = leads.filter((lead) => {
      // Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          lead.name.toLowerCase().includes(term) ||
          lead.category?.toLowerCase().includes(term) ||
          lead.email?.toLowerCase().includes(term) ||
          lead.address?.toLowerCase().includes(term);
        if (!matchesSearch) return false;
      }

      // Rating filter
      if (minRating > 0 && (!lead.rating || lead.rating < minRating)) {
        return false;
      }

      // Email filter
      if (hasEmailOnly && !lead.email) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortField) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'rating':
          aVal = a.rating || 0;
          bVal = b.rating || 0;
          break;
        case 'reviewCount':
          aVal = a.reviewCount || 0;
          bVal = b.reviewCount || 0;
          break;
        case 'category':
          aVal = a.category?.toLowerCase() || '';
          bVal = b.category?.toLowerCase() || '';
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [leads, searchTerm, minRating, hasEmailOnly, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["Name", "Category", "Rating", "Reviews", "Email", "Phone", "Website", "Address", "City"];
    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.category || "",
      lead.rating?.toString() || "",
      lead.reviewCount?.toString() || "",
      lead.email || "",
      lead.phone || "",
      lead.website || "",
      lead.address || "",
      lead.city,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leads-export-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to XLSX
  const handleExportXLSX = () => {
    const data = filteredLeads.map((lead) => ({
      Name: lead.name,
      Category: lead.category || "",
      Rating: lead.rating?.toString() || "",
      Reviews: lead.reviewCount?.toString() || "",
      Email: lead.email || "",
      Phone: lead.phone || "",
      Website: lead.website || "",
      Address: lead.address || "",
      City: lead.city,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    
    // Auto-size columns
    const maxWidth = data.reduce((w, r) => Math.max(w, r.Name.length), 10);
    worksheet['!cols'] = [{ wch: maxWidth }];

    XLSX.writeFile(workbook, `leads-export-${Date.now()}.xlsx`);
  };

  // Export to JSON
  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(filteredLeads, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leads-export-${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 py-6">
      {/* Glassmorphic Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card variant="glass" className="shadow-elegant sticky top-0 z-40">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, category, email, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 bg-background/50"
                  inputSize="lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {(minRating > 0 || hasEmailOnly) && (
                  <Badge variant="destructive" size="sm" className="ml-2">
                    {(minRating > 0 ? 1 : 0) + (hasEmailOnly ? 1 : 0)}
                  </Badge>
                )}
              </Button>

              {/* Export Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover z-50">
                  <DropdownMenuItem onClick={handleExportCSV} className="gap-2 cursor-pointer">
                    <Download className="h-4 w-4" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportXLSX} className="gap-2 cursor-pointer">
                    <Download className="h-4 w-4" />
                    Export as XLSX
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportJSON} className="gap-2 cursor-pointer">
                    <Download className="h-4 w-4" />
                    Export as JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                <span className="font-bold text-foreground">{filteredLeads.length}</span>
                {" / "}
                <span>{leads.length}</span>
                {" "}leads
              </div>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Rating Slider */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Minimum Rating</label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-primary">
                              {minRating > 0 ? minRating.toFixed(1) : "Any"}
                            </span>
                            {minRating > 0 && (
                              <button
                                onClick={() => setMinRating(0)}
                                className="text-xs text-muted-foreground hover:text-foreground"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </div>
                        <Slider
                          value={[minRating]}
                          onValueChange={(v) => setMinRating(v[0])}
                          max={5}
                          step={0.1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0</span>
                          <span>2.5</span>
                          <span>5.0</span>
                        </div>
                      </div>

                      {/* Email Filter */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Filter Options</label>
                        <div className="flex items-center gap-3 p-3 rounded-lg border bg-background/50">
                          <input
                            type="checkbox"
                            id="email-only"
                            checked={hasEmailOnly}
                            onChange={(e) => setHasEmailOnly(e.target.checked)}
                            className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                          />
                          <label htmlFor="email-only" className="text-sm flex-1 cursor-pointer">
                            Show only leads with verified email
                          </label>
                          {hasEmailOnly && (
                            <Badge variant="success" size="sm">Active</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card variant="elevated" className="shadow-elegant">
          <CardContent className="p-0">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No leads found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setMinRating(0);
                  setHasEmailOnly(false);
                }}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[250px]">
                        <button
                          onClick={() => handleSort('name')}
                          className="flex items-center gap-2 hover:text-foreground transition-colors font-semibold"
                        >
                          Business Name
                          <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          onClick={() => handleSort('category')}
                          className="flex items-center gap-2 hover:text-foreground transition-colors font-semibold"
                        >
                          Category
                          <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          onClick={() => handleSort('rating')}
                          className="flex items-center gap-2 hover:text-foreground transition-colors font-semibold"
                        >
                          Rating
                          <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead>
                        <button
                          onClick={() => handleSort('reviewCount')}
                          className="flex items-center gap-2 hover:text-foreground transition-colors font-semibold"
                        >
                          Reviews
                          <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="group hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-bold text-primary">
                                {lead.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold group-hover:text-primary transition-colors">
                                {lead.name}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {lead.city}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {lead.category && (
                            <Badge variant="outline" className="font-normal">
                              {lead.category}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {lead.rating ? (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 font-semibold">
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                {lead.rating.toFixed(1)}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {lead.reviewCount ? (
                            <span className="font-medium">{lead.reviewCount.toLocaleString()}</span>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {lead.email ? (
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3 text-green-500" />
                                <span className="text-sm text-muted-foreground">Email</span>
                              </div>
                            ) : null}
                            {lead.phone ? (
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3 text-blue-500" />
                                <span className="text-sm text-muted-foreground">Phone</span>
                              </div>
                            ) : null}
                            {!lead.email && !lead.phone && (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLead(lead);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick View Panel */}
      <Sheet open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedLead && (
            <>
              <SheetHeader>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-2xl font-bold text-white">
                      {selectedLead.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <SheetTitle className="text-2xl mb-1">{selectedLead.name}</SheetTitle>
                    <SheetDescription className="flex items-center gap-2">
                      {selectedLead.category && (
                        <Badge variant="outline">{selectedLead.category}</Badge>
                      )}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Rating & Reviews */}
                {selectedLead.rating && (
                  <Card variant="glass">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= selectedLead.rating!
                                    ? 'text-amber-500 fill-amber-500'
                                    : 'text-muted'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {selectedLead.reviewCount} reviews
                          </p>
                        </div>
                        <div className="text-4xl font-extrabold gradient-text">
                          {selectedLead.rating.toFixed(1)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Contact Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Contact Information</h3>
                  
                  {selectedLead.email && (
                    <Card variant="glass" hover="lift">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                              <Mail className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <a
                                href={`mailto:${selectedLead.email}`}
                                className="font-medium text-primary hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {selectedLead.email}
                              </a>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyEmail(selectedLead.email!)}
                          >
                            {copiedEmail === selectedLead.email ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedLead.phone && (
                    <Card variant="glass" hover="lift">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <a
                              href={`tel:${selectedLead.phone}`}
                              className="font-medium text-primary hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {selectedLead.phone}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedLead.website && (
                    <Card variant="glass" hover="lift">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                            <ExternalLink className="h-5 w-5 text-purple-500" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Website</p>
                            <a
                              href={selectedLead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-primary hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Location */}
                {selectedLead.address && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Location</h3>
                    <Card variant="glass">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{selectedLead.address}</p>
                            <p className="text-sm text-muted-foreground">{selectedLead.city}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  {selectedLead.email && (
                    <Button variant="default" className="flex-1" asChild>
                      <a href={`mailto:${selectedLead.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </a>
                    </Button>
                  )}
                  {selectedLead.phone && (
                    <Button variant="outline" className="flex-1" asChild>
                      <a href={`tel:${selectedLead.phone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
