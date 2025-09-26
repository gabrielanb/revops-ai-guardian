import { MetricCard } from "@/components/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle
} from "lucide-react";

export default function Dashboard() {
  const recentClients = [
    { name: "First National Bank", revenue: "$2.4M", margin: "32%", status: "active" },
    { name: "Credit Union Plus", revenue: "$1.8M", margin: "28%", status: "active" },
    { name: "Metro Financial", revenue: "$950K", margin: "35%", status: "review" },
    { name: "Community Bank", revenue: "$1.2M", margin: "30%", status: "active" },
  ];

  const recentDisputes = [
    { client: "First National Bank", amount: "$2,340", type: "Usage Volume", priority: "high", status: "pending" },
    { client: "Credit Union Plus", amount: "$890", type: "Pricing Query", priority: "medium", status: "resolved" },
    { client: "Metro Financial", amount: "$1,450", type: "Third-party Fee", priority: "low", status: "pending" },
  ];

  const aiInsights = [
    {
      type: "pricing",
      title: "Price Optimization Opportunity",
      description: "First National Bank: Increase transaction fee by $0.02 for +$24K annual revenue",
      confidence: "High confidence (85%)",
      impact: "+$24K annually"
    },
    {
      type: "upsell",
      title: "Cross-sell Opportunity", 
      description: "Metro Financial shows high Apple Pay transaction volume without our integration",
      confidence: "Medium confidence (72%)",
      impact: "+$15K annually"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Financial Overview</h1>
          <p className="text-muted-foreground">Monitor your billing performance and AI insights</p>
        </div>
        <Button className="bg-gradient-primary">
          Generate Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Monthly Revenue"
          value="$6.2M"
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Average Margin"
          value="31.2%"
          change="+2.1% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Active Clients"
          value="42"
          change="+3 new this month"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Open Disputes"
          value="7"
          change="3 resolved this week"
          changeType="positive"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Clients */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Clients by Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentClients.map((client, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{client.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{client.revenue}</span>
                    <Badge variant={client.status === "active" ? "default" : "secondary"}>
                      {client.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{client.margin}</p>
                  <p className="text-xs text-muted-foreground">margin</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Disputes */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Disputes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDisputes.map((dispute, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{dispute.client}</p>
                  <Badge variant={dispute.status === "resolved" ? "default" : "secondary"}>
                    {dispute.status === "resolved" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {dispute.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{dispute.type}</span>
                  <span className="font-medium">{dispute.amount}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="space-y-2 p-3 rounded-lg bg-gradient-card">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {insight.type === "pricing" ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {insight.type}
                  </Badge>
                  <span className="text-xs text-success font-medium">{insight.impact}</span>
                </div>
                <p className="text-sm font-medium">{insight.title}</p>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
                <p className="text-xs text-primary">{insight.confidence}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}