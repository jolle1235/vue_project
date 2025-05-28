import { defineStore } from "pinia";
import type { PackingList, PackingListItem } from "../types/index";

const STORAGE_KEY = "packing-lists";

export const usePackingListStore = defineStore("packingList", {
  state: (): { lists: PackingList[]; currentList: PackingList | null } => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState
      ? JSON.parse(savedState)
      : {
          lists: [],
          currentList: null,
        };
  },
  actions: {
    addList(name: string) {
      const newList: PackingList = {
        id: Date.now(),
        name,
        items: [],
      };
      this.lists.push(newList);
      this.saveToStorage();
    },
    addItemToList(listId: number, itemName: string) {
      const list = this.lists.find((list: PackingList) => list.id === listId);
      if (list) {
        const newItem: PackingListItem = {
          id: Date.now(),
          name: itemName,
          packed: false,
        };
        list.items.push(newItem);
        this.saveToStorage();
      }
    },
    markItemAsPacked(listId: number, itemId: number) {
      const list = this.lists.find((list: PackingList) => list.id === listId);
      if (list) {
        const item = list.items.find(
          (item: PackingListItem) => item.id === itemId
        );
        if (item) {
          item.packed = !item.packed;
          this.saveToStorage();
        }
      }
    },
    setCurrentList(listId: number) {
      this.currentList =
        this.lists.find((list: PackingList) => list.id === listId) || null;
      this.saveToStorage();
    },
    removeList(listId: number) {
      this.lists = this.lists.filter((list) => list.id !== listId);
      if (this.currentList?.id === listId) {
        this.currentList = null;
      }
      this.saveToStorage();
    },
    saveToStorage() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          lists: this.lists,
          currentList: this.currentList,
        })
      );
    },
  },
});
