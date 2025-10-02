import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Lead } from "@/types";
import { Download, Search, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ResultsTabProps {
  leads: Lead[];
}

export function ResultsTab({ leads }: ResultsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [hasEmailOnly, setHasEmailOnly] = useState(false);
  const [maxDistance, setMaxDistance] = useState(100);

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          lead.name.toLowerCase().includes(term) ||
          lead.category?.toLowerCase().includes(term) ||
          lead.email?.toLowerCase().includes(term);
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
  }, [leads, searchTerm, minRating, hasEmailOnly, maxDistance]);

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

  return (
    <div className="space-y-6">
      {/* Filters Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>Refine your lead list with smart filters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Name, category, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Email filter */}
            <div className="flex items-center space-x-2 pt-8">
              <Switch
                id="email-filter"
                checked={hasEmailOnly}
                onCheckedChange={setHasEmailOnly}
              />
              <Label htmlFor="email-filter" className="font-normal">
                Show only leads with email
              </Label>
            </div>
          </div>

          {/* Rating slider */}
          <div className="space-y-2">
            <Label>Minimum Rating: {minRating > 0 ? minRating.toFixed(1) : "Any"}</Label>
            <Slider
              value={[minRating]}
              onValueChange={(v) => setMinRating(v[0])}
              max={5}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Count and export */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredLeads.length}</span> of{" "}
              <span className="font-medium text-foreground">{leads.length}</span> leads
            </div>
            <Button onClick={handleExportCSV} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Results</CardTitle>
          <CardDescription>
            {filteredLeads.length} businesses found in your market
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No leads match your filters. Try adjusting your search criteria.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        {lead.category && (
                          <Badge variant="outline">{lead.category}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.rating ? (
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{lead.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground">★</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {lead.reviewCount || 0}
                      </TableCell>
                      <TableCell>
                        {lead.email ? (
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-primary hover:underline text-sm"
                          >
                            {lead.email}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.phone ? (
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-primary hover:underline text-sm"
                          >
                            {lead.phone}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {lead.city}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
