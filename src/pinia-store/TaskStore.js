import { defineStore } from "pinia";
import { getFromLS, setToLS } from "../utils/handleLS";

export const useTaskStore = defineStore("taskStore", {
    state: () => ({
        tasks: [],
    }),

    getters: {
        favs() {
            return this.tasks.filter((item) => item.isFav);
        },
        favCount() {
            return this.tasks.reduce((total, current) => {
                return current.isFav ? total + 1 : total;
            }, 0);
        },
        totalCount() {
            return this.tasks.length;
        },
    },

    actions: {
        getTasks() {
            this.tasks = getFromLS("tasks") ?? [];
        },

        addTask(task) {
            this.tasks.unshift(task);
            let data = getFromLS("tasks");
            data = data ? [...data, task] : [task];
            setToLS("tasks", data);
        },

        deleteTask(id) {
            this.tasks = this.tasks.filter((item) => item.id !== id);
            let data = getFromLS("tasks");
            if (data) {
                const newArr = data.filter((item) => item.id !== id);
                setToLS("tasks", newArr);
            }
        },

        updateTask(currentTask, newTitle) {
            const task = this.tasks.find((item) => item.id === currentTask.id);
            if (task) {
                task.title = newTitle;
            }

            const dataFromLS = getFromLS("tasks");
            const newArr = dataFromLS.map((data) => {
                if (data.id === currentTask.id) {
                    data.title = newTitle;
                }
                return data;
            });
            setToLS("tasks", newArr);
        },

        toggleFav(id) {
            const task = this.tasks.find((item) => item.id === id);
            task.isFav = !task.isFav;

            const dataFromLS = getFromLS("tasks");
            const newArr = dataFromLS.map((data) => {
                if (data.id === id) {
                    data.isFav = !data.isFav;
                }
                return data;
            });
            setToLS("tasks", newArr);
        },
    },
});
