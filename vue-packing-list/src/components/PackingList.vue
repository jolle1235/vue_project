<template>
  <div v-if="list">
    <button class="add-button" @click="openAddItemDialog()">
      <img src="../assets/icons/add.png" />
    </button>
    <div v-for="item in list.items" :key="item.id">
      {{ item.name }}
    </div>
    <div v-if="showAddItemDialog">
      <addModal
        inputText="Hvad vil du tilføje?"
        :functionToCallWhenOk="closeDialogAndAddItem"
      />
    </div>
  </div>
  <div v-else>
    <p>Liste ikke fundet</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import { PackingListItem } from "../types/index";
import { usePackingListStore } from "../stores/Data";
import addModal from "./addModal.vue";

export default defineComponent({
  components: {
    addModal,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const showAddItemDialog = ref(false);
    const packingListStore = usePackingListStore();
    const listId = Number(props.id);
    const list = computed(() => packingListStore.lists[listId]);

    const addItem = (name: string) => {
      packingListStore.addItemToList(listId, name);
    };

    const openAddItemDialog = () => {
      showAddItemDialog.value = !showAddItemDialog.value;
    };

    const closeDialogAndAddItem = (name: string) => {
      addItem(name);
      showAddItemDialog.value = false;
    };

    return {
      packingListStore,
      list,
      addItem,
      openAddItemDialog,
      showAddItemDialog,
      closeDialogAndAddItem,
    };
  },
});
</script>
