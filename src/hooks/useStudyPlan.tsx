import { useReducer } from "react";

import type { TaskItemProps } from "../components/TaskItem";

export type Subject = TaskItemProps["subject"];
export type StudyPlanFilter = "all" | "pending" | "done";

export type TaskAction =
    | { type: "ADD"; item: TaskItemProps }
    | { type: "STATUS"; id: string }
    | { type: "DELETE"; id: string }
    | { type: "FILTER"; filter: StudyPlanFilter }
    | { type: "ERROR"; error: string };

type StudyPlanState = {
    tasks: TaskItemProps[];
    filter: StudyPlanFilter;
    error: string;
};

const initialState: StudyPlanState = {
    tasks: [],
    filter: "all",
    error: "",
};

function reducerTask(
    state: StudyPlanState,
    action: TaskAction
): StudyPlanState {

    switch (action.type) {

        case "ADD": {

            return {
                ...state,
                tasks: [...state.tasks, action.item],
                error: "",
            };
        }

        case "STATUS": {

            return {
                ...state,
                tasks: state.tasks.map(item =>
                    item.id === action.id
                        ? { ...item, done: !item.done }
                        : item,
                ),
            };
        }

        case "DELETE": {

            return {
                ...state,
                tasks: state.tasks.filter(
                    item => item.id !== action.id
                ),
            };
        }

        case "FILTER": {

            return {
                ...state,
                filter: action.filter,
            };
        }

        case "ERROR": {

            return {
                ...state,
                error: action.error,
            };
        }

        default:
            return state;
    }
}

export const useStudyPlan = () => {

    const [state, dispatchTask] = useReducer(
        reducerTask,
        initialState
    );

    function addTask(title: string, subject: Subject): boolean {

        const cleanTitle = title.trim();

        if (cleanTitle.length < 3) {

            dispatchTask({
                type: "ERROR",
                error: "Escribe un título de al menos 3 caracteres.",
            });

            return false;
        }

        dispatchTask({
            type: "ADD",
            item: {
                id: crypto.randomUUID(),
                title: cleanTitle,
                subject,
                done: false,
            },
        });
        return true;
    }

    function changeStatusTask(id: string) {

        dispatchTask({
            type: "STATUS",
            id,
        });
    }

    function deleteTask(id: string) {

        dispatchTask({
            type: "DELETE",
            id,
        });
    }

    function changeFilter(
        filter: StudyPlanFilter
    ) {

        dispatchTask({
            type: "FILTER",
            filter,
        });
    }

    const filteredTasks = state.tasks.filter(item => {

        if (state.filter === "pending") {
            return !item.done;
        }

        if (state.filter === "done") {
            return item.done;
        }

        return true;
    });

    const total = state.tasks.length;

    const pending = state.tasks.filter(
        item => !item.done
    ).length;

    const completed = state.tasks.filter(
        item => item.done
    ).length;

    return {
        tasks: filteredTasks,
        filter: state.filter,
        error: state.error,
        total,
        pending,
        completed,
        addTask,
        changeStatusTask,
        deleteTask,
        changeFilter,
    };
};