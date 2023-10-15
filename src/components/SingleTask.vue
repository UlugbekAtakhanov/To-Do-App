<template>
    <div
        class="bg-white max-w-[600px] shadow-sm hover:shadow-md transition-all mx-auto mb-2 rounded p-4 flex justify-between items-center">
        <p class="text-lg font-bold text-slate-700 first-letter:capitalize">{{ task.title }}</p>
        <div class="flex items-center gap-2">
            <PencilSquareIcon @click="$emit('editHandler', task)" class="w-6 cursor-pointer hover:stroke-blue-500" />

            <HeartIcon @click="taskStore.toggleFav(task.id)" class="w-6 cursor-pointer  hover:stroke-red-500"
                :class="task.isFav ? 'fill-red-500 stroke-red-500' : null" />

            <TrashIcon @click="taskStore.deleteTask(task.id)" class="w-6 cursor-pointer  hover:stroke-green-500" />
        </div>
    </div>
</template>

<script setup>
import { HeartIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline"
import { useTaskStore } from "../pinia-store/TaskStore";

const taskStore = useTaskStore()

const { task } = defineProps({
    task: { type: Object, required: true, default: {} }
})

</script>
