"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AssessmentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const assessmentId = params.id;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
  }
  
  // Mock assessment data - in a real app, this would come from the API/database
  const assessmentData = {
    id: assessmentId,
    title: "Personality Type Analysis",
    description: "Discover your psychological preferences and how they shape your interaction with the world.",
    questionCount: 10,
    questions: [
      {
        id: 1,
        text: "When making decisions, I tend to:",
        options: [
          { id: "a", text: "Rely on logical analysis and objective facts" },
          { id: "b", text: "Consider how the decision will impact people and values" },
          { id: "c", text: "Trust my intuition and gut feelings" },
          { id: "d", text: "Make a pros and cons list before deciding" },
        ]
      },
      {
        id: 2,
        text: "In social situations, I typically:",
        options: [
          { id: "a", text: "Feel energized by interacting with many people" },
          { id: "b", text: "Prefer deeper conversations with a few close friends" },
          { id: "c", text: "Need to retreat and recharge after socializing" },
          { id: "d", text: "Enjoy being the center of attention" },
        ]
      },
      {
        id: 3,
        text: "When learning something new, I prefer:",
        options: [
          { id: "a", text: "Understanding the big picture and concepts first" },
          { id: "b", text: "Getting step-by-step instructions and practical examples" },
          { id: "c", text: "Experimenting and figuring it out as I go" },
          { id: "d", text: "Discussing ideas and theories with others" },
        ]
      },
      {
        id: 4,
        text: "When faced with a challenge, I typically:",
        options: [
          { id: "a", text: "Create a detailed plan before taking action" },
          { id: "b", text: "Jump in and adapt as needed along the way" },
          { id: "c", text: "Research all possible solutions thoroughly" },
          { id: "d", text: "Ask others for their input and experiences" },
        ]
      },
      {
        id: 5,
        text: "My workspace is usually:",
        options: [
          { id: "a", text: "Organized with everything in its place" },
          { id: "b", text: "Somewhat messy but I know where everything is" },
          { id: "c", text: "Organized by my own system that makes sense to me" },
          { id: "d", text: "Changes depending on what I'm working on" },
        ]
      },
      {
        id: 6,
        text: "When under stress, I tend to:",
        options: [
          { id: "a", text: "Become more analytical and detached" },
          { id: "b", text: "Seek emotional support from others" },
          { id: "c", text: "Need time alone to process and recharge" },
          { id: "d", text: "Take action to solve the problem immediately" },
        ]
      },
      {
        id: 7,
        text: "I am most productive when:",
        options: [
          { id: "a", text: "I have a clear schedule and plan for the day" },
          { id: "b", text: "I have flexibility to adjust my priorities as needed" },
          { id: "c", text: "I'm working on something I'm passionate about" },
          { id: "d", text: "I'm collaborating with others on a project" },
        ]
      },
      {
        id: 8,
        text: "When communicating, I tend to:",
        options: [
          { id: "a", text: "Be direct and straightforward" },
          { id: "b", text: "Consider how my words might affect others" },
          { id: "c", text: "Use metaphors and analogies frequently" },
          { id: "d", text: "Share detailed explanations and examples" },
        ]
      },
      {
        id: 9,
        text: "When setting goals, I prioritize:",
        options: [
          { id: "a", text: "Creating a step-by-step plan to achieve them" },
          { id: "b", text: "Setting goals that align with my personal values" },
          { id: "c", text: "Keeping my options open as I progress" },
          { id: "d", text: "Setting ambitious targets that challenge me" },
        ]
      },
      {
        id: 10,
        text: "I find meaning in life primarily through:",
        options: [
          { id: "a", text: "Achieving my goals and being successful" },
          { id: "b", text: "Having deep, meaningful relationships" },
          { id: "c", text: "Continuous learning and personal growth" },
          { id: "d", text: "Contributing to causes larger than myself" },
        ]
      },
    ]
  };
  
  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId });
  };
  
  const handleNext = () => {
    if (currentQuestion < assessmentData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit assessment
      setIsLoading(true);
      setTimeout(() => {
        setIsCompleted(true);
        setIsLoading(false);
      }, 2000); // Simulate API call
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleComplete = () => {
    router.push("/dashboard");
  };
  
  const currentQuestionData = assessmentData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentData.questions.length) * 100;
  
  const isAnswered = answers[currentQuestionData.id] !== undefined;

  return (
    <div className="container py-8 max-w-3xl">
      <div className="mb-8 space-y-4">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2"
          onClick={() => router.push("/assessments")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Assessments
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{assessmentData.title}</h1>
          <p className="text-muted-foreground mt-1">{assessmentData.description}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestion + 1} of {assessmentData.questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {currentQuestionData.text}
                </h2>
                
                <RadioGroup 
                  value={answers[currentQuestionData.id]}
                  className="space-y-3"
                  onValueChange={(value) => handleAnswer(currentQuestionData.id, value)}
                >
                  {currentQuestionData.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                      <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!isAnswered || isLoading}
              >
                {isLoading ? (
                  "Processing..."
                ) : currentQuestion === assessmentData.questions.length - 1 ? (
                  "Complete Assessment"
                ) : (
                  "Next Question"
                )}
                {!isLoading && currentQuestion < assessmentData.questions.length - 1 && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="completion"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center py-12"
          >
            <div className="rounded-full bg-primary/10 p-6 mb-6">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Assessment Completed!</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Thank you for completing the {assessmentData.title}. Your results have been processed and incorporated into your personalized life plan.
            </p>
            
            <div className="bg-muted/50 rounded-lg p-6 w-full max-w-md mb-8">
              <h3 className="font-semibold mb-3">Your Results Summary</h3>
              <Separator className="mb-4" />
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span>Analytical Thinking:</span>
                  <span className="font-medium">High</span>
                </div>
                <div className="flex justify-between">
                  <span>Social Interaction:</span>
                  <span className="font-medium">Balanced</span>
                </div>
                <div className="flex justify-between">
                  <span>Learning Preference:</span>
                  <span className="font-medium">Conceptual</span>
                </div>
                <div className="flex justify-between">
                  <span>Decision Making:</span>
                  <span className="font-medium">Logical</span>
                </div>
              </div>
              <Separator className="my-4" />
              <p className="text-sm text-muted-foreground">
                A detailed analysis is available in your dashboard.
              </p>
            </div>
            
            <div className="space-x-4">
              <Button 
                variant="outline"
                onClick={() => router.push("/assessments")}
              >
                Take More Assessments
              </Button>
              <Button onClick={handleComplete}>
                View Updated Life Plan
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}