import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UseFormValidationOptions<T> {
  schema: any;
  defaultValues?: Partial<T>;
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (error: any) => void;
  redirectOnSuccess?: string;
  successMessage?: string;
}

export function useFormValidation<T extends Record<string, any>>({
  schema,
  defaultValues,
  onSuccess,
  onError,
  redirectOnSuccess,
  successMessage = "Form submitted successfully!"
}: UseFormValidationOptions<T>) {
  const router = useRouter();
  
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
    mode: "onChange"
  });

  const handleSubmit = async (data: T) => {
    try {
      // Show loading state
      toast.loading("Submitting...", { id: "form-submit" });
      
      // Call success handler if provided
      if (onSuccess) {
        await onSuccess(data);
      }
      
      // Show success message
      toast.success(successMessage, { id: "form-submit" });
      
      // Redirect if specified
      if (redirectOnSuccess) {
        router.push(redirectOnSuccess);
      }
      
    } catch (error) {
      console.error("Form submission error:", error);
      
      // Show error message
      toast.error("An error occurred. Please try again.", { id: "form-submit" });
      
      // Call error handler if provided
      if (onError) {
        onError(error);
      }
    }
  };

  const handleError = (errors: any) => {
    const firstError = Object.values(errors)[0] as any;
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit, handleError),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
    reset: form.reset,
    setValue: form.setValue,
    watch: form.watch
  };
}
