import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    fullWidth?: boolean;
    variant?: "primary" | "secondary" | "outlined" | "success" | "error" | "warning" | "info";
}

function Button({ className, fullWidth, variant = "primary", ...props }: ButtonProps) {
    return (
        <button
            className={twMerge(
                ["h-10", "px-4", "py-2"],
                fullWidth && ["w-full"],
                ["flex", "justify-center", "items-center"],
                ["rounded-md", "text-sm", "font-medium"],
                ["transition"],
                variant === "primary" && [
                    "bg-primary-main",
                    "text-primary-contrastText",
                    "hover:bg-primary-dark",
                ],
                variant === "secondary" && [
                    "bg-secondary-main",
                    "text-secondary-contrastText",
                    "hover:bg-secondary-dark",
                ],
                variant === "success" && [
                    "bg-success-main",
                    "text-success-contrastText",
                    "hover:bg-success-dark",
                ],
                variant === "error" && [
                    "bg-error-main",
                    "text-error-contrastText",
                    "hover:bg-error-dark",
                ],
                variant === "warning" && [
                    "bg-warning-main",
                    "text-warning-contrastText",
                    "hover:bg-warning-dark",
                ],
                variant === "info" && [
                    "bg-info-main",
                    "text-info-contrastText",
                    "hover:bg-info-dark",
                ],
                variant === "outlined" && ["border", "border-divider"],
                className,
            )}
            {...props}
        />
    );
}

export default Button;
