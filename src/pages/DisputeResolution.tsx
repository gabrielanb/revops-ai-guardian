import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { 
  MessageSquare, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Brain,
  Paperclip,
  DollarSign,
  TrendingUp
} from "lucide-react";

export default function DisputeResolution() {
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);

  const disputes = [
    {
      id: "DSP-001",
      client: "First National Bank",
      amount: "$2,340",
      type: "Usage Volume Disagreement",
      priority: "high",
      status: "pending",
      created: "2024-01-20",
      description: "Client disputes transaction count for December billing period",
      aiClassification: "usage_volume",
      riskScore: 7.2,
      resolution: "Provide detailed transaction logs",
      confidence: 89
    },
    {
      id: "DSP-002", 
      client: "Credit Union Plus",
      amount: "$890",
      type: "Pricing Query",
      priority: "medium",
      status: "resolved",
      created: "2024-01-18",
      description: "Question about Apple Pay transaction fees",
      aiClassification: "pricing_query",
      riskScore: 3.1,
      resolution: "Applied 5% goodwill discount",
      confidence: 94
    },
    {
      id: "DSP-003",
      client: "Metro Financial", 
      amount: "$1,450",
      type: "Third-party Recharge",
      priority: "low",
      status: "pending",
      created: "2024-01-22",
      description: "Dispute over KYC vendor charges",
      aiClassification: "third_party_recharge",
      riskScore: 4.8,
      resolution: "Attach vendor invoice",
      confidence: 91
    }
  ];

  const aiSuggestions = [
    {
      type: "auto_resolution",
      title: "Auto-Resolution Opportunity",
      description: "DSP-003 can be auto-resolved by attaching vendor invoice (91% confidence)",
      action: "Attach Evidence"
    },
    {
      type: "escalation_risk",
      title: "Escalation Risk Alert", 
      description: "DSP-001 shows high churn risk (7.2/10). Consider proactive outreach",
      action: "Schedule Call"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "default";
      case "pending": return "secondary";
      case "escalated": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Dispute Resolution</h1>
          <p className="text-muted-foreground">Intelligent dispute classification and resolution assistance</p>
        </div>
        <Button className="bg-gradient-primary">
          <Brain className="h-4 w-4 mr-2" />
          Analyze All
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Disputes</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto-Resolved</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Resolution</p>
                <p className="text-2xl font-bold">2.3d</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Amount at Risk</p>
                <p className="text-2xl font-bold">$4.7K</p>
              </div>
              <DollarSign className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI Suggestions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {suggestion.type === "auto_resolution" ? "Auto-Resolve" : "Risk Alert"}
                  </Badge>
                </div>
                <p className="text-sm font-medium">{suggestion.title}</p>
                <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  {suggestion.action}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Disputes Table */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Active Disputes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disputes.map((dispute) => (
                  <TableRow key={dispute.id}>
                    <TableCell className="font-mono">{dispute.id}</TableCell>
                    <TableCell>{dispute.client}</TableCell>
                    <TableCell className="font-medium">{dispute.amount}</TableCell>
                    <TableCell>{dispute.type}</TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(dispute.priority) as any}>
                        {dispute.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(dispute.status) as any}>
                        {dispute.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Dispute Details - {dispute.id}</DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-6">
                            {/* Dispute Overview */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Client</label>
                                <p>{dispute.client}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Amount</label>
                                <p className="font-mono">{dispute.amount}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Type</label>
                                <p>{dispute.type}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Created</label>
                                <p>{dispute.created}</p>
                              </div>
                            </div>

                            {/* AI Analysis */}
                            <div className="p-4 bg-gradient-card rounded-lg">
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Brain className="h-4 w-4" />
                                AI Analysis
                              </h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Classification:</span>
                                  <p className="font-medium">{dispute.aiClassification.replace('_', ' ')}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Confidence:</span>
                                  <p className="font-medium">{dispute.confidence}%</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Risk Score:</span>
                                  <p className="font-medium">{dispute.riskScore}/10</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Suggested Resolution:</span>
                                  <p className="font-medium">{dispute.resolution}</p>
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <div>
                              <label className="text-sm font-medium">Description</label>
                              <Textarea 
                                value={dispute.description}
                                readOnly
                                className="mt-1"
                              />
                            </div>

                            {/* Evidence Section */}
                            <div>
                              <label className="text-sm font-medium">Evidence & Documentation</label>
                              <div className="mt-2 space-y-2">
                                <div className="flex items-center gap-2 p-2 border rounded">
                                  <Paperclip className="h-4 w-4" />
                                  <span className="text-sm">Transaction_logs_Dec_2024.csv</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 border rounded">
                                  <Paperclip className="h-4 w-4" />
                                  <span className="text-sm">Contract_FNB_Pricing_Agreement.pdf</span>
                                </div>
                              </div>
                            </div>

                            {/* Resolution Actions */}
                            <div className="flex justify-end gap-2 pt-4 border-t">
                              <Button variant="outline">Escalate</Button>
                              <Button variant="outline">Add Evidence</Button>
                              <Button>Resolve</Button>
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
    </div>
  );
}