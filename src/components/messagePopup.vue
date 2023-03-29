<template>
  <div class="absolute top-44 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-message_bg text-white">
    {{ message }}
  </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, defineEmits } from "vue";
defineProps(["message"]);
const emits = defineEmits(["close"]);
onMounted(() => {
  setTimeout(() => {
    emits("close");
  }, 1000);
});
</script>
