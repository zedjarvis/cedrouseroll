<script setup lang="ts">
const props = defineProps<{
  text: string;
  id?: string;
  as?: "p" | "h2" | "h3";
}>();

const tag = computed(() => props.as ?? "p");
</script>

<template>
  <component
    :is="tag"
    :id="id"
    class="font-geist text-xs text-[#8f8f8f] opacity-60 uppercase tracking-wide"
  >
    {{ text }}
  </component>
</template>
