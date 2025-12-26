import { useModalStore } from "../../stores/useModalStore.ts";
import { twMerge } from "tailwind-merge";
import { FiX } from "react-icons/fi";

function GlobalModal() {
    const { isOpen, title, content, closeModal } = useModalStore();

    if (!isOpen) return null;

    return (
        <div
            className={twMerge(
                // fixed : position: fixed;
                // 부모를 기준으로 위치를 잡으나, 스크롤을 내리더라도 고정
                // inset-0 : top, right, bottom, left 모두 0
                // -> 부모의 상하좌우 모든 끝에 딱 붙어서 꽉 차게 만드는 역할
                ["fixed", "inset-0", "z-50", "p-4"],
                ["flex", "justify-center", "items-center"],
            )}
        >
            {/* 백드롭 div */}
            {/*
        absolute : position: absolute;
        부모를 기준으로 위치를 잡음. fixed와 달리, 스크롤을 내리면 현재 위치에 존재함
        */}
            <div
                className={twMerge(
                    ["absolute", "inset-0"],
                    ["bg-black/10", "backdrop-blur-xs"],
                )}
                onClick={closeModal}
            />
            {/*실제 모달*/}

            {/*
            relative: position: relative;
            여기에서 relative를 쓴 이유는, z-index 적용하기 위해서
            원래 relative를 적용하는 이유는 absolute나 fixed, sticky라고 하는 녀석이 바라보는 "부모"를 지정하기 위함
            */}
            <div
                className={twMerge(
                    ["relative", "z-20"],
                    ["w-full", "max-w-md", "rounded-xl", "shadow-2xl"],
                    ["border", "border-divider", "bg-background-default"],
                )}
            >
                <div
                    className={twMerge(
                        ["px-6", "py-4"],
                        ["flex", "justify-between", "items-center"],
                        ["border-b", "border-divider"],
                    )}
                >
                    <h3 className={twMerge(["text-lg", "font-bold"])}>
                        {title}
                    </h3>
                    <button
                        onClick={closeModal}
                        className={twMerge([
                            "text-text-disabled",
                            "hover:text-success-main",
                        ])}
                    >
                        <FiX size={20} />
                    </button>
                </div>
                <div className={"p-6"}>{content}</div>
            </div>
        </div>
    );
}

export default GlobalModal;
