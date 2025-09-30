import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface BillingUnits {
  count?: number;
  feeApplies?: boolean;
  percentageOf?: number;
}

interface FeeTier {
  id: string;
  feeId: string;
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
  feeTiers: FeeTier[];
  isDiscount: boolean;
  description?: string;
}

interface ChargableFee {
  fee: Fee;
  chargeAmount: number;
  billingUnits: BillingUnits;
}

interface InvoiceResponse {
  coreFees: ChargableFee[];
  addOnFees: ChargableFee[];
  passthroughFees: ChargableFee[];
}

export default function Invoicing() {
  const [clientReference, setClientReference] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceData, setInvoiceData] = useState<InvoiceResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateInvoice = async () => {
    if (!clientReference || !invoiceDate) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/invoicing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientReference,
          invoiceDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create invoice");
      }

      const data: InvoiceResponse = await response.json();
      setInvoiceData(data);
      toast.success("Invoice generated successfully");
    } catch (error) {
      toast.error("Failed to create invoice");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderBillingUnits = (units: BillingUnits) => {
    if (units.count !== undefined) return units.count;
    if (units.feeApplies !== undefined) return units.feeApplies ? "Yes" : "No";
    if (units.percentageOf !== undefined) return `${units.percentageOf}%`;
    return "-";
  };

  const renderFeesTable = (fees: ChargableFee[], title: string) => {
    if (!fees || fees.length === 0) return null;

    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fee Type</TableHead>
              <TableHead>Fee Category</TableHead>
              <TableHead>Fee Structure</TableHead>
              <TableHead>Charge Amount</TableHead>
              <TableHead>Billing Units</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((chargableFee, index) => (
              <TableRow key={index}>
                <TableCell>{chargableFee.fee.type}</TableCell>
                <TableCell>{chargableFee.fee.category}</TableCell>
                <TableCell>{chargableFee.fee.feeStructure}</TableCell>
                <TableCell>${chargableFee.chargeAmount.toFixed(2)}</TableCell>
                <TableCell>{renderBillingUnits(chargableFee.billingUnits)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Invoicing</h1>
        <p className="text-muted-foreground">Generate invoices for clients</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Invoice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientReference">Client Reference</Label>
              <Input
                id="clientReference"
                placeholder="CLIENT-001"
                value={clientReference}
                onChange={(e) => setClientReference(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date (YYYY-MM-DD)</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleCreateInvoice} disabled={loading}>
            {loading ? "Creating..." : "Create Invoice"}
          </Button>
        </CardContent>
      </Card>

      {invoiceData && (
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            {renderFeesTable(invoiceData.coreFees, "Core Fees")}
            {renderFeesTable(invoiceData.addOnFees, "Add-on Fees")}
            {renderFeesTable(invoiceData.passthroughFees, "Passthrough Fees")}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
