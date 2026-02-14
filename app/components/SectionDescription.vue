<script setup lang="ts">
defineProps<{
  text: string;
  id?: string;
  as?: "p" | "div" | "span";
}>();
</script>

<template>
  <component
    :is="as ?? 'p'"
    :id="id"
    class="text-[#8f8f8f] tracking-wide leading-6"
  >
    {{ text }}
  </component>
</template>
