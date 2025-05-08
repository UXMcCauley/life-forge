"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  CheckCircle, 
  Compass, 
  LineChart, 
  BookOpen, 
  HeartHandshake, 
  BriefcaseBusiness, 
  PiggyBank
} from "lucide-react";

export function Features() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  const features = [
    {
      title: "Personality Assessment",
      description: "Discover your true personality type and how it influences your decision-making, relationships, and career choices.",
      icon: <Brain className="h-8 w-8 text-primary" />,
      delay: 0
    },
    {
      title: "Learning Style Analysis",
      description: "Identify your optimal learning methods to accelerate skill acquisition and personal development.",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      delay: 0.1
    },
    {
      title: "Goal Mapping",
      description: "Set and visualize actionable life goals with AI-guided milestones that adapt to your changing priorities.",
      icon: <Compass className="h-8 w-8 text-primary" />,
      delay: 0.2
    },
    {
      title: "Progress Tracking",
      description: "Monitor your journey with interactive dashboards that celebrate victories and adjust to overcome challenges.",
      icon: <LineChart className="h-8 w-8 text-primary" />,
      delay: 0.3
    },
    {
      title: "Career Alignment",
      description: "Match your skills, passions, and personality with career paths that offer fulfillment and growth potential.",
      icon: <BriefcaseBusiness className="h-8 w-8 text-primary" />,
      delay: 0.4
    },
    {
      title: "Relationship Insights",
      description: "Understand your social patterns and communication style to build stronger, more meaningful relationships.",
      icon: <HeartHandshake className="h-8 w-8 text-primary" />,
      delay: 0.5
    },
    {
      title: "Resource Library",
      description: "Access a curated collection of tools, courses, and programs tailored to your specific development needs.",
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      delay: 0.6
    },
    {
      title: "Financial Guidance",
      description: "Receive personalized financial planning assistance aligned with your life goals and current situation.",
      icon: <PiggyBank className="h-8 w-8 text-primary" />,
      delay: 0.7
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Comprehensive Assessment
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything You Need for Personal Growth
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines multiple assessment types to create a holistic understanding of who you are and where you're headed.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-8 md:mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <Card className="h-full transition-all hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="mb-3">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}