"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, X, Plus } from "lucide-react";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, required, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

interface FormInputProps extends React.ComponentProps<typeof Input> {
  label: string;
  error?: string;
  required?: boolean;
}

export function FormInput({ label, error, required, className, ...props }: FormInputProps) {
  return (
    <FormField label={label} error={error} required={required}>
      <Input 
        className={cn(error && "border-destructive focus-visible:ring-destructive", className)}
        {...props} 
      />
    </FormField>
  );
}

interface FormTextareaProps extends React.ComponentProps<typeof Textarea> {
  label: string;
  error?: string;
  required?: boolean;
}

export function FormTextarea({ label, error, required, className, ...props }: FormTextareaProps) {
  return (
    <FormField label={label} error={error} required={required}>
      <Textarea 
        className={cn(error && "border-destructive focus-visible:ring-destructive", className)}
        {...props} 
      />
    </FormField>
  );
}

interface FormSelectProps {
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function FormSelect({ 
  label, 
  error, 
  required, 
  placeholder, 
  value, 
  onValueChange, 
  children 
}: FormSelectProps) {
  return (
    <FormField label={label} error={error} required={required}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={cn(error && "border-destructive focus:ring-destructive")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
    </FormField>
  );
}

interface FormSkillsInputProps {
  label: string;
  error?: string;
  required?: boolean;
  skills: string[];
  availableSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  maxSkills?: number;
}

export function FormSkillsInput({ 
  label, 
  error, 
  required, 
  skills, 
  availableSkills, 
  onSkillsChange,
  maxSkills = 10 
}: FormSkillsInputProps) {
  const [selectedSkill, setSelectedSkill] = React.useState("");

  const addSkill = () => {
    if (selectedSkill && !skills.includes(selectedSkill) && skills.length < maxSkills) {
      onSkillsChange([...skills, selectedSkill]);
      setSelectedSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    onSkillsChange(skills.filter(s => s !== skill));
  };

  const filteredSkills = availableSkills.filter(skill => !skills.includes(skill));

  return (
    <FormField label={label} error={error} required={required}>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Select value={selectedSkill} onValueChange={setSelectedSkill}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a skill" />
            </SelectTrigger>
            <SelectContent>
              {filteredSkills.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" onClick={addSkill} variant="outline" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        <p className="text-xs text-muted-foreground">
          {skills.length}/{maxSkills} skills selected
        </p>
      </div>
    </FormField>
  );
}

interface FormErrorMessageProps {
  error?: string;
  className?: string;
}

export function FormErrorMessage({ error, className }: FormErrorMessageProps) {
  if (!error) return null;
  
  return (
    <div className={cn("flex items-center gap-1 text-sm text-destructive", className)}>
      <AlertCircle className="h-3 w-3" />
      <span>{error}</span>
    </div>
  );
}
