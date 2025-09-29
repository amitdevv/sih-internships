"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Building2, DollarSign, Clock, GraduationCap, Award, ArrowRight } from "lucide-react";
import { useUIStore } from "@/lib/state/ui";

// Mock data for AI search results
const mockJobResults = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp India",
    location: "Bangalore, India",
    salary: "₹12L - ₹18L",
    type: "Full-time",
    match: 95,
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    description: "We're looking for a passionate React developer to join our growing team in Bangalore...",
    posted: "2 days ago",
    remote: true
  },
  {
    id: "2", 
    title: "Full Stack Engineer",
    company: "Jaipur Tech Hub",
    location: "Jaipur, India",
    salary: "₹8L - ₹15L",
    type: "Full-time",
    match: 88,
    skills: ["React", "Python", "PostgreSQL", "Docker"],
    description: "Join our innovative startup in the Pink City and help build the next generation of web applications...",
    posted: "1 week ago",
    remote: false
  },
  {
    id: "3",
    title: "Frontend Developer",
    company: "Mumbai Digital",
    location: "Mumbai, India",
    salary: "₹10L - ₹14L",
    type: "Full-time",
    match: 92,
    skills: ["React", "Vue.js", "CSS", "Figma"],
    description: "Create beautiful and responsive user interfaces for our design platform in Mumbai...",
    posted: "3 days ago",
    remote: true
  },
  {
    id: "4",
    title: "Python Developer",
    company: "Delhi Innovations",
    location: "Delhi, India",
    salary: "₹9L - ₹16L",
    type: "Full-time",
    match: 89,
    skills: ["Python", "Django", "PostgreSQL", "Redis"],
    description: "Work on cutting-edge Python applications in the heart of Delhi...",
    posted: "5 days ago",
    remote: false
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Pune Tech Solutions",
    location: "Pune, India",
    salary: "₹11L - ₹20L",
    type: "Full-time",
    match: 91,
    skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
    description: "Manage cloud infrastructure and deployment pipelines for our Pune-based team...",
    posted: "1 day ago",
    remote: true
  }
];

const mockStudentResults = [
  {
    id: "1",
    name: "Priya Sharma",
    degree: "Computer Science",
    university: "IIT Delhi",
    cgpa: 8.5,
    match: 94,
    skills: ["React", "Python", "Machine Learning", "AWS"],
    experience: "2 years",
    location: "Bangalore, India",
    availability: "Available immediately",
    projects: 12,
    internships: 3
  },
  {
    id: "2",
    name: "Arjun Singh",
    degree: "Software Engineering", 
    university: "Mnit Jaipur",
    cgpa: 8.8,
    match: 91,
    skills: ["React", "Node.js", "TypeScript", "Docker"],
    experience: "1.5 years",
    location: "Jaipur, India",
    availability: "Available in 2 weeks",
    projects: 8,
    internships: 2
  },
  {
    id: "3",
    name: "Ananya Patel",
    degree: "Computer Science",
    university: "BITS Pilani",
    cgpa: 8.2,
    match: 89,
    skills: ["Vue.js", "Python", "PostgreSQL", "Kubernetes"],
    experience: "3 years",
    location: "Mumbai, India",
    availability: "Available immediately",
    projects: 15,
    internships: 4
  },
  {
    id: "4",
    name: "Rahul Kumar",
    degree: "Information Technology",
    university: "NSUT Delhi",
    cgpa: 8.7,
    match: 92,
    skills: ["Python", "Django", "PostgreSQL", "Redis"],
    experience: "2.5 years",
    location: "Delhi, India",
    availability: "Available immediately",
    projects: 10,
    internships: 3
  },
  {
    id: "5",
    name: "Sneha Gupta",
    degree: "Computer Science",
    university: "IIIT Hyderabad",
    cgpa: 8.9,
    match: 93,
    skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
    experience: "1 year",
    location: "Pune, India",
    availability: "Available in 1 week",
    projects: 6,
    internships: 2
  }
];

const suggestedSearches = [
  "React Developer jobs in Bangalore",
  "Python Developer jobs in Jaipur",
  "Remote Frontend Developer jobs",
  "Machine Learning Engineer jobs in Mumbai"
];

const suggestedStudentSearches = [
  "Computer Science students with React experience",
  "Software Engineering graduates in Jaipur",
  "Students with Python and Machine Learning skills",
  "Recent graduates available for internships"
];

// Types for search results
type JobResult = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  match: number;
  skills: string[];
  description: string;
  posted: string;
  remote: boolean;
};

type StudentResult = {
  id: string;
  name: string;
  degree: string;
  university: string;
  cgpa: number;
  match: number;
  skills: string[];
  experience: string;
  location: string;
  availability: string;
  projects: number;
  internships: number;
};

type SearchResult = JobResult | StudentResult;

export default function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [displayedResults, setDisplayedResults] = useState<SearchResult[]>([]);
  const role = useUIStore((s) => s.role);
  const isStudent = role === "student";
  const inputRef = useRef<HTMLInputElement | null>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Focus the search input when the page mounts
    inputRef.current?.focus();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    setDisplayedResults([]);

    // Simulate AI processing time
    setTimeout(() => {
      const fullResults = isStudent ? mockJobResults : mockStudentResults;
      setSearchResults(fullResults);

      // Reveal results one-by-one for a streaming feel
      let index = 0;
      if (revealTimerRef.current) clearInterval(revealTimerRef.current);
      revealTimerRef.current = setInterval(() => {
        setDisplayedResults((prev) => {
          if (index >= fullResults.length) {
            if (revealTimerRef.current) clearInterval(revealTimerRef.current);
            setIsSearching(false);
            return prev;
          }
          const nextList = [...prev, fullResults[index]];
          index += 1;
          return nextList;
        });
      }, 220);
    }, 900);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setDisplayedResults([]);
    setIsSearching(false);
    if (revealTimerRef.current) {
      clearInterval(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    inputRef.current?.focus();
  };

  const handleSuggestedSearch = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-medium">
          Let&apos;s find the <em className="text-[#64a6e7]">perfect</em> {isStudent ? 'job' : 'candidate'} for you
        </h1>
        <p className="text-lg text-muted-foreground">
          with AI {isStudent ? 'job' : 'candidate'} search
        </p>
      </div>

       {/* Search Interface */}
       <div className="max-w-3xl mx-auto">
         <div className="relative border border-[#64a6e7] rounded-xl overflow-hidden focus-within:border-[#5a9bd4] transition-colors">
            <Input
              ref={inputRef}
               placeholder={isStudent ? "Software Jobs in Bangalore" : "Computer Science students with React experience"}
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
               className="pr-14 h-16 text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
              autoFocus
             />
           <button
             onClick={handleSearch}
             disabled={isSearching || !searchQuery.trim()}
             className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
               searchQuery.trim() 
                 ? 'bg-[#64a6e7] hover:bg-[#5a9bd4] text-white' 
                 : 'bg-[#d2d1cf] text-white cursor-not-allowed'
             }`}
           >
             {isSearching ? (
               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
             ) : (
               <ArrowRight size={18} />
             )}
           </button>
         </div>

        {/* Loading animation */}
        {isSearching && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>AI is analyzing your search</span>
            <motion.span
              className="flex items-center gap-1"
              initial={{ opacity: 0.25 }}
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            >
              <span>•</span>
              <span>•</span>
              <span>•</span>
            </motion.span>
          </div>
        )}
       </div>

      {/* Suggested Searches */}
      {!isSearching && displayedResults.length === 0 && (
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Or try searching for</p>
          <div className="flex flex-wrap justify-center gap-2">
            {(isStudent ? suggestedSearches : suggestedStudentSearches).map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleSuggestedSearch(suggestion)}
                className="rounded-full"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {displayedResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {isStudent ? 'Job' : 'Candidate'} Matches ({searchResults.length})
            </h2>
            <Badge variant="secondary" className="bg-[#64a6e7]/10 text-[#64a6e7]">
              AI Powered
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleClear} className="rounded-full">
              Clear results
            </Button>
          </div>

          <div className="grid gap-4">
            <AnimatePresence>
            {displayedResults.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{isStudent ? (item as JobResult).title : (item as StudentResult).name}</h3>
                        <Badge className="bg-[#64a6e7] text-white">
                          {item.match}% match
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building2 size={16} />
                          <span>{isStudent ? (item as JobResult).company : (item as StudentResult).university}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{item.location}</span>
                        </div>
                        {isStudent ? (
                          <>
                            <div className="flex items-center gap-1">
                              <DollarSign size={16} />
                              <span>{(item as JobResult).salary}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span>{(item as JobResult).posted}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-1">
                              <GraduationCap size={16} />
                              <span>{(item as StudentResult).degree}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award size={16} />
                              <span>CGPA: {(item as StudentResult).cgpa}</span>
                            </div>
                          </>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {isStudent
                          ? (item as JobResult).description
                          : `${(item as StudentResult).experience} of experience. ${(item as StudentResult).projects} projects completed.`}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="ml-4">
                      <Button className="bg-[#64a6e7] hover:bg-[#5a9bd4]">
                        {isStudent ? 'Apply Now' : 'View Profile'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
