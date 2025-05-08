"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Target, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-6xl">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About LifeForge AI</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            We combine advanced AI technology with proven psychological frameworks to help individuals discover and achieve their full potential.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Brain className="h-8 w-8 text-primary mb-2" />
              <CardTitle>AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our advanced algorithms analyze multiple data points to create truly personalized recommendations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Target className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Goal-Oriented</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Transform insights into actionable steps with clear milestones and progress tracking.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Heart className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Holistic Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We consider all aspects of life: career, relationships, health, and personal growth.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Expert Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access to professional resources and a community of like-minded individuals.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            To empower individuals with personalized guidance and actionable insights, helping them create meaningful change and achieve their full potential in all areas of life.
          </p>
        </div>

        <div className="flex justify-center pt-8">
          <Link href="/assessments/start">
            <Button size="lg" className="px-8">Start Your Journey</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}