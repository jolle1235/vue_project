<template>
  <div class="flex flex-row h-fit p-3 w-full rounded-lg">
    <div
      class="flex flex-col shadow-lg w-full h-fit justify-center items-center bg-green500 rounded-lg p-1.5 hover:-translate-y-1 cursor-pointer"
    >
      <div
        class="flex flex-row justify-between items-center h-fit w-full m-1"
        @click="navigateToList"
      >
        <p class="mx-2 font-bold truncate">
          {{ listName }}
        </p>
        <button class="flex h-6 w-6 cursor-pointer" @click="removeList()">
          <img src="../assets/icons/close.png" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePackingListStore } from "../stores/Data";

export default defineComponent({
  props: {
    listId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const packingListStore = usePackingListStore();
    const router = useRouter();
    const listName = computed(
      () => packingListStore.lists[props.listId]?.name || ""
    );

    // Function to navigate to the list based on the listId prop
    const navigateToList = (): void => {
      router.push(`/packing-list/${props.listId}`);
    };

    const removeList = () => {
      packingListStore.removeList(props.listId);
    };

    return {
      navigateToList,
      listName,
      removeList,
    };
  },
});
</script>
