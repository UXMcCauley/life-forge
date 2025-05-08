"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  BookOpen, 
  Heart, 
  Briefcase, 
  PiggyBank, 
  Activity,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function StartAssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/assessments/1");
    }
  };

  const assessmentTypes = [
    {
      title: "Personality Type",
      description: "Discover your psychological preferences and how they shape your interaction with the world.",
      icon: Brain,
      duration: "15 min",
      questions: 60
    },
    {
      title: "Learning Style",
      description: "Identify your optimal learning methods to accelerate skill acquisition and knowledge retention.",
      icon: BookOpen,
      duration: "10 min",
      questions: 40
    },
    {
      title: "Career Values & Interests",
      description: "Align your career path with your core values and interests for greater fulfillment.",
      icon: Briefcase,
      duration: "20 min",
      questions: 75
    },
    {
      title: "Relationship Patterns",
      description: "Understand your communication style to build stronger personal and professional relationships.",
      icon: Heart,
      duration: "15 min",
      questions: 55
    },
    {
      title: "Financial Mindset",
      description: "Examine your relationship with money and develop healthier financial habits.",
      icon: PiggyBank,
      duration: "15 min",
      questions: 50
    },
    {
      title: "Wellness & Self-Care",
      description: "Evaluate your health habits and identify opportunities for improved well-being.",
      icon: Activity,
      duration: "15 min",
      questions: 45
    },
  ];

  const stepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">Begin Your Journey</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Take our comprehensive assessments to help us create your personalized life plan.
              </p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Scientifically Validated</p>
                      <p className="text-sm text-muted-foreground">
                        Our assessments are based on peer-reviewed research and psychological frameworks.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Comprehensive Analysis</p>
                      <p className="text-sm text-muted-foreground">
                        We examine multiple dimensions of your personality, preferences, and goals.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">AI-Powered Insights</p>
                      <p className="text-sm text-muted-foreground">
                        Advanced algorithms analyze your responses to create personalized recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">Assessment Types</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Here are the assessments you'll complete to create your personalized life plan.
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {assessmentTypes.map((assessment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={loaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <assessment.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="min-h-[60px]">{assessment.description}</CardDescription>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                        <div>{assessment.duration}</div>
                        <div>{assessment.questions} questions</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">Let's Get Started</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                We'll begin with the Personality Type Assessment, which takes about 15 minutes to complete.
              </p>
            </div>
            
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle>Personality Type Assessment</CardTitle>
                </div>
                <CardDescription>
                  Discover your psychological preferences and how they shape your interaction with the world.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>60 questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>15 minutes</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Tips for best results:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-5 list-disc">
                    <li>Answer honestly, not how you think you should</li>
                    <li>Go with your first instinct</li>
                    <li>Think about how you typically behave, not in unusual circumstances</li>
                    <li>Choose the option that feels most like you most of the time</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleNext}
                >
                  Begin Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-muted-foreground">Step {step} of 3</div>
            <div className="text-sm text-muted-foreground">
              {step === 1 ? "Introduction" : step === 2 ? "Assessment Types" : "Get Started"}
            </div>
          </div>
          <Progress value={(step / 3) * 100} />
        </div>
        
        {stepContent()}
        
        <div className="flex justify-end">
          {step < 3 && (
            <Button 
              onClick={handleNext}
              size="lg"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}