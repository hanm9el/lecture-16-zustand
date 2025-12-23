import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
    isDark: boolean;
    // 밑에꺼를 toggleTheme: () => void 이렇게 써도 됨 같은거임
    toggleTheme: VoidFunction
}
// create() 를 실행하면, 함수가 리턴이 되고 그걸 또 다시 실행하기 때문에 소괄호가 2번
export const useThemeStore = create<ThemeStore>()(
    // 저장소 초기값 저장
    persist(
        set => ({
            isDark: false,
            // toggleTheme를 실행하면, 저장소 값을 바꾸는데
            // 지금 현재 값을 받아서 그 중 isDark의 값을 현재 값으 반대로 저장해라
            toggleTheme: () => set(state => ({ isDark: !state.isDark })),
        }),
        {name: "theme-storage"},
    )
)