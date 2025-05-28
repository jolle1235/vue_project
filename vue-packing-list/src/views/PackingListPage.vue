<template>
  <div class="flex justify-end">
    <button
      @click="addPackingList()"
      class="bg-green500 shadow-lg rounded-lg p-2 absolute bottom-0 right-0 m-5"
    >
      <img class="h-10 w-10" src="../assets/icons/add.png" alt="" />
    </button>
  </div>
  <div>
    <PackingListButton
      v-for="list in packingListStore.lists"
      :key="list.id"
      :listId="list.id"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { usePackingListStore } from "../stores/Data";
import PackingList from "../components/PackingList.vue";
import PackingListButton from "../components/PackingListButton.vue";

export default defineComponent({
  components: {
    PackingList,
    PackingListButton,
  },
  setup() {
    const route = useRoute();
    const packingListStore = usePackingListStore();

    const addPackingList = () => {
      const listName = prompt("Navn på pakkelisten");
      if (listName) {
        packingListStore.addList(listName);
      }
    };

    return {
      PackingList,
      packingListStore,
      addPackingList,
    };
  },
});
</script>
