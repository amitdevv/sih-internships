import { enhancedToast } from "@/components/ui/enhanced-toast";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export class AppError extends Error {
  public readonly status?: number;
  public readonly code?: string;
  public readonly details?: any;

  constructor(message: string, status?: number, code?: string, details?: any) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const ErrorCodes = {
  NETWORK_ERROR: "NETWORK_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR",
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

// Error handling utilities
export const handleApiError = (error: any): AppError => {
  // Network errors
  if (!navigator.onLine) {
    return new AppError(
      "You are offline. Please check your internet connection.",
      undefined,
      ErrorCodes.NETWORK_ERROR
    );
  }

  // Fetch errors
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return new AppError(
      "Network error. Please check your connection and try again.",
      undefined,
      ErrorCodes.NETWORK_ERROR
    );
  }

  // HTTP errors
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return new AppError(
          data?.message || "Invalid request. Please check your input.",
          status,
          ErrorCodes.VALIDATION_ERROR,
          data
        );
      case 401:
        return new AppError(
          "You are not authenticated. Please log in again.",
          status,
          ErrorCodes.AUTHENTICATION_ERROR
        );
      case 403:
        return new AppError(
          "You don't have permission to perform this action.",
          status,
          ErrorCodes.AUTHORIZATION_ERROR
        );
      case 404:
        return new AppError(
          "The requested resource was not found.",
          status,
          ErrorCodes.NOT_FOUND_ERROR
        );
      case 408:
        return new AppError(
          "Request timeout. Please try again.",
          status,
          ErrorCodes.TIMEOUT_ERROR
        );
      case 500:
        return new AppError(
          "Internal server error. Please try again later.",
          status,
          ErrorCodes.SERVER_ERROR
        );
      default:
        return new AppError(
          data?.message || `Server error (${status}). Please try again.`,
          status,
          ErrorCodes.SERVER_ERROR,
          data
        );
    }
  }

  // AppError instances
  if (error instanceof AppError) {
    return error;
  }

  // Generic errors
  return new AppError(
    error.message || "An unexpected error occurred. Please try again.",
    undefined,
    ErrorCodes.UNKNOWN_ERROR
  );
};

// Toast error handling
export const showErrorToast = (error: AppError, retryFn?: () => void) => {
  const { message, code } = error;

  switch (code) {
    case ErrorCodes.NETWORK_ERROR:
      enhancedToast.networkError();
      break;
    case ErrorCodes.VALIDATION_ERROR:
      enhancedToast.validationError("input");
      break;
    case ErrorCodes.AUTHENTICATION_ERROR:
      enhancedToast.error("Authentication Required", {
        description: message,
        action: retryFn ? {
          label: "Login",
          onClick: retryFn
        } : undefined
      });
      break;
    case ErrorCodes.AUTHORIZATION_ERROR:
      enhancedToast.error("Access Denied", {
        description: message
      });
      break;
    case ErrorCodes.NOT_FOUND_ERROR:
      enhancedToast.error("Not Found", {
        description: message
      });
      break;
    case ErrorCodes.TIMEOUT_ERROR:
      enhancedToast.errorWithRetry(message, retryFn || (() => window.location.reload()));
      break;
    case ErrorCodes.SERVER_ERROR:
      enhancedToast.errorWithRetry(message, retryFn || (() => window.location.reload()));
      break;
    default:
      enhancedToast.errorWithRetry(message, retryFn);
  }
};

// Async error wrapper
export const withErrorHandling = async <T>(
  asyncFn: () => Promise<T>,
  options?: {
    onError?: (error: AppError) => void;
    showToast?: boolean;
    retryFn?: () => void;
  }
): Promise<T | null> => {
  try {
    return await asyncFn();
  } catch (error) {
    const appError = handleApiError(error);
    
    if (options?.showToast !== false) {
      showErrorToast(appError, options?.retryFn);
    }
    
    if (options?.onError) {
      options.onError(appError);
    }
    
    return null;
  }
};

// Form error handling
export const handleFormError = (error: any) => {
  const appError = handleApiError(error);
  
  if (appError.code === ErrorCodes.VALIDATION_ERROR && appError.details?.fields) {
    // Return field-specific errors for form handling
    return appError.details.fields;
  }
  
  showErrorToast(appError);
  return {};
};

// Retry mechanism
export const withRetry = async <T>(
  asyncFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError!;
};

// Error logging (for production)
export const logError = (error: AppError, context?: string) => {
  if (process.env.NODE_ENV === "production") {
    // In production, you might want to send errors to a logging service
    console.error("Application Error:", {
      message: error.message,
      code: error.code,
      status: error.status,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  } else {
    // In development, log to console
    console.error("Application Error:", error, context);
  }
};
