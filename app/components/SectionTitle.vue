<script setup lang="ts">
const { text } = defineProps<{
  text: string;
}>();
</script>

<template>
  <p class="font-geist text-xs text-[#8f8f8f] opacity-60">{{ text.toUpperCase() }}</p>
</template>
