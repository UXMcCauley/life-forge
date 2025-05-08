"use client";

import { useState, useEffect } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Compass, GraduationCap, Target, Calendar, Clock, DivideIcon as LucideIcon, Sparkles, ArrowRight, LightbulbIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [progress, setProgress] = useState(68);
  
  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
  }

  const pieData = [
    { name: "Career", value: 35, color: "hsl(var(--chart-1))" },
    { name: "Relationships", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Health", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Finance", value: 15, color: "hsl(var(--chart-4))" },
    { name: "Personal", value: 5, color: "hsl(var(--chart-5))" },
  ];
  
  const lineData = [
    { name: "Jan", progress: 20 },
    { name: "Feb", progress: 35 },
    { name: "Mar", progress: 45 },
    { name: "Apr", progress: 52 },
    { name: "May", progress: 68 },
  ];
  
  const upcomingMilestones = [
    { 
      id: 1, 
      title: "Complete Python Certification", 
      date: "June 15", 
      category: "Career",
      progress: 70
    },
    { 
      id: 2, 
      title: "Weekly Family Game Night", 
      date: "Every Sunday", 
      category: "Relationships",
      progress: 100
    },
    { 
      id: 3, 
      title: "Save $5,000 for Emergency Fund", 
      date: "August 30", 
      category: "Finance",
      progress: 60
    },
    { 
      id: 4, 
      title: "Run 5K Marathon", 
      date: "July 10", 
      category: "Health",
      progress: 45
    },
  ];
  
  const resourceRecommendations = [
    {
      id: 1,
      title: "Introduction to Programming",
      type: "Course",
      provider: "Coursera",
      match: "95%",
      category: "Career",
      icon: GraduationCap
    },
    {
      id: 2,
      title: "Effective Communication in Relationships",
      type: "Book",
      provider: "Audible",
      match: "92%",
      category: "Relationships",
      icon: LightbulbIcon
    },
    {
      id: 3,
      title: "Personal Finance Workshop",
      type: "Webinar",
      provider: "Financial Literacy Initiative",
      match: "88%",
      category: "Finance",
      icon: Target
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals & Milestones</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Plan Completion</CardTitle>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progress}%</div>
                <Progress value={progress} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  +4% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12/36</div>
                <p className="text-xs text-muted-foreground mt-2">
                  2 completed this month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assessment Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72/100</div>
                <p className="text-xs text-muted-foreground mt-2">
                  High compatibility with plan
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 Days</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Progress checkpoint on June 15
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
                <CardDescription>
                  Your journey over the last 5 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={lineData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Goal Distribution</CardTitle>
                <CardDescription>
                  Balance across life areas
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[300px] w-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <div className="grid grid-cols-2 gap-2 px-6 pb-6">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Upcoming Milestones</CardTitle>
                <CardDescription>
                  Stay on track with your next goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[220px]">
                  <div className="space-y-4">
                    {upcomingMilestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full" style={{ 
                          backgroundColor: pieData.find(p => p.name === milestone.category)?.color || 'hsl(var(--primary))' 
                        }} />
                        <div className="flex-1 space-y-1">
                          <div className="font-medium">{milestone.title}</div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{milestone.category}</span>
                            <span>{milestone.date}</span>
                          </div>
                          <Progress value={milestone.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Personalized Insights</CardTitle>
                <CardDescription>
                  AI-generated recommendations for your journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="font-medium">Career Focus</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your analytical skills show strong alignment with data science. Consider taking the recommended Python course to build a foundation.
                    </p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="font-medium">Relationship Pattern</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your communication style assessment indicates a preference for direct conversation. Scheduled family time is strengthening your connections.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    <Compass className="mr-2 h-4 w-4" />
                    View Full Life Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Goal cards would go here */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Career Development</CardTitle>
                  <div className="h-4 w-4 rounded-full bg-chart-1" />
                </div>
                <CardDescription>35% of your life plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>70%</span>
                    </div>
                    <Progress value={70} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Key Milestones</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                          Complete Python Certification
                        </span>
                        <span>70%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-amber-500 mr-2" />
                          Network with Industry Professionals
                        </span>
                        <span>30%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
                          Submit Job Applications
                        </span>
                        <span>10%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Relationships</CardTitle>
                  <div className="h-4 w-4 rounded-full bg-chart-2" />
                </div>
                <CardDescription>25% of your life plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Key Milestones</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                          Weekly Family Game Night
                        </span>
                        <span>100%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                          Monthly Date Night
                        </span>
                        <span>100%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-amber-500 mr-2" />
                          Practice Active Listening
                        </span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Health & Wellness</CardTitle>
                  <div className="h-4 w-4 rounded-full bg-chart-3" />
                </div>
                <CardDescription>20% of your life plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Key Milestones</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-amber-500 mr-2" />
                          Run 5K Marathon
                        </span>
                        <span>45%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-amber-500 mr-2" />
                          Establish Sleep Routine
                        </span>
                        <span>60%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                          Meal Prep Weekly
                        </span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resourceRecommendations.map((resource) => (
              <Card key={resource.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <div className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                      {resource.match} Match
                    </div>
                  </div>
                  <CardDescription>{resource.type} • {resource.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <div className="h-2 w-2 rounded-full" style={{ 
                      backgroundColor: pieData.find(p => p.name === resource.category)?.color || 'hsl(var(--primary))' 
                    }} />
                    <span>{resource.category}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      This resource aligns with your learning style and career goals. It provides fundamental skills needed for your desired path.
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      <span>8-week program</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Save</Button>
                    <Button size="sm" className="flex-1">Access</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Link href="/resources">
              <Button variant="outline" className="gap-2">
                View All Resources
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">AI Insights & Observations</h3>
                <p className="text-muted-foreground">
                  Based on your assessment data and progress tracking, our AI has generated the following insights:
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Personality Profile
                  </h4>
                  <p>
                    You demonstrate strong analytical thinking with a preference for concrete data over abstract concepts. Your learning style is visual-logical, meaning you absorb information best when it's presented in a structured, visual format with clear practical applications.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Career Alignment
                  </h4>
                  <p>
                    Your skill profile shows high compatibility with data-driven roles. Consider focusing on developing hard skills in programming and data analysis, which align with your logical thinking patterns and problem-solving approach.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Relationship Patterns
                  </h4>
                  <p>
                    Your communication style is direct and solution-oriented, which works well in professional settings but may benefit from adding more emotional context in personal relationships. The weekly family activities you've implemented show excellent progress in this area.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Growth Opportunities
                  </h4>
                  <p>
                    Consider allocating more time to health and wellness goals. Your current plan shows this as your least developed area, and improving physical well-being has been shown to enhance performance in all other life domains.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Button className="w-full sm:w-auto">
                  Schedule AI Coaching Session
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}