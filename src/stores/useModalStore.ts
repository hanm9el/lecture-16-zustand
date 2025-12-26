import type { ReactNode } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModalStore {
    isOpen: boolean;
    title: string;
    content: ReactNode;

    // openModal이 실행되면, isOpen은 내부적으로 그냥 값을 바꿔주면 되고
    //                     title과 content는 실행하는 외부에서 받아야함
    openModal: (title: string, content: ReactNode) => void;

    // closeModal이 실행되면, isOpen은 내부적으로 값을 바꿔주면 됨. 매개변수 필요X
    closeModal: () => void;
}

export const useModalStore = create<ModalStore>()(
    persist(
        (set) => ({
            isOpen: false,
            title: "",
            content: null,
            openModal: (title, content) =>
                set({ isOpen: true, title, content }),
            closeModal: () => set({ isOpen: false, title: "", content: null }),
        }),
        { name: "modalStore" },
    ),
);
