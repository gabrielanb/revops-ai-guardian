import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";

export default function AdhocCharges() {
  const [charges, setCharges] = useState([
    {
      id: "1",
      category: "Professional Services",
      name: "Custom Integration",
      basis: "Hourly",
      feeStructure: "Fixed Rate",
      fee: "$150.00",
      client: "First National Bank",
      date: "2024-01-15",
      status: "pending"
    },
    {
      id: "2",
      category: "Technical Support",
      name: "Emergency Support",
      basis: "Per Incident",
      feeStructure: "One-time",
      fee: "$500.00",
      client: "Credit Union Plus",
      date: "2024-01-18",
      status: "approved"
    },
    {
      id: "3",
      category: "Training",
      name: "Staff Training Session",
      basis: "Per Session",
      feeStructure: "Fixed Rate",
      fee: "$2,500.00",
      client: "Metro Financial",
      date: "2024-01-20",
      status: "pending"
    }
  ]);

  const categories = [
    "Professional Services",
    "Technical Support", 
    "Training",
    "Consulting",
    "Custom Development",
    "Other"
  ];

  const basisOptions = [
    "Hourly",
    "Per Incident", 
    "Per Session",
    "Per Project",
    "Monthly",
    "One-time"
  ];

  const feeStructures = [
    "Fixed Rate",
    "Variable Rate",
    "One-time",
    "Recurring"
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ad-hoc Charges</h1>
          <p className="text-muted-foreground">Manage additional charges and custom billing items</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Charge
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Ad-hoc Charge</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Charge name" />
              </div>

              <div>
                <Label htmlFor="basis">Basis of Charging</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select basis" />
                  </SelectTrigger>
                  <SelectContent>
                    {basisOptions.map((basis) => (
                      <SelectItem key={basis} value={basis}>
                        {basis}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="feeStructure">Fee Structure</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fee structure" />
                  </SelectTrigger>
                  <SelectContent>
                    {feeStructures.map((structure) => (
                      <SelectItem key={structure} value={structure}>
                        {structure}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fee">Fee</Label>
                <Input id="fee" placeholder="$0.00" />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Add Charge</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Charges Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Ad-hoc Charges Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Basis</TableHead>
                <TableHead>Fee Structure</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {charges.map((charge) => (
                <TableRow key={charge.id}>
                  <TableCell className="font-medium">{charge.category}</TableCell>
                  <TableCell>{charge.name}</TableCell>
                  <TableCell>{charge.basis}</TableCell>
                  <TableCell>{charge.feeStructure}</TableCell>
                  <TableCell className="font-medium">{charge.fee}</TableCell>
                  <TableCell>{charge.client}</TableCell>
                  <TableCell>{charge.date}</TableCell>
                  <TableCell>
                    <Badge variant={charge.status === "approved" ? "default" : "secondary"}>
                      {charge.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}