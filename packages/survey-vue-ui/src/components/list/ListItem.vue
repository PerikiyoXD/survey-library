<template>
  <li
    tabindex="0"
    role="option"
    :aria-selected="model.isItemSelected(item)"
    v-show="model.isItemVisible(item)"
    :key="item.id"
    :id="elementId"
    v-bind:class="model.getItemClass(item)"
    v-on:click="click"
    v-key2click
  >
    <div
      v-if="item.needSeparator"
      v-bind:class="model.cssClasses.itemSeparator"
    ></div>

    <div
      :style="{ paddingInlineStart: model.getItemIndent(item) }"
      v-bind:class="model.cssClasses.itemBody"
    >
      <sv-svg-icon
        v-if="item.iconName && !item.component"
        v-bind:class="model.cssClasses.itemIcon"
        :iconName="item.iconName"
        :size="24"
      ></sv-svg-icon>
      <survey-string v-if="!item.component" :locString="item.locTitle" />
      <component v-if="item.component" :is="item.component" :item="item">
      </component>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { useBase } from "@/base";
import type { ListModel, Action, IAction } from "survey-core";
import { computed, onMounted } from "vue";

const props = defineProps<{ model: ListModel; item: Action }>();

const elementId = computed(() => (props.item as IAction).elementId);
const click = (event: any) => {
  props.model.onItemClick(props.item as any);
  event.stopPropagation();
};

useBase(() => props.item);

onMounted(() => {
  setTimeout(() => {
    props.model.onLastItemRended(props.item as any);
  });
});
</script>
