"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/lib/state/ui";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Material Icon component
function Icon({ name, className = "", style }: { name: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`material-symbols-outlined ${className}`} style={style}>{name}</span>
  );
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Sign In Modal Component
function SignInModal({ 
  isOpen, 
  onClose, 
  defaultRole = "student" 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  defaultRole?: "student" | "recruiter" | "mentor" | "placement";
}) {
  const router = useRouter();
  const setGlobalRole = useUIStore((s) => s.setRole);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"student" | "recruiter" | "mentor" | "placement">(defaultRole);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setGlobalRole(role);
    const redirect = role === "mentor" ? "/mentor/reviews" : 
                    role === "placement" ? "/placement/applicants" : 
                    role === "recruiter" ? "/recruiter" : "/dashboard";
    router.push(redirect);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4">
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Icon name="close" className="text-xl" style={{ color: "#5F6368" }} />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-medium mb-2" style={{ color: "#202124" }}>
                  Welcome back
                </h2>
                <p className="text-sm" style={{ color: "#5F6368" }}>
                  Sign in to continue to your dashboard
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: "#202124" }}>
                    College Email
                  </label>
                  <Input 
                    placeholder="name@college.edu" 
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="h-12 rounded-xl border-gray-200 focus:border-[#1a73e8] focus:ring-[#1a73e8]"
                  />
                  {error && (
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: "#202124" }}>
                    I am a
                  </label>
                  <Select value={role} onValueChange={(value) => setRole(value as typeof role)}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                      <SelectItem value="placement">Placement Officer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-base font-medium"
                >
                  Continue
                  <Icon name="arrow_forward" className="text-lg ml-2" />
                </Button>
              </form>

              {/* Footer */}
              <p className="text-center text-xs mt-6" style={{ color: "#5F6368" }}>
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hero Section
function HeroSection({ onOpenSignIn }: { onOpenSignIn: (role?: "student" | "recruiter") => void }) {
  const cards = [
    { icon: "school", label: "Students", desc: "Find & apply to internships", color: "#34a853" },
    { icon: "work", label: "Recruiters", desc: "Post jobs & hire talent", color: "#f39d01" },
    { icon: "person_raised_hand", label: "Mentors", desc: "Guide student careers", color: "#ea4335" },
    { icon: "admin_panel_settings", label: "Placement Officers", desc: "Manage campus drives", color: "#629af6" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
      
      <div className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8 text-center lg:text-left"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight"
                style={{ color: "#202124" }}
              >
                Where talent meets opportunity
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl max-w-lg mx-auto lg:mx-0"
                style={{ color: "#5F6368" }}
              >
                Connecting students, mentors, and employers for seamless internships and placements.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-2"
              >
                <button
                  onClick={() => onOpenSignIn("student")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-[#1a73e8] rounded-xl hover:bg-[#1557b0] transition-all"
                >
                  Get Started
                  <Icon name="arrow_forward" className="text-xl" />
                </button>
                <button
                  onClick={() => onOpenSignIn("recruiter")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <Icon name="business" className="text-xl" />
                  For Recruiters
                </button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto"
            >
              <div className="flex flex-col gap-3">
                {cards.map((card) => (
                  <div
                    key={card.label}
                    style={{ backgroundColor: card.color }}
                    className="rounded-2xl px-5 py-4 shadow-sm cursor-pointer transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/25 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={card.icon} className="text-white text-xl" style={{ fontVariationSettings: "'wght' 500" }} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{card.label}</span>
                        <span className="text-white/80 text-sm">{card.desc}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: "account_circle",
      title: "Create Your Profile",
      description: "Set up your profile with skills, preferences, and experience in minutes",
    },
    {
      number: "02",
      icon: "search",
      title: "Discover Opportunities",
      description: "Browse internships and placements tailored to your interests",
    },
    {
      number: "03",
      icon: "rocket_launch",
      title: "Apply & Connect",
      description: "One-click applications with automated scheduling and real-time updates",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-medium" style={{ color: "#202124" }}>
            Get started in three simple steps
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              className="bg-[#f5f5f5] rounded-2xl p-8"
            >
              <Icon name={step.icon} className="text-2xl mb-5" style={{ color: "#202124" }} />
              <h3 className="text-lg font-medium mb-2" style={{ color: "#202124" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5F6368" }}>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Features Section - Bento Style
function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-medium" style={{ color: "#202124" }}>
            Powerful features for your internship journey
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {/* Large Feature Card - Real-time Application Tracking */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#e8f5e9] rounded-3xl p-8 flex flex-col justify-between min-h-[320px]"
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#34a853] flex items-center justify-center">
                  <Icon name="timeline" className="text-white text-5xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#629af6] flex items-center justify-center">
                  <Icon name="notifications_active" className="text-white text-lg" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-2" style={{ color: "#202124" }}>Real-time Application Tracking</h3>
              <p style={{ color: "#5F6368" }}>Track every application from submission to offer. Get instant status updates, interview schedules, and decision notifications.</p>
            </div>
          </motion.div>

          {/* Right Column - Stacked Cards */}
          <div className="flex flex-col gap-4">
            {/* Smart Opportunity Matching Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#fff3e0] rounded-3xl p-6 flex items-center gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#f39d01] flex items-center justify-center flex-shrink-0">
                <Icon name="auto_awesome" className="text-white text-3xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1" style={{ color: "#202124" }}>Smart Opportunity Matching</h3>
                <p className="text-sm" style={{ color: "#5F6368" }}>AI-powered recommendations based on your skills, interests, and career goals</p>
              </div>
            </motion.div>

            {/* Interview Scheduling Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#e3f2fd] rounded-3xl p-6 flex items-center gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#629af6] flex items-center justify-center flex-shrink-0">
                <Icon name="calendar_month" className="text-white text-3xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1" style={{ color: "#202124" }}>Automated Interview Scheduling</h3>
                <p className="text-sm" style={{ color: "#5F6368" }}>Seamless calendar sync with reminders for students, recruiters, and mentors</p>
              </div>
            </motion.div>

            {/* Mentor Connect Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#fce4ec] rounded-3xl p-6 flex items-center gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#ea4335] flex items-center justify-center flex-shrink-0">
                <Icon name="groups" className="text-white text-3xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1" style={{ color: "#202124" }}>Mentor & Placement Support</h3>
                <p className="text-sm" style={{ color: "#5F6368" }}>Connect with industry mentors and placement officers for career guidance</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection({ onOpenSignIn }: { onOpenSignIn: () => void }) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl font-medium"
            style={{ color: "#202124" }}
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            style={{ color: "#5F6368" }}
          >
            Join thousands of students and employers already using our platform
          </motion.p>
          <motion.div variants={fadeInUp} className="pt-2 space-y-3">
            <button
              onClick={onOpenSignIn}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-white bg-[#1a73e8] rounded-xl hover:bg-[#1557b0] transition-all"
            >
              Sign Up Free
              <Icon name="arrow_forward" className="text-xl" />
            </button>
            <p className="text-sm" style={{ color: "#5F6368" }}>
              No credit card required. Get started in minutes.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Landing Page
export default function LandingPage() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [defaultRole, setDefaultRole] = useState<"student" | "recruiter">("student");

  const handleOpenSignIn = (role: "student" | "recruiter" = "student") => {
    setDefaultRole(role);
    setIsSignInOpen(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12">
      {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,500,0,0&display=swap"
        rel="stylesheet"
      />
      
      <HeroSection onOpenSignIn={handleOpenSignIn} />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection onOpenSignIn={() => handleOpenSignIn("student")} />
      
      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
        defaultRole={defaultRole}
      />
    </div>
  );
}
