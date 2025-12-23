import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import Input from "../components/common/Input.tsx";
import Button from "../components/common/Button.tsx";
import { useAuthStore, type User } from "../stores/useAuthStore.ts";

interface SignInFormValues {
    email: string;
    password: string;
}

function SignIn() {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<SignInFormValues>();

    const onSubmit = (data: SignInFormValues) => {
        // 1. 로컬스토리지에서 사용자 목록을 조회
        const existingUsersJson = localStorage.getItem("mock_users");
        const existingUsers: User[] = existingUsersJson
            ? JSON.parse(existingUsersJson)
            : [];

        // 2. 그 안에 존재하는 유저(사용자명도 같아야 되고 비밀번호도 같아야되는) 체크
        // array 안에 존재하는지 찾고자 할 때에는 find(찾는조건함수) 메서드 사용
        // find() 메서드는 반환될 때, 있으면 그 요소 자체가 반환되며, 없으면 undefined 반환
        const foundUser = existingUsers.find(
            (user) =>
                user.email === data.email && user.password === data.password,
        );

        if (foundUser) {
            login({
                userId: foundUser.userId,
                email: foundUser.email,
                name: foundUser.name,
                password: foundUser.password,
            });
            navigate("/");
        } else {
            setError("root", {
                message: "이메일 또는 비밀번호가 일치하지 않습니다.",
            });
        }

        // 3. 사용자가 없으면 실패 처리

        // 4. 사용자가 있으면 로그인 처리
    };

    return (
        <div
            className={twMerge(
                ["flex", "flex-col", "justify-center", "items-center"],
                ["p-4", "min-h-[calc(100dvh-4rem)]"],
            )}
        >
            <div
                className={twMerge(
                    ["w-full", "p-8"],
                    [
                        "bg-background-paper",
                        "border",
                        "border-divider",
                        "rounded-xl",
                        "shadow-lg",
                    ],
                )}
            >
                <h2
                    className={twMerge([
                        "text-2xl",
                        "font-bold",
                        "text-center",
                        "text-text-default",
                    ])}
                >
                    Sign In
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={twMerge("space-y-4")}
                >
                    <Input
                        label={"이메일"}
                        registration={register("email", {
                            required: "이메일은 필수값입니다.",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "올바른 이메일 형식이 아닙니다.",
                            },
                        })}
                        error={errors.email}
                        type={"email"}
                        placeholder={"이메일을 입력해주세요"}
                    />

                    <Input
                        label={"비밀번호"}
                        registration={register("password", {
                            required: "비밀번호는 필수값입니다",
                            minLength: {
                                value: 4,
                                message: "비밀번호는 4자 이상이어야 합니다.",
                            },
                        })}
                        error={errors.password}
                        type={"text"}
                        placeholder={"비밀번호를 입력해주세요. "}
                    />

                    {errors.root && (
                        <div
                            className={twMerge([
                                "text-sm",
                                "text-center",
                                "text-error-main",
                            ])}
                        >
                            {errors.root.message}
                        </div>
                    )}

                    <Button fullWidth={true} variant={"warning"}>
                        Log In
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
