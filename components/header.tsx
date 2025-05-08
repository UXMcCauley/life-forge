"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { 
  Home, 
  BarChart, 
  Compass, 
  User, 
  Menu, 
  X, 
  BookOpenCheck,
  Sparkles
} from "lucide-react";

export function Header() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? "bg-background/95 backdrop-blur-sm border-b" : "bg-transparent"
    }`}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LifeForge AI</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/assessments" className="text-sm font-medium transition-colors hover:text-primary">
            Assessments
          </Link>
          <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
            Resources
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
          {session ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="outline" className="hidden md:flex">
                  Dashboard
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" onClick={() => signIn()}>Log in</Button>
              <Button onClick={() => signIn()}>Sign up</Button>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link 
              href="/assessments" 
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BarChart className="h-5 w-5" />
              <span>Assessments</span>
            </Link>
            <Link 
              href="/resources" 
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpenCheck className="h-5 w-5" />
              <span>Resources</span>
            </Link>
            <Link 
              href="/about" 
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Compass className="h-5 w-5" />
              <span>About</span>
            </Link>
            
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BarChart className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full" onClick={() => signIn()}>
                  Sign up
                </Button>
                <Button variant="outline" className="w-full" onClick={() => signIn()}>
                  Log in
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}