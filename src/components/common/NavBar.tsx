import { twMerge } from "tailwind-merge";
import { Link } from "react-router";
import { useThemeStore } from "../../stores/useThemeStore.ts";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore.ts";
import Button from "./Button.tsx";

function NavBar() {
    const { isDark, toggleTheme } = useThemeStore();
    const { isAuthenticated, user, logout } = useAuthStore();

    useEffect(() => {
        const html = document.documentElement;
        if (isDark) html.classList.add("dark");
        else html.classList.remove("dark");
    }, [isDark]);

    // sticky : 스크롤을 내리더라도 그 자리에 계속 존재하라는 tailwind 클래스
    // top-0 : 부모를 기준 잡아, 부모 상단에서 0px 위치에 존재
    // z-index : z-index 레이어
    return (
        <header
            className={twMerge(
                ["sticky", "top-0", "z-10"],
                ["w-full", "h-16", "px-6"],
                ["flex", "justify-between", "items-center"],
                ["bg-background-paper", "border-b", "border-divider"],
            )}
        >
            <Link
                to={"/"}
                className={twMerge(
                    ["text-xl", "font-bold", "text-primary-main"],
                    "hover: text-primary-dark",
                    "transition-colors",
                )}
            >
                MyTodo
            </Link>
            <div className={twMerge(["flex", "items-center", "gap-2"])}>
                <button
                    onClick={toggleTheme}
                    className={twMerge(
                        ["p-2"],
                        ["rounded-full", "transition"],
                        ["hover:bg-divider"],
                    )}
                >
                    {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
                {isAuthenticated ? (
                    <>
                        <span
                            className={twMerge([
                                /* hidden 클래스 : display: hidden; sm: block 클래스 :
                        화면의 크기가 640px을 넘어가면 display:block ; 적용*/
                                "text-sm",
                                "sm:text-lg",
                                "font-medium",
                                "hidden",
                                "sm:block",
                            ])}
                        >
                            {user?.name}
                        </span>
                        <Button variant={"error"} onClick={() => logout()}>
                            <FiLogOut /> Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link
                            to={"/sign-in"}
                            className={twMerge(
                                ["px-3", "py-2"],
                                ["text-sm", "font-medium"],
                                "hover:text-primary-main",
                            )}
                        >
                            Sign In
                        </Link>
                        <Link
                            to={"/sign-up"}
                            className={twMerge(
                                ["px-3", "py-2"],
                                [
                                    "text-sm",
                                    "font-medium",
                                    "text-primary-contrastText",
                                ],
                                [
                                    "bg-primary-main",
                                    "rounded-md",
                                    "hover:bg-primary-dark",
                                ],
                                "transition-colors",
                            )}
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default NavBar;
