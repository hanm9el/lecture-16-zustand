import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import Input from "../components/common/Input.tsx";
import Button from "../components/common/Button.tsx";

type SignUpFormValues = {
    userId: string;
    email: string;
    password: string;
    name: string;
};
function SignUp() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<SignUpFormValues>();

    const onSubmit = (data: SignUpFormValues) => {
        // 1. 기존 유저 정보를 가져오고
        const existingUsersJson = localStorage.getItem("mok_users");

        // localStorage의 value는 string 으로 저장됨
        // API를 사용했었던 것 처럼, 사용할 때에는 .json()을 통해 객체 상태로 변환 해줘야 하고
        // 저장할 때에는 객체(또는 배열)를 string으로 변환해서 저장해줘야 함

        const existingUsers: SignUpFormValues[] = existingUsersJson
            ? JSON.parse(existingUsersJson)
            : [];

        // 2. 가져온 데이터와 지금 현재 입력된 정보를 비교해서 이미 존재하는 회원인지 확인
        //    -> 중복이 있으면 사용자에게 중복이 있음을 알리고 끝

        // 중복 체크를 하는 방법은, Array 안에 있는 데이터가 지금 입력된 갑이 있나 없나
        // 확인해야함. 확인은 some(판별하는함수) 메서드를 사용
        // 판별하는 함수: (순회하는요소) => (순회하는 요소의 email이 지금 입력된 data.email과 같거나,
        //                              userId가 지금 입력된 data.userId와 같으면 true를 반환)
        const isDuplicate = existingUsers.some(
            (user) => user.email === data.email || user.userId === data.userId,
        );

        if (isDuplicate) {
            setError("root", {
                message: "이미 등록된 이메일 또는 아이디가 존재합니다.",
            });
            return;
        }

        // 3. 데이터 저장
        //    -> 사용자에게 회원 가입 완료를 안내한 뒤, /sign-in 으로 이동
        // localStorage는 setItem만 존재하므로 덮어쓰기 됨. 따라서, 기존 데이터 + 입력 데이터를 준비
        const newUsers = [...existingUsers, data];
        // 객체(또는 배열)을 string 형식으로 변경하기 : JSON.stringify()
        localStorage.setItem("mok_users", JSON.stringify(newUsers));

        alert("회원 가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
        navigate("/sign-in");
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
                    Sign Up
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={twMerge("space-y-4")}
                >
                    <Input
                        label={"ID"}
                        registration={register("userId", {
                            required: "아이디는 필수값입니다.",
                        })}
                        error={errors.userId}
                        type={"text"}
                        placeholder={"아이디를 입력해주세요."}
                    />
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
                        label={"이름"}
                        registration={register("name", {
                            required: "이름은 필수값입니다.",
                        })}
                        error={errors.name}
                        type={"text"}
                        placeholder={"이름을 입력해주세요 ."}
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

                    <Button fullWidth={true} variant={"warning"}>Create Account</Button>
                </form>
            </div>
        </div>
    );
}
export default SignUp;
