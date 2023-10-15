<template>
	<div class="bg-gray-100 min-h-screen p-4">

		<Header />

		<div class="max-w-[600px] mx-auto text-right mb-2 space-x-2">

			<button @click="isFav = false"
				:class="!isFav ? 'shadow-lg bg-yellow-400 text-yellow-700 border-yellow-600' : null"
				class="border px-3 py-1 rounded bg-white shadow-sm active:scale-90 hover:shadow-lg hover:bg-yellow-400 hover:text-yellow-700 hover:border-yellow-600">All
				tasks - <span class="font-bold text-black">{{ totalCount }}</span></button>

			<button @click="isFav = true"
				:class="isFav ? 'shadow-lg bg-yellow-400 text-yellow-700 border-yellow-600' : null"
				class="border px-3 py-1 rounded bg-white shadow-sm active:scale-90 hover:shadow-lg hover:bg-yellow-400 hover:text-yellow-700 hover:border-yellow-600">Fav
				tasks - <span class="font-bold text-black">{{ favCount }}</span></button>

		</div>

		<Body @editHandler="editHandler" :tasks="isFav ? favs : tasks" />

	</div>
</template>

<script setup>
import Header from './components/Header.vue';
import Body from './components/Body.vue';
import { useTaskStore } from "./pinia-store/TaskStore"
import { provide, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';

const editState = reactive({
	edit: false,
	editingItem: { id: "", title: "", isFav: false },
})

const isFav = ref(false)
const taskStore = useTaskStore()

let inputValue = ref("")

// getting tasks from LS
taskStore.getTasks()
const { totalCount, favCount, favs, tasks } = storeToRefs(taskStore)

provide("inputValue", inputValue)
provide("editState", editState)

// edit handler
const editHandler = (task) => {
	editState.edit = true
	editState.editingItem = task
	inputValue.value = task.title
}

</script>
