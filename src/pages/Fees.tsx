import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";

interface FeeTier {
  lowerBound: number;
  upperBound: number;
  amount: number;
}

interface Fee {
  id: string;
  enabled: boolean;
  clientId: string;
  productId: string;
  type: string;
  category: string;
  startDate: string;
  endDate?: string;
  frequency: string;
  periodMonthOffset?: number;
  feeStructure: string;
  currency: string;
  monthlyMinimumContributor: boolean;
  feeTiers: Array<FeeTier & { id: string; feeId: string }>;
  isDiscount: boolean;
  description?: string;
}

export default function Fees() {
  const [enabled, setEnabled] = useState(true);
  const [clientReference, setClientReference] = useState("");
  const [productId, setProductId] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [periodMonthOffset, setPeriodMonthOffset] = useState("");
  const [feeStructure, setFeeStructure] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [monthlyMinimumContributor, setMonthlyMinimumContributor] = useState(false);
  const [feeTiers, setFeeTiers] = useState<FeeTier[]>([
    { lowerBound: 0, upperBound: 100, amount: 0 },
  ]);

  const [searchClientRef, setSearchClientRef] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const addTier = () => {
    setFeeTiers([...feeTiers, { lowerBound: 0, upperBound: 0, amount: 0 }]);
  };

  const removeTier = (index: number) => {
    if (feeTiers.length > 1) {
      setFeeTiers(feeTiers.filter((_, i) => i !== index));
    }
  };

  const updateTier = (index: number, field: keyof FeeTier, value: string) => {
    const newTiers = [...feeTiers];
    newTiers[index] = {
      ...newTiers[index],
      [field]: field === "amount" ? parseFloat(value) || 0 : parseInt(value) || 0,
    };
    setFeeTiers(newTiers);
  };

  const toggleRowExpansion = (feeId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(feeId)) {
      newExpanded.delete(feeId);
    } else {
      newExpanded.add(feeId);
    }
    setExpandedRows(newExpanded);
  };

  const handleSaveFee = async () => {
    if (!clientReference || !productId || !type || !category || !startDate || !frequency || !feeStructure) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/invoicing/fee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enabled,
          clientReference,
          productId,
          type,
          category,
          startDate,
          endDate: endDate || null,
          frequency,
          periodMonthOffset: periodMonthOffset ? parseInt(periodMonthOffset) : null,
          feeStructure,
          currency,
          monthlyMinimumContributor,
          feeTiers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create fee");
      }

      toast.success("Fee created successfully");
      // Reset form
      setClientReference("");
      setProductId("");
      setType("");
      setCategory("");
      setStartDate("");
      setEndDate("");
      setFrequency("");
      setPeriodMonthOffset("");
      setFeeStructure("");
      setFeeTiers([{ lowerBound: 0, upperBound: 100, amount: 0 }]);
    } catch (error) {
      toast.error("Failed to create fee");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchFees = async () => {
    if (!searchClientRef || !searchDate) {
      toast.error("Please provide client reference and date");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/invoicing/fee?clientReference=${searchClientRef}&date=${searchDate}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch fees");
      }

      const data: Fee[] = await response.json();
      setFees(data);
      toast.success("Fees loaded successfully");
    } catch (error) {
      toast.error("Failed to fetch fees");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncWithQB = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/invoicing/fee/sync", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to sync with QB");
      }

      toast.success("Synced with QuickBooks successfully");
    } catch (error) {
      toast.error("Failed to sync with QuickBooks");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Fees</h1>
        <p className="text-muted-foreground">Create and manage fees</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create a Fee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientReference">Client Reference *</Label>
              <Input
                id="clientReference"
                value={clientReference}
                onChange={(e) => setClientReference(e.target.value)}
                placeholder="CLIENT-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productId">Product ID *</Label>
              <Input
                id="productId"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="987fcdeb-51d2-4321-b765-123456789abc"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Input id="type" value={type} onChange={(e) => setType(e.target.value)} placeholder="ACCOUNTS" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CORE">CORE</SelectItem>
                  <SelectItem value="ADD_ON">ADD_ON</SelectItem>
                  <SelectItem value="PASSTHROUGH">PASSTHROUGH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency *</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MONTHLY">MONTHLY</SelectItem>
                  <SelectItem value="QUARTERLY">QUARTERLY</SelectItem>
                  <SelectItem value="YEARLY">YEARLY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="periodMonthOffset">Period Month Offset</Label>
              <Input
                id="periodMonthOffset"
                type="number"
                value={periodMonthOffset}
                onChange={(e) => setPeriodMonthOffset(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feeStructure">Fee Structure *</Label>
              <Select value={feeStructure} onValueChange={setFeeStructure}>
                <SelectTrigger>
                  <SelectValue placeholder="Select structure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TIERED">TIERED</SelectItem>
                  <SelectItem value="FLAT">FLAT</SelectItem>
                  <SelectItem value="PERCENTAGE">PERCENTAGE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Switch id="enabled" checked={enabled} onCheckedChange={setEnabled} />
              <Label htmlFor="enabled">Enabled</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="monthlyMin"
                checked={monthlyMinimumContributor}
                onCheckedChange={setMonthlyMinimumContributor}
              />
              <Label htmlFor="monthlyMin">Monthly Minimum Contributor</Label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Fee Tiers *</Label>
              <Button type="button" variant="outline" size="sm" onClick={addTier}>
                <Plus className="h-4 w-4 mr-2" />
                Add Tier
              </Button>
            </div>
            {feeTiers.map((tier, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <Label>Lower Bound</Label>
                  <Input
                    value={tier.lowerBound}
                    onChange={(e) => updateTier(index, "lowerBound", e.target.value)}
                    inputMode="numeric"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Upper Bound</Label>
                  <Input
                    value={tier.upperBound}
                    onChange={(e) => updateTier(index, "upperBound", e.target.value)}
                    inputMode="numeric"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    value={tier.amount}
                    onChange={(e) => updateTier(index, "amount", e.target.value)}
                    inputMode="decimal"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeTier(index)}
                  disabled={feeTiers.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={handleSaveFee} disabled={loading}>
            {loading ? "Saving..." : "Save Fee"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Fees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="searchClientRef">Client Reference</Label>
              <Input
                id="searchClientRef"
                value={searchClientRef}
                onChange={(e) => setSearchClientRef(e.target.value)}
                placeholder="CLIENT-001"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="searchDate">Date (YYYY-MM-DD)</Label>
              <Input
                id="searchDate"
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSearchFees} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
            <Button onClick={handleSyncWithQB} variant="outline" disabled={loading}>
              Sync with QB
            </Button>
          </div>

          {fees.length > 0 && (
            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Structure</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Currency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fees.map((fee) => (
                    <>
                      <TableRow key={fee.id} className="cursor-pointer" onClick={() => fee.feeStructure === "TIERED" && toggleRowExpansion(fee.id)}>
                        <TableCell>
                          {fee.feeStructure === "TIERED" && (
                            expandedRows.has(fee.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                          )}
                        </TableCell>
                        <TableCell>{fee.type}</TableCell>
                        <TableCell>{fee.category}</TableCell>
                        <TableCell>{fee.feeStructure}</TableCell>
                        <TableCell>{fee.startDate}</TableCell>
                        <TableCell>{fee.endDate || "-"}</TableCell>
                        <TableCell>{fee.frequency}</TableCell>
                        <TableCell>{fee.currency}</TableCell>
                      </TableRow>
                      {fee.feeStructure === "TIERED" && expandedRows.has(fee.id) && (
                        <TableRow>
                          <TableCell colSpan={8} className="bg-muted/50">
                            <div className="p-4">
                              <h4 className="font-semibold mb-2">Fee Tiers</h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Lower Bound</TableHead>
                                    <TableHead>Upper Bound</TableHead>
                                    <TableHead>Amount</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {fee.feeTiers.map((tier) => (
                                    <TableRow key={tier.id}>
                                      <TableCell>{tier.lowerBound}</TableCell>
                                      <TableCell>{tier.upperBound}</TableCell>
                                      <TableCell>${tier.amount.toFixed(2)}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
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
