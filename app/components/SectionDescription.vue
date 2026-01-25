<script setup lang="ts">
const { text } = defineProps<{
  text: string;
}>();
</script>

<template>
  <p class="text-[#8f8f8f] tracking-wide leading-6">
    {{ text }}
  </p>
</template>
