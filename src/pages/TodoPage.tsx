import { type FormEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FiPlus } from "react-icons/fi";
import Button from "../components/common/Button.tsx";

function TodoPage() {
    const [input, setInput] = useState("");

    const onSubmit = (event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        // ToDo 저장소에 저장
        setInput(""); // input에 입력된 값을 빈 string으로 바꿔줌
    }
    return (
        <div className={twMerge(["max-w-2xl", "mx-auto", "mt-10", "p-4"])}>
            <h1
                className={twMerge(
                    ["mb-8"],
                    [
                        "text-3xl",
                        "font-bold",
                        "text-center",
                        "text-primary-main",
                    ],
                )}
            >
                My Tasks
            </h1>
            <form className={twMerge(["flex", "gap-2", "mb-8"])} onSubmit={onSubmit}>
                <input
                    value={input}
                    onChange={(event) => {
                        setInput(event.target.value);
                    }}
                    placeholder={"할 일을 입력하세요."}
                    className={twMerge(
                        ["flex-1", "p-3"],
                        [
                            "rounded-lg",
                            "border",
                            "border-divider",
                            "bg-background-paper",
                        ],
                        [
                            "focus:border-primary-main",
                            "focus:border-2",
                            "outline-none",
                        ],
                    )}
                />
                <Button variant={"primary"} className={twMerge("p-3", "py-6.5")}>
                    <FiPlus size={24} /> <span className={twMerge(["hidden", "sm:inline"])}>Add</span>
                </Button>
            </form>
        </div>
    );
}

export default TodoPage;
