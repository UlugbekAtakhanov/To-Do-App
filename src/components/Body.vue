<template>
    <transition name="switch" mode="out-in">
        <div v-if="tasks.length">
            <transition-group tag="div" name="list" class="overflow-hidden relative max-w-[600px] w-full mx-auto" appear>
                <div
                    v-for="task in tasks"
                    :key="task.id"
                    class="bg-white w-full shadow-sm hover:shadow-md transition-all mb-2 rounded p-4 flex justify-between items-center"
                >
                    <p class="text-lg font-bold text-slate-700 first-letter:capitalize">
                        {{ task.title }}
                    </p>

                    <div class="flex items-center gap-2">
                        <PencilSquareIcon @click="$emit('editHandler', task)" class="w-6 cursor-pointer hover:stroke-blue-500" />

                        <HeartIcon
                            @click="taskStore.toggleFav(task.id)"
                            class="w-6 cursor-pointer hover:stroke-red-500"
                            :class="task.isFav ? 'fill-red-500 stroke-red-500' : null"
                        />

                        <TrashIcon @click="taskStore.deleteTask(task.id)" class="w-6 cursor-pointer hover:stroke-green-500" />
                    </div>
                </div>
            </transition-group>
        </div>
        <div v-else class="text-xl font-semibold max-w-[600px] w-full mx-auto">No tasks to do..</div>
    </transition>
</template>

<script setup>
    import { HeartIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline";
    import { useTaskStore } from "../pinia-store/TaskStore";

    const taskStore = useTaskStore();

    const { tasks } = defineProps({
        tasks: { type: Array, required: true, default: [] },
    });
</script>

<style scoped>
    .list-enter-from {
        opacity: 0;
        transform: translateY(-50px);
    }
    .list-enter-active {
        transition: all 0.2s ease;
    }
    .list-leave-to {
        opacity: 0;
        transform: translateX(200px);
    }
    .list-leave-active {
        transition: all 0.5s ease;
        position: absolute;
    }
    .list-move {
        transition: all 0.4s ease;
    }

	/* switch transition */
    .switch-enter-from,
    .switch-leave-to {
        opacity: 0;
        transform: translateY(50px);
    }
    .switch-enter-active,
    .switch-leave-active {
        transition: all 0.5s ease;
    }
</style>
