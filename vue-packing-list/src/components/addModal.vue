<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="flex flex-col gap-2 justify-center items-center bg-bg300 p-2 rounded-lg shadow-lg w-1/2"
    >
      <p>{{ inputText }}</p>
      <input
        class="w-full rounded-md p-2 bg-bg100"
        type="text"
        v-model="outputText"
        placeholder="Tilføj ting til din pakkeliste..."
      />
      <button
        class="bg-primary text-bg100 w-full rounded-md"
        @click="functionToCallWhenOk"
      >
        Tilføj
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { PackingListItem } from "../types/index";
import { usePackingListStore } from "../stores/Data";

export default defineComponent({
  props: {
    inputText: {
      type: String,
      required: true,
    },
    functionToCallWhenOk: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const packingListStore = usePackingListStore();
    const outputText = ref("");

    const functionToCallWhenOk = () => {
      props.functionToCallWhenOk(outputText.value);
    };

    return {
      functionToCallWhenOk,
      outputText,
    };
  },
});
</script>
