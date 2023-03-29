<template>
  <div>
    <section
      class="w-full h-full fixed pt-20 flex top-0 justify-center backdrop-blur-sm z-50"
    >
      <div
        class="w-max px-10 py-10 rounded-xl backdrop-blur-sm justify-center h-max bg-white space-y-4 shadow-lg"
      >
        <button @click="$emit('close')" class="absolute right-5 top-5 text-2xl">
          x
        </button>
        <h2>
          {{ statistics.win == true ? "Congratulations!! " : "" }}Today's word
          was:
          <strong class="uppercase">{{ message }}</strong>
        </h2>

        <h3 class="text-2xl font-bold">Statistics</h3>
        <div class="flex gap-4 lg:gap-20">
          <div class="flex flex-col items-center">
            <strong class="text-2xl">0</strong>
            <span class="text-sm">Played</span>
          </div>
          <div class="flex flex-col items-center">
            <strong class="text-2xl">0</strong>
            <span class="text-sm">Win %</span>
          </div>
          <div class="flex flex-col items-center">
            <strong class="text-2xl">0</strong>
            <span class="text-sm">Current Streak</span>
          </div>
          <div class="flex flex-col items-center">
            <strong class="text-2xl">0</strong>
            <span class="text-sm">Max Streak</span>
          </div>
        </div>
        <hr />
        <h5 class="uppercase font-bold">Guess Distribution</h5>
        <div
          v-for="(attemp, index) in 6"
          :key="attemp"
          class="flex items-center gap-2"
        >
          <strong>{{ index + 1 }}</strong>
          <div
            class="w-5 h-5 bg-message_bg flex items-center justify-center text-white"
            :class="{
              'w-full bg-green-500': statistics.correctAttempt == index,
            }"
          >
            {{ index == statistics.correctAttempt ? 1 : 0 }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
defineProps(["message", "statistics"]);
</script>
