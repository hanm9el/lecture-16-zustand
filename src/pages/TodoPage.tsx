import { type FormEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FiCheck, FiPlus, FiTrash2 } from "react-icons/fi";
import Button from "../components/common/Button.tsx";
import { useTodoStore } from "../stores/useTodoStore.ts";

function TodoPage() {
    const [input, setInput] = useState("");
    const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // string타입에서 사용할 수 있는 메소드 중 .trim()
        // trim() : 문자열 양쪽 긑의 공백을 제거
        if (input.trim() === "") return;
        addTodo(input.trim());
        setInput(""); // input에 입력된 값을 빈 string으로 바꿔줌
    };
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
            <form
                className={twMerge(["flex", "gap-2", "mb-8"])}
                onSubmit={onSubmit}
            >
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
                <Button
                    variant={"primary"}
                    className={twMerge("p-3", "py-6.5")}
                >
                    <FiPlus size={24} />{" "}
                    <span className={twMerge(["hidden", "sm:inline"])}>
                        Add
                    </span>
                </Button>
            </form>

            <div className={"space-y-3"}>
                {todos.length === 0 && (
                    <p
                        className={twMerge([
                            "mt-10",
                            "text-center",
                            "text-text-disabled",
                        ])}
                    >
                        할 일이 없습니다. 새로 추가해보세요!
                    </p>
                )}
                {todos.map((item, index) => (
                    <div
                        key={index}
                        className={twMerge(
                            ["p-4", "bg-background-paper"],
                            ["flex", "justify-between", "items-center"],
                            [
                                "border",
                                "border-divider",
                                "shadow-sm",
                                "rounded-lg",
                            ],
                            item.completed && "opacity-60",
                        )}
                    >
                        <div
                            className={twMerge([
                                "flex",
                                "items-center",
                                "gap-3",
                                "overflow-hidden",
                            ])}
                        >
                            <button
                                onClick={() => toggleTodo(item.id)}
                                className={twMerge(
                                    ["w-6", "h-6"],
                                    ["flex", "justify-center", "items-center"],
                                    ["border-2", "rounded-full"],
                                    item.completed
                                        ? [
                                              "bg-success-main",
                                              "border-success-dark",
                                              "text-success-contrastText",
                                          ]
                                        : [
                                              "border-divider",
                                              "hover:border-primary-main",
                                          ],
                                )}
                            >
                                {item.completed && <FiCheck size={14} />}
                            </button>
                            <span
                                className={twMerge(
                                    ["text-lg", "truncate", "flex-1"],
                                    item.completed && ["line-through"],
                                )}
                            >
                                {item.text}
                            </span>
                        </div>
                        <button
                            onClick={() => removeTodo(item.id)}
                            className={twMerge(
                                ["text-text-disabled", "hover:text-error-main"],
                                ["transition-colors", "duration-500"],
                            )}
                        >
                            <FiTrash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoPage;
