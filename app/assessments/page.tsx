"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Sparkles, 
  BookOpen, 
  Heart, 
  Briefcase, 
  PiggyBank, 
  Activity, 
  Check, 
  Clock,
  Award
} from "lucide-react";

export default function AssessmentsPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("available");
  
  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
  }
  
  const assessments = [
    {
      id: 1,
      title: "Personality Type Analysis",
      description: "Discover your psychological preferences and how they shape your interaction with the world.",
      status: "completed",
      progress: 100,
      duration: "15 min",
      questions: 60,
      icon: Brain,
      completed: true,
      date: "May 10, 2023"
    },
    {
      id: 2,
      title: "Learning Style Assessment",
      description: "Identify your optimal learning methods to accelerate skill acquisition and knowledge retention.",
      status: "completed",
      progress: 100,
      duration: "10 min",
      questions: 40,
      icon: BookOpen,
      completed: true,
      date: "May 12, 2023"
    },
    {
      id: 3,
      title: "Career Values & Interests",
      description: "Align your career path with your core values and interests for greater fulfillment.",
      status: "in-progress",
      progress: 45,
      duration: "20 min",
      questions: 75,
      icon: Briefcase,
      completed: false,
      date: null
    },
    {
      id: 4,
      title: "Relationship Communication Patterns",
      description: "Understand your communication style to build stronger personal and professional relationships.",
      status: "available",
      progress: 0,
      duration: "15 min",
      questions: 55,
      icon: Heart,
      completed: false,
      date: null
    },
    {
      id: 5,
      title: "Financial Mindset Analysis",
      description: "Examine your relationship with money and develop healthier financial habits.",
      status: "available",
      progress: 0,
      duration: "15 min",
      questions: 50,
      icon: PiggyBank,
      completed: false,
      date: null
    },
    {
      id: 6,
      title: "Wellness & Self-Care Patterns",
      description: "Evaluate your health habits and identify opportunities for improved well-being.",
      status: "available",
      progress: 0,
      duration: "15 min",
      questions: 45,
      icon: Activity,
      completed: false,
      date: null
    },
  ];
  
  const recommended = assessments.filter(a => a.status === "available").slice(0, 2);
  const inProgress = assessments.filter(a => a.status === "in-progress");
  const completed = assessments.filter(a => a.status === "completed");
  const available = assessments.filter(a => a.status === "available");
  
  const AssessmentCard = ({ assessment, buttonText = "Continue", buttonVariant = "default" }: any) => (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <assessment.icon className="h-5 w-5 text-primary" />
              <span>{assessment.title}</span>
            </CardTitle>
            <CardDescription>{assessment.description}</CardDescription>
          </div>
          {assessment.completed && (
            <div className="rounded-full p-1 bg-primary/10">
              <Check className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{assessment.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span>{assessment.questions} questions</span>
          </div>
        </div>
        
        {assessment.progress > 0 && (
          <div className="space-y-1 mb-4">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{assessment.progress}%</span>
            </div>
            <Progress value={assessment.progress} />
          </div>
        )}
        
        {assessment.completed && (
          <div className="text-sm text-muted-foreground mt-2">
            Completed on {assessment.date}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/assessments/${assessment.id}`} className="w-full">
          <Button 
            className="w-full" 
            variant={buttonVariant as any}
          >
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container py-8 max-w-6xl">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
        <p className="text-muted-foreground">
          Complete these assessments to help us create your personalized life plan
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Assessment Progress</CardTitle>
            <CardDescription>You've completed {completed.length} of {assessments.length} assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Completion</span>
                <span>{Math.round((completed.length / assessments.length) * 100)}%</span>
              </div>
              <Progress value={(completed.length / assessments.length) * 100} />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="rounded-lg border bg-card p-3 text-center">
                <div className="text-2xl font-bold text-primary">{completed.length}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="rounded-lg border bg-card p-3 text-center">
                <div className="text-2xl font-bold text-amber-500">{inProgress.length}</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div className="rounded-lg border bg-card p-3 text-center">
                <div className="text-2xl font-bold">{available.length}</div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
            <CardDescription>Complete these assessments to enhance your life plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inProgress.length > 0 ? (
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-amber-500/10 p-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Continue your assessment</p>
                    <p className="text-sm text-muted-foreground">You have an assessment in progress. Pick up where you left off!</p>
                    <Link href={`/assessments/${inProgress[0].id}`}>
                      <Button size="sm" className="mt-2">Continue {inProgress[0].title}</Button>
                    </Link>
                  </div>
                </div>
              ) : recommended.length > 0 ? (
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Start a new assessment</p>
                    <p className="text-sm text-muted-foreground">This assessment will help us fine-tune your life plan.</p>
                    <Link href={`/assessments/${recommended[0].id}`}>
                      <Button size="sm" className="mt-2">Take {recommended[0].title}</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-green-500/10 p-2">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">All assessments completed!</p>
                    <p className="text-sm text-muted-foreground">Great job! You've completed all available assessments.</p>
                    <Link href="/dashboard">
                      <Button size="sm" className="mt-2">View Your Life Plan</Button>
                    </Link>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-500/10 p-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">New assessments coming soon</p>
                  <p className="text-sm text-muted-foreground">We're developing new assessments to provide even more personalized insights.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="available" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          {available.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {available.map((assessment) => (
                <AssessmentCard 
                  key={assessment.id} 
                  assessment={assessment} 
                  buttonText="Start Assessment" 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Available Assessments</h3>
              <p className="text-muted-foreground max-w-md">
                You've started or completed all available assessments. Check the other tabs to continue or review your assessments.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="in-progress">
          {inProgress.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inProgress.map((assessment) => (
                <AssessmentCard 
                  key={assessment.id} 
                  assessment={assessment} 
                  buttonText="Continue" 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Assessments In Progress</h3>
              <p className="text-muted-foreground max-w-md">
                You don't have any assessments in progress. Start a new assessment from the Available tab.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setActiveTab("available")}
              >
                View Available Assessments
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {completed.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completed.map((assessment) => (
                <AssessmentCard 
                  key={assessment.id} 
                  assessment={assessment} 
                  buttonText="View Results" 
                  buttonVariant="outline"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Award className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Completed Assessments</h3>
              <p className="text-muted-foreground max-w-md">
                You haven't completed any assessments yet. Start with the recommended assessments to build your life plan.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setActiveTab("available")}
              >
                View Available Assessments
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}