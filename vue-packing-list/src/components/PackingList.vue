<template>
  <p>Du er på packingList siden</p>
  <button @click="openAddItemDialog()">
    <img src="../assets/icons/add.png" />
  </button>
  <div>
    <div v-for="item in packinglistItemList" :key="item.id">
      <p>{{ item.name }}</p>
    </div>
  </div>
  <div v-if="showAddItemDialog">
    <addModal
      inputText="Hvad vil du tilføje?"
      :functionToCallWhenOk="closeDialogAndAddItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { PackingListItem } from "../types/index";
import { usePackingListStore } from "../stores/Data";
import addModal from "./addModal.vue";

export default defineComponent({
  components: {
    addModal,
  },
  props: {
    listId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const showAddItemDialog = ref(false);
    const packingListStore = usePackingListStore();
    packingListStore.setCurrentList(props.listId);
    let packinglistItemList: PackingListItem[] = [];

    const pakcingListId = packingListStore.currentList;
    if (packingListStore.currentList?.items != null) {
      packinglistItemList = packingListStore.currentList?.items;
    }

    const addItem = (name: string) => {
      packingListStore.addItemToList(props.listId, name);
    };

    const openAddItemDialog = () => {
      showAddItemDialog.value = !showAddItemDialog.value;
    };

    const closeDialogAndAddItem = (name: string) => {
      addItem(name);
      showAddItemDialog.value = false;
    };

    return {
      pakcingListId,
      packinglistItemList,
      addItem,
      openAddItemDialog,
      showAddItemDialog,
      closeDialogAndAddItem,
    };
  },
});
</script>
