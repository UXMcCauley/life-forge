"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export function Testimonials() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  const testimonials = [
    {
      text: "LifeForge AI completely transformed my approach to career planning. The personalized insights helped me pivot to a field that aligns perfectly with my values and strengths.",
      author: "Alex Morgan",
      role: "Software Engineer",
      avatar: "AM",
      delay: 0
    },
    {
      text: "I was feeling lost after graduation. The assessment process was eye-opening, and the resource recommendations led me to opportunities I never would have discovered on my own.",
      author: "Jamie Chen",
      role: "Recent Graduate",
      avatar: "JC",
      delay: 0.2
    },
    {
      text: "The relationship insights were incredibly accurate. LifeForge helped me understand my communication patterns and has dramatically improved both my professional and personal relationships.",
      author: "Sam Taylor",
      role: "Marketing Director",
      avatar: "ST",
      delay: 0.4
    },
    {
      text: "After years of feeling stuck, LifeForge AI gave me clarity and direction. The financial planning guidance aligned perfectly with my life goals and has put me on a path to true fulfillment.",
      author: "Jordan Lee",
      role: "Small Business Owner",
      avatar: "JL",
      delay: 0.6
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Success Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Transforming Lives
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from people who have discovered their unique path with LifeForge AI
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-8 md:mt-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: testimonial.delay }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <div className="absolute -left-3 -top-3 text-4xl text-primary opacity-30">"</div>
                      <blockquote className="relative z-10">
                        <p className="text-lg">{testimonial.text}</p>
                      </blockquote>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}