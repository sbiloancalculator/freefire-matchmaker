
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={cn("font-bold", sizes[size], className)}>
      <span className="text-primary">Fire</span>
      <span className="text-foreground">Tourney</span>
    </div>
  );
};
