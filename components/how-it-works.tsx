"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HowItWorks() {
  const [loaded, setLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  
  useEffect(() => {
    setLoaded(true);
    
    const interval = setInterval(() => {
      setActiveStep(prev => prev < 4 ? prev + 1 : 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      number: 1,
      title: "Complete Assessments",
      description: "Take our comprehensive series of scientifically-validated assessments to help us understand your personality, goals, and preferences.",
      icon: "📋"
    },
    {
      number: 2,
      title: "Receive Your Plan",
      description: "Our AI analyzes your assessment data to create a personalized life plan with clear, actionable steps tailored to your unique profile.",
      icon: "🧠"
    },
    {
      number: 3,
      title: "Access Resources",
      description: "Explore recommended programs, courses, and tools specifically selected to help you achieve your personal and professional goals.",
      icon: "🔍"
    },
    {
      number: 4,
      title: "Track Progress",
      description: "Monitor your journey with interactive dashboards that celebrate achievements and adapt to your evolving goals and priorities.",
      icon: "📈"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              The Journey
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How LifeForge AI Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A simple four-step process that transforms assessment data into personalized life guidance
            </p>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-20">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 rounded-xl bg-card border shadow-lg p-6 flex flex-col items-center justify-center text-center ${
                    activeStep === step.number ? "z-10" : "z-0"
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={loaded && activeStep === step.number ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">Step {step.number}</h3>
                  <h4 className="text-xl font-medium mb-3">{step.title}</h4>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex gap-4 p-4 cursor-pointer rounded-lg transition-colors ${
                    activeStep === step.number ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                  onClick={() => setActiveStep(step.number)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={loaded ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    activeStep === step.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {step.number}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-none">{step.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center pt-4">
              <Link href="/assessments/start">
                <Button size="lg" className="px-8">Start Your Journey</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}