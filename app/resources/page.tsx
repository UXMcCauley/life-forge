"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Heart,
  PiggyBank,
  Search,
  Activity,
  Star,
  ExternalLink,
  BookmarkPlus
} from "lucide-react";

export default function ResourcesPage() {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  
  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
  }
  
  const resources = [
    {
      id: 1,
      title: "Introduction to Programming",
      description: "A comprehensive course covering programming fundamentals with Python",
      type: "Course",
      provider: "Coursera",
      category: "Career",
      match: 95,
      featured: true,
      tags: ["programming", "technology", "beginner"],
      icon: GraduationCap
    },
    {
      id: 2,
      title: "Data Analysis Masterclass",
      description: "Learn to analyze complex datasets and extract meaningful insights",
      type: "Workshop",
      provider: "DataCamp",
      category: "Career",
      match: 88,
      featured: false,
      tags: ["data", "analytics", "intermediate"],
      icon: GraduationCap
    },
    {
      id: 3,
      title: "Effective Communication in Relationships",
      description: "Discover techniques to improve personal and professional communication",
      type: "Book",
      provider: "Audible",
      category: "Relationships",
      match: 92,
      featured: true,
      tags: ["communication", "relationships", "self-improvement"],
      icon: Heart
    },
    {
      id: 4,
      title: "Financial Freedom Blueprint",
      description: "A step-by-step guide to achieving financial independence",
      type: "Course",
      provider: "Financial Literacy Initiative",
      category: "Finance",
      match: 78,
      featured: false,
      tags: ["finance", "investing", "planning"],
      icon: PiggyBank
    },
    {
      id: 5,
      title: "Mindfulness Meditation Practice",
      description: "Daily guided meditations to reduce stress and improve focus",
      type: "App",
      provider: "Calm",
      category: "Health",
      match: 85,
      featured: false,
      tags: ["wellness", "meditation", "mental health"],
      icon: Activity
    },
    {
      id: 6,
      title: "Career Transition Roadmap",
      description: "A guide for professionals looking to change careers or industries",
      type: "Webinar",
      provider: "Career Builder",
      category: "Career",
      match: 90,
      featured: true,
      tags: ["career", "transition", "professional development"],
      icon: Briefcase
    },
    {
      id: 7,
      title: "Advanced Learning Techniques",
      description: "Scientific approaches to accelerate skill acquisition and retention",
      type: "Book",
      provider: "Learning Lab",
      category: "Education",
      match: 83,
      featured: false,
      tags: ["learning", "productivity", "education"],
      icon: BookOpen
    },
    {
      id: 8,
      title: "Healthy Habit Formation",
      description: "Research-based strategies for building lasting healthy habits",
      type: "Course",
      provider: "Health Institute",
      category: "Health",
      match: 79,
      featured: false,
      tags: ["habits", "health", "wellness"],
      icon: Activity
    },
  ];
  
  const filteredResources = resources
    .filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  
  const categories = [
    { id: "all", name: "All Resources" },
    { id: "career", name: "Career" },
    { id: "relationships", name: "Relationships" },
    { id: "finance", name: "Finance" },
    { id: "health", name: "Health" },
    { id: "education", name: "Education" },
  ];
  
  const getCategoryResources = (category: string) => {
    if (category === "all") return filteredResources;
    return filteredResources.filter(
      resource => resource.category.toLowerCase() === category.toLowerCase()
    );
  };
  
  const ResourceCard = ({ resource }: any) => (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <resource.icon className="h-5 w-5 text-primary" />
              <span>{resource.title}</span>
            </CardTitle>
            <CardDescription>{resource.description}</CardDescription>
          </div>
          {resource.match >= 90 && (
            <Badge className="bg-primary hover:bg-primary/80">
              {resource.match}% Match
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <span>{resource.type}</span>
          <span>{resource.provider}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
        >
          <BookmarkPlus className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Access
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">
            Personalized recommendations to help you achieve your goals
          </p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredResources.some(r => r.featured) && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Featured Resources</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources
              .filter(r => r.featured)
              .map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
          <Separator className="my-8" />
        </div>
      )}
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            {getCategoryResources(category.id).length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {getCategoryResources(category.id).map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Resources Found</h3>
                <p className="text-muted-foreground max-w-md">
                  {searchQuery
                    ? `No resources matching "${searchQuery}" in the ${category.name.toLowerCase()} category.`
                    : `No resources available in the ${category.name.toLowerCase()} category yet.`
                }
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}