import { BrowserRouter, Route, Routes } from "react-router";
import { twMerge } from "tailwind-merge";
import TodoPage from "./pages/TodoPage.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import NavBar from "./components/common/NavBar.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {
    return (
        <BrowserRouter>
            <div
                className={twMerge(
                    ["min-h-dvh"],
                    ["flex", "flex-col"],
                    ["bg-background-default"],
                )}
            >
                <NavBar />
                <main className={twMerge(["flex-1", "mx-auto", "px-4"])}>
                    <Routes>
                        <Route
                            path={"/"}
                            element={
                                <ProtectedRoute>
                                    <TodoPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path={"/sign-in"} element={<SignIn />} />
                        <Route path={"/sign-up"} element={<SignUp />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
