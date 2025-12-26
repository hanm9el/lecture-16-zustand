import { type FormEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import Input from "../common/Input.tsx";
import Button from "../common/Button.tsx";
import { useModalStore } from "../../stores/useModalStore.ts";
import { type TodoType, useTodoStore } from "../../stores/useTodoStore.ts";

type EditTodoFormProps = {
    todo: TodoType;
};

function EditTodoForm({ todo }: EditTodoFormProps) {
    const [text, setText] = useState(todo.text);
    const { closeModal } = useModalStore();
    const { updateTodo } = useTodoStore();

    const onSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (text.trim() === "") return;
        updateTodo(todo.id, text);
        closeModal();
    }

    return (
        <form className={twMerge(["flex", "flex-col", "gap-4"])}
        onSubmit={onSubmit}>
            <div>
                <Input
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                    placeholder={"할 일을 수정하세요"}
                    // autoFocus : 이 input 화면에 출력이 되면 바로 입력 가능하도록 선택 되게 함
                    autoFocus
                />
            </div>
            <div className={twMerge(["flex", "justify-end", "gap-2"])}>
                <Button type={"button"} variant={"outlined"} onClick={closeModal}>취소</Button>
                <Button type={"submit"} variant={"primary"}>저장</Button>
            </div>
        </form>
    );
}

export default EditTodoForm;
