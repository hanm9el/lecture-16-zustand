//이미 react에서 사용하고 있는 input 태그의 타입을
//상속받아서 내가 지정하지 않고도, input과 동일하게 동작하도록 하기 위해

//InputHTMLAttributes<HTMLInputElement> : input 태그의 attribute를 모두 담고 있는 타입
import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    //react-hook-form의 register() 리턴값을 통째로 받기 위한 Props
    registration?:Partial<UseFormRegisterReturn>
    error?: FieldError;
}

// label, registration, error는 특정 지어서 뽑아서 사용할 목적으로 명시해주었고
// 그 외의 나머지 props들은 props라고 하는 변수로 사용 가능
function Input({ label, registration, error, className, ...props }: InputProps) {
    return (
        <div>
            {label && (
                <label
                    className={twMerge([
                        "block",
                        "text-xm",
                        "font-medium",
                        "mb-1",
                    ])}
                >
                    {label}
                </label>
            )}
            <input
                {...registration}
                className={twMerge(
                    ["w-full", "p-2"],
                    ["border", "border-divider", "outline-none"],
                    ["bg-background-default", "text-text-default"],
                    "transition-all",
                    error && ["border-error-main"],
                    className,
                )}
                {...props}
            />
            {error && (
                <p className={twMerge(["text-xs", "text-error-main", "mt-1"])}>
                    {error.message}
                </p>
            )}
        </div>
    );
}
export default Input;
