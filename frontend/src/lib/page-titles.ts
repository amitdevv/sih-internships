// Page title utility for dynamic page titles

export const getPageTitle = (pathname: string, role?: string | null): string => {
  const baseTitle = "College Internship Management System";
  
  // Remove leading slash and split path
  const path = pathname.replace(/^\//, '').split('/');
  
  // Handle root path
  if (pathname === '/' || pathname === '') {
    return role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard - ${baseTitle}` : `Dashboard - ${baseTitle}`;
  }
  
  // Handle auth pages
  if (path[0] === 'sign-in') {
    return `Sign In - ${baseTitle}`;
  }
  
  // Handle onboarding pages
  if (path[0] === 'profile') {
    return `Profile Setup - ${baseTitle}`;
  }
  if (path[0] === 'skills') {
    return `Skills Setup - ${baseTitle}`;
  }
  if (path[0] === 'preferences') {
    return `Preferences Setup - ${baseTitle}`;
  }
  if (path[0] === 'mentor') {
    return `Mentor Onboarding - ${baseTitle}`;
  }
  
  // Handle analytics pages
  if (path[0] === 'analytics') {
    if (path[1] === 'student') {
      return `Student Analytics - ${baseTitle}`;
    }
    if (path[1] === 'mentor') {
      return `Mentor Analytics - ${baseTitle}`;
    }
    if (path[1] === 'placement') {
      return `Placement Analytics - ${baseTitle}`;
    }
    if (path[1] === 'recruiter') {
      return `Recruiter Analytics - ${baseTitle}`;
    }
    return `Analytics - ${baseTitle}`;
  }
  
  // Handle opportunities
  if (path[0] === 'opportunities') {
    if (path[1]) {
      return `Job Opportunity - ${baseTitle}`;
    }
    return `Job Opportunities - ${baseTitle}`;
  }
  
  // Handle applications
  if (path[0] === 'applications') {
    if (path[1]) {
      return `Application Details - ${baseTitle}`;
    }
    return `My Applications - ${baseTitle}`;
  }
  
  // Handle certificates
  if (path[0] === 'certificates') {
    return `Certificates - ${baseTitle}`;
  }
  
  // Handle interviews
  if (path[0] === 'interviews') {
    return `Interviews - ${baseTitle}`;
  }
  
  // Handle mentor pages
  if (path[0] === 'mentor') {
    if (path[1] === 'reviews') {
      return `Mentor Reviews - ${baseTitle}`;
    }
    return `Mentor Dashboard - ${baseTitle}`;
  }
  
  // Handle placement pages
  if (path[0] === 'placement') {
    if (path[1] === 'applicants') {
      return `Placement Applicants - ${baseTitle}`;
    }
    if (path[1] === 'opportunities') {
      if (path[2] === 'new') {
        return `Post New Opportunity - ${baseTitle}`;
      }
      return `Placement Opportunities - ${baseTitle}`;
    }
    return `Placement Dashboard - ${baseTitle}`;
  }
  
  // Handle recruiter pages
  if (path[0] === 'recruiter') {
    if (path[1] === 'jobs') {
      if (path[2] === 'new') {
        return `Post New Job - ${baseTitle}`;
      }
      return `Recruiter Jobs - ${baseTitle}`;
    }
    if (path[1] === 'applications') {
      return `Recruiter Applications - ${baseTitle}`;
    }
    if (path[1] === 'interviews') {
      return `Recruiter Interviews - ${baseTitle}`;
    }
    if (path[1] === 'reviews') {
      return `Recruiter Reviews - ${baseTitle}`;
    }
    return `Recruiter Dashboard - ${baseTitle}`;
  }
  
  // Handle settings
  if (path[0] === 'settings') {
    return `Settings - ${baseTitle}`;
  }
  
  // Default fallback
  return baseTitle;
};

// Hook for client-side title updates
export const usePageTitle = (title: string) => {
  if (typeof window !== 'undefined') {
    document.title = title;
  }
};
