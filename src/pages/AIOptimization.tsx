import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Lightbulb,
  BarChart3,
  PieChart
} from "lucide-react";

export default function AIOptimization() {
  const optimizationInsights = [
    {
      client: "First National Bank",
      type: "Price Increase",
      service: "Card Transactions",
      currentPrice: "$0.15",
      suggestedPrice: "$0.17",
      impact: "+$24,000",
      confidence: 85,
      churnRisk: "Low",
      reasoning: "Client's transaction volume increased 23% last quarter. Market analysis shows similar institutions paying $0.16-$0.18 per transaction."
    },
    {
      client: "Credit Union Plus", 
      type: "Volume Discount",
      service: "KYC/AML Checks",
      currentPrice: "$1.50",
      suggestedPrice: "$1.25",
      impact: "+$18,500",
      confidence: 72,
      churnRisk: "Low",
      reasoning: "Offer tiered pricing to lock in growing volume. Client processes 850+ checks monthly, justifying volume discount for loyalty."
    },
    {
      client: "Metro Financial",
      type: "Upsell Opportunity",
      service: "Apple Pay Integration",
      currentPrice: "N/A",
      suggestedPrice: "$0.08",
      impact: "+$15,200",
      confidence: 78,
      churnRisk: "None",
      reasoning: "Client shows high mobile banking usage but lacks Apple Pay. Integration could generate 1,900+ transactions monthly."
    }
  ];

  const marginAnalysis = [
    { client: "First National Bank", revenue: 240000, costs: 163200, margin: 32.0 },
    { client: "Credit Union Plus", revenue: 180000, costs: 129600, margin: 28.0 },
    { client: "Metro Financial", revenue: 95000, costs: 61750, margin: 35.0 },
    { client: "Community Bank", revenue: 120000, costs: 84000, margin: 30.0 },
  ];

  const whatIfScenarios = [
    {
      scenario: "Increase all transaction fees by $0.01",
      impact: "+$47,200 annually",
      clientsAffected: 8,
      riskLevel: "Low"
    },
    {
      scenario: "Introduce volume discount tiers",
      impact: "+$31,800 annually",
      clientsAffected: 4,
      riskLevel: "Very Low"
    },
    {
      scenario: "Bundle Apple Pay + Google Pay",
      impact: "+$28,900 annually", 
      clientsAffected: 6,
      riskLevel: "Low"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Price Optimization</h1>
          <p className="text-muted-foreground">Maximize revenue with intelligent pricing insights</p>
        </div>
        <Button className="bg-gradient-primary">
          <Brain className="h-4 w-4 mr-2" />
          Run Analysis
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Potential Revenue</p>
                <p className="text-2xl font-bold text-success">+$67.7K</p>
              </div>
              <ArrowUpRight className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Insights</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Lightbulb className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Risk</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
              <ArrowDownRight className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Optimization Insights */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {optimizationInsights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{insight.type}</Badge>
                  <span className="text-sm font-medium text-success">{insight.impact}</span>
                </div>
                
                <div>
                  <p className="font-medium">{insight.client}</p>
                  <p className="text-sm text-muted-foreground">{insight.service}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span>Current: {insight.currentPrice}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  <span>Suggested: {insight.suggestedPrice}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Confidence</span>
                    <span>{insight.confidence}%</span>
                  </div>
                  <Progress value={insight.confidence} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span>Churn Risk:</span>
                  <Badge variant={insight.churnRisk === "Low" ? "default" : "destructive"}>
                    {insight.churnRisk}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground">{insight.reasoning}</p>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Review</Button>
                  <Button size="sm">Apply</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Margin Analysis */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Margin Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marginAnalysis.map((client, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{client.client}</span>
                      <span className="text-sm font-bold">{client.margin}%</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Revenue: ${(client.revenue / 1000).toFixed(0)}K</span>
                      <span>Costs: ${(client.costs / 1000).toFixed(0)}K</span>
                    </div>
                    <Progress 
                      value={client.margin} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                What-If Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {whatIfScenarios.map((scenario, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium">{scenario.scenario}</p>
                    <Badge variant={scenario.riskLevel === "Very Low" ? "default" : "secondary"}>
                      {scenario.riskLevel}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-success font-medium">{scenario.impact}</span>
                    <span className="text-muted-foreground">{scenario.clientsAffected} clients</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}