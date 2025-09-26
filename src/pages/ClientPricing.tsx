import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Users, Settings, Plus, Edit } from "lucide-react";

export default function ClientPricing() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const clients = [
    {
      id: "1",
      name: "First National Bank",
      status: "active",
      customers: "125K",
      revenue: "$2.4M",
      margin: "32%",
      lastUpdated: "2024-01-15"
    },
    {
      id: "2", 
      name: "Credit Union Plus",
      status: "active",
      customers: "89K",
      revenue: "$1.8M",
      margin: "28%",
      lastUpdated: "2024-01-10"
    },
    {
      id: "3",
      name: "Metro Financial",
      status: "review",
      customers: "45K",
      revenue: "$950K",
      margin: "35%",
      lastUpdated: "2024-01-20"
    },
  ];

  const pricingTemplate = [
    { service: "Account Management Fee", defaultPrice: "$2.50", unit: "per account/month" },
    { service: "Card Production", defaultPrice: "$3.25", unit: "per card" },
    { service: "Card Transaction", defaultPrice: "$0.15", unit: "per transaction" },
    { service: "Non-scheme Transaction", defaultPrice: "$0.25", unit: "per transaction" },
    { service: "Apple Pay Transaction", defaultPrice: "$0.08", unit: "per transaction" },
    { service: "Google Pay Transaction", defaultPrice: "$0.08", unit: "per transaction" },
    { service: "KYC/AML Check", defaultPrice: "$1.50", unit: "per check" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Client Pricing Management</h1>
          <p className="text-muted-foreground">Manage pricing templates and client-specific rates</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Default Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Default Pricing Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {pricingTemplate.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.service}</p>
                      <p className="text-sm text-muted-foreground">{item.unit}</p>
                    </div>
                    <Input 
                      defaultValue={item.defaultPrice} 
                      className="w-24 text-right"
                    />
                  </div>
                ))}
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Template</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Clients Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Client Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customers</TableHead>
                <TableHead>Monthly Revenue</TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === "active" ? "default" : "secondary"}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.customers}</TableCell>
                  <TableCell>{client.revenue}</TableCell>
                  <TableCell>
                    <span className={client.margin.startsWith("3") ? "text-success" : "text-warning"}>
                      {client.margin}
                    </span>
                  </TableCell>
                  <TableCell>{client.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Pricing - {client.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label>Client Name</Label>
                              <Input defaultValue={client.name} />
                            </div>
                            <div>
                              <Label>Status</Label>
                              <Input defaultValue={client.status} />
                            </div>
                          </div>
                          {pricingTemplate.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">{item.service}</p>
                                <p className="text-sm text-muted-foreground">{item.unit}</p>
                                <p className="text-xs text-muted-foreground">Default: {item.defaultPrice}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Input 
                                  defaultValue={item.defaultPrice} 
                                  className="w-24 text-right"
                                />
                                <Badge variant="outline" className="text-xs">
                                  Custom
                                </Badge>
                              </div>
                            </div>
                          ))}
                          <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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