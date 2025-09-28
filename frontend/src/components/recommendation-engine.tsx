"use client";

import { useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Users, TrendingUp } from "lucide-react";
import { opportunitiesData, studentProfiles } from "@/mocks/fixtures/opportunities";
import type { JobPostingFormData } from "@/lib/validations/schemas";

interface RecommendationEngineProps {
  studentId?: string;
  showCount?: number;
}

interface JobMatch {
  score: number;
  reasons: string[];
}

export function RecommendationEngine({ studentId = "student_001", showCount = 3 }: RecommendationEngineProps) {
  const student = useMemo(() => 
    studentProfiles.find(s => s.id === studentId), 
    [studentId]
  );

  const calculateJobMatch = useCallback((student: any, job: any): JobMatch => {
    let score = 0;
    const reasons: string[] = [];

    // Skills matching (40% weight)
    const studentSkills = new Set(student.skills.map((s: string) => s.toLowerCase()));
    const jobSkills = job.skills.map((s: string) => s.toLowerCase());
    const matchingSkills = jobSkills.filter((skill: string) => studentSkills.has(skill));
    const skillScore = (matchingSkills.length / jobSkills.length) * 40;
    score += skillScore;
    
    if (skillScore > 20) {
      reasons.push(`Strong skills match (${matchingSkills.length}/${jobSkills.length} skills)`);
    } else if (skillScore > 10) {
      reasons.push(`Good skills match (${matchingSkills.length}/${jobSkills.length} skills)`);
    }

    // Department matching (20% weight)
    if (student.department === job.department) {
      score += 20;
      reasons.push("Perfect department match");
    }

    // Location preference (15% weight)
    const studentLocations = student.preferences.locations.map((l: string) => l.toLowerCase());
    const jobLocation = job.location.toLowerCase();
    if (studentLocations.includes(jobLocation) || job.workMode === "Remote") {
      score += 15;
      reasons.push("Location preference match");
    }

    // Work mode preference (10% weight)
    const studentWorkModes = student.preferences.workMode.map((w: string) => w.toLowerCase());
    const jobWorkMode = job.workMode.toLowerCase();
    if (studentWorkModes.includes(jobWorkMode)) {
      score += 10;
      reasons.push("Work mode preference match");
    }

    // CGPA consideration (10% weight)
    if (student.cgpa >= 8.0) {
      score += 10;
      reasons.push("Strong academic performance");
    } else if (student.cgpa >= 7.0) {
      score += 5;
      reasons.push("Good academic performance");
    }

    // Experience matching (5% weight)
    const studentExperience = new Set(student.experience.map((e: string) => e.toLowerCase()));
    const relevantExperience = jobSkills.filter((skill: string) => studentExperience.has(skill));
    if (relevantExperience.length > 0) {
      score += 5;
      reasons.push("Relevant experience match");
    }

    return {
      score: Math.round(score),
      reasons
    };
  }, []);

  const recommendations = useMemo(() => {
    if (!student) return [];

    return opportunitiesData
      .map(job => {
        const match = calculateJobMatch(student, job);
        return { job, score: match.score, reasons: match.reasons };
      })
      .filter(match => match.score >= 60) // Only show jobs with 60%+ match
      .sort((a, b) => b.score - a.score)
      .slice(0, showCount);
  }, [student, showCount, calculateJobMatch]);

  if (!student) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Student profile not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recommended for You</h3>
          <p className="text-sm text-muted-foreground">
            Jobs matching your skills and preferences
          </p>
        </div>
        
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <Card key={recommendation.job.id} className="relative">
            {index === 0 && (
              <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                Best Match
              </div>
            )}
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{recommendation.job.title}</CardTitle>
                  <CardDescription className="text-base">
                    {recommendation.job.company}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-sm font-medium">{recommendation.score}%</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {recommendation.job.skills.slice(0, 6).map((skill: string) => (
                  <Badge 
                    key={skill} 
                    variant={student.skills.includes(skill) ? "default" : "outline"}
                    className="text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
                {recommendation.job.skills.length > 6 && (
                  <Badge variant="outline" className="text-xs">
                    +{recommendation.job.skills.length - 6} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {recommendation.job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {recommendation.job.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {recommendation.job.applications} applications
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Why this matches:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {recommendation.reasons.slice(0, 3).map((reason, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-lg font-semibold text-gray-900">
                  {recommendation.job.stipend}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-black text-white hover:bg-gray-800 border-black">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recommendations.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground text-center">
              No matching jobs found. Try updating your profile or skills.
            </p>
            <Button variant="outline" className="mt-4 bg-black text-white hover:bg-gray-800 border-black">
              Update Profile
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
