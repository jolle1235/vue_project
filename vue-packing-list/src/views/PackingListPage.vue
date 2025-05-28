<template>
  <div class="flex justify-end">
    <button @click="addPackingList()" class="add-button">
      <img class="h-10 w-10" src="../assets/icons/add.png" alt="" />
    </button>
  </div>

  <div>
    <PackingListButton
      v-for="list in allLists"
      :key="list.id"
      :listId="list.id"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { usePackingListStore } from "../stores/Data";
import PackingList from "../components/PackingList.vue";
import PackingListButton from "../components/PackingListButton.vue";

export default defineComponent({
  components: {
    PackingList,
    PackingListButton,
  },
  setup() {
    const packingListStore = usePackingListStore();
    const allLists = packingListStore.getAllListsName();

    const addPackingList = () => {
      const listName = prompt("Navn på pakkelisten");
      if (listName) {
        packingListStore.addList(listName);
      }
    };

    return {
      packingListStore,
      addPackingList,
      allLists,
    };
  },
});
</script>
