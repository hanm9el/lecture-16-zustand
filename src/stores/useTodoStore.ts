import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoType {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoStore {
    todos: TodoType[];
    // ToDo 추가 기능
    // 실행하는 쪽에서 string을 받아서, todos에 객체를 저장하면 끝
    addTodo: (text: string) => void;

    // ToDo 컴플리트 시키는 기능 (토글기능)
    // 실행하는 쪽에서 id string을 받아서, todo의 내용을 업데이트
    toggleTodo: (text: string) => void;

    // ToDo 삭제 기능
    // 실행하는 쪽에서 id string을 받아서, todo를 삭제
    // 삭제라는건 사실 없음. 걔를 제외한 나머지 array를 만들어서 덮어쓰기
    removeTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>()(
    persist(
        (set) => ({
            todos: [],
            addTodo: (text) => set(state =>({
                todos: [...state.todos, {
                    // uuid : 전 세계적으로 고유한 128비트 식별자. 수학적으로 증명됨
                    // 예 : 123e4567-e89b-12d3-a456-426614174000
                    // uuid를 만드는 메소드 : crypto.randomUUID()
                    id: crypto.randomUUID(), // 고유값
                    text: text,
                    completed: false,
                }],
            })),
            toggleTodo: (id:string) => set(state => ({
                // todos = [
                //                 { id: 1, text: "abc", completed: false },
                //                 { id: 2, text: "eee", completed: true },
                //                 { id: 3, text: "eab", completed: false },
                //             ];

                // map()  => 결과는 []
                //
                // 예시) toggleTodo(3);
                //
                // [
                //    { id: 1, text: "abc", completed: false },
                //    { id: 2, text: "eee", completed: true },
                //    { id: 3, text: "eab", completed: true }
                // ]
                todos: state.todos.map((item)=>
                item.id === id ? {...item, completed: !item.completed} :item
                )
            })),
            removeTodo: (id:string) => set(state => ({
                // filter() 메소드
                // Array에서만 사용 가능하며, filter(조건함수) 형식으로 작성해야 하며,
                // 조건함수에 해당되는 것들만 return됨
                todos: state.todos.filter(todo => todo.id !== id)
            })),
        }),
        { name: "todo-storage" },
    ),
);
