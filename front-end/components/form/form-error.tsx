interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return <div className={`text-sm text-destructive ${className ?? ''}`}>{message}</div>;
}
