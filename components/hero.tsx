"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function Hero() {
  const { data: session } = useSession();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                Discover Your <span className="text-primary">Personalized</span> Life Path
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                AI-driven insights that transform your potential into a clear roadmap for success, happiness, and fulfillment.
              </motion.p>
            </div>
            <motion.div 
              className="flex flex-col sm:flex-row gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {session ? (
                <Link href="/dashboard">
                  <Button size="lg" className="px-8">Continue Your Journey</Button>
                </Link>
              ) : (
                <>
                  <Link href="/assessments/start">
                    <Button size="lg" className="px-8">Start Your Journey</Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button size="lg" variant="outline">Learn More</Button>
                  </Link>
                </>
              )}
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CheckIcon className="h-4 w-4" />
              <span>Scientifically validated assessments</span>
              <Dot />
              <CheckIcon className="h-4 w-4" />
              <span>Personalized AI insights</span>
              <Dot />
              <CheckIcon className="h-4 w-4" />
              <span>Actionable steps</span>
            </motion.div>
          </div>
          <motion.div 
            className="bg-muted rounded-xl overflow-hidden border shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="p-6 md:p-8">
              <div className="aspect-video relative bg-gradient-to-br from-primary/30 via-primary/5 to-background rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="w-full h-3 bg-primary/20 rounded-full" />
                  <div className="w-3/4 h-3 bg-primary/20 rounded-full" />
                  <div className="w-1/2 h-3 bg-primary/20 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square rounded-md bg-primary/10 p-2 flex items-center justify-center">
                      <span className="text-2xl">{["🧠", "❤️", "🌱"][i-1]}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full h-12 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">Begin Assessment</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Dot() {
  return <div className="w-1 h-1 rounded-full bg-muted-foreground" />;
}