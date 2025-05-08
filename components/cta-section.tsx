"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Discover Your Path?
            </h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              Join thousands who have transformed their lives with personalized AI guidance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 min-[400px]:flex-row">
            <Link href="/assessments/start">
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 px-8"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}