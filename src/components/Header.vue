<template>
    <div class="py-16">

        <div class="flex items-center justify-center gap-2 mb-12">
            <div class="w-[50px] -rotate-12">
                <img src="../assets/logo.svg" alt="pinia logo">
            </div>
            <h1 class="text-2xl font-bold mt-4 rotate-3 text-slate-500">Task Manager</h1>
        </div>

        <form @submit.prevent="submitHandler" class="flex justify-center gap-2">
            <input v-model.lazy="inputValue" class="min-w-[300px]" type="text" placeholder="I need to...">
            <button
                class="bg-green-500 px-2 text-white font-semibold rounded transition-all shadow hover:shadow-lg hover:shadow-green-300 active:scale-90">{{
                    editState.edit ? "Edit task" : "Add task" }}</button>
        </form>

    </div>
</template>

<script setup>
import { inject } from 'vue';
import { useTaskStore } from '../pinia-store/TaskStore';

// task store
const taskStore = useTaskStore()

// edit state
const editState = inject("editState", {})
const inputValue = inject("inputValue", "")

const submitHandler = () => {
    if (inputValue.value.length && !editState.edit) {
        taskStore.addTask({ id: Date.now(), title: inputValue.value, isFav: false })
    }
    if (inputValue.value.length && editState.edit) {
        taskStore.updateTask(editState.editingItem, inputValue.value)
        editState.edit = false
    }
    inputValue.value = ""
}


</script>
