import { defineStore } from "pinia";
import { computed, ComputedRef, ref } from "vue";
import type { PackingList, PackingListItem } from "../types";

const STORAGE_KEY = "packing-lists";

export const usePackingListStore = defineStore("packingList", () => {
  const lists = ref<Record<number, PackingList>>({});
  loadFromStorage();

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lists: lists.value }));
  }

  function loadFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      lists.value = parsed.lists || {};
    }
  }

  function getAllListsName(): ComputedRef<PackingList[]> {
    return computed(() => Object.values(lists.value));
  }

  function addList(name: string) {
    const id = Date.now();
    lists.value[id] = {
      id,
      name,
      items: [],
    };
    saveToStorage();
  }

  function addItemToList(listId: number, itemName: string) {
    const list = lists.value[listId];
    if (list) {
      const newItem: PackingListItem = {
        id: Date.now(),
        name: itemName,
        packed: false,
      };
      list.items.push(newItem);
      saveToStorage();
    }
  }

  function markItemAsPacked(listId: number, itemId: number) {
    const list = lists.value[listId];
    if (list) {
      const item = list.items.find((item) => item.id === itemId);
      if (item) {
        item.packed = !item.packed;
        saveToStorage();
      }
    }
  }

  function removeList(listId: number) {
    delete lists.value[listId];
    saveToStorage();
  }

  return {
    lists,
    addList,
    addItemToList,
    markItemAsPacked,
    removeList,
    loadFromStorage,
    getAllListsName,
  };
});
