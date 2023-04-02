<template>
  <section
    class="w-full h-full fixed flex pt-20 top-0 justify-center backdrop-blur-sm z-50"
  >
    <div
      class="w-max p-10 rounded-xl backdrop-blur-sm justify-center h-max bg-white dark:bg-key_dark_bg space-y-4 shadow-lg"
    >
      <div>
        <button @click="$emit('close')" class="absolute right-5 top-5 text-2xl">
          x
        </button>
        <h3 class="text-4xl font-bold dark:text-white">How To Play</h3>
        <span class="font-light">Guess the Wordle in 6 tries.</span>
      </div>
      <ul class="list-disc">
        <li>Each guess must be valid 5-letter word.</li>
        <li>
          The color of the tiles will change to show how close your guess was to
          the word.
        </li>
      </ul>
      <hr />
      <div class="space-y-4">
        <h5 class="font-semibold">Examples</h5>
        <div>
          <div class="space-y-2">
            <div class="letter-container w-1/2">
              <div
                class="cell text-lg md:text-2xl"
                :class="{
                  'bg-cell_true_bg dark:bg-cell_true_bg': index == 0,
                  'rotate-x': animation == true,
                }"
                v-for="(cell, index) in ['w', 'e', 'a', 'r', 'y']"
                :key="index"
              >
                {{ cell }}
              </div>
            </div>
            <p><strong>W</strong> is in the word and in the correct spot.</p>
          </div>
        </div>
        <div>
          <div class="space-y-2">
            <div class="letter-container w-1/2">
              <div
                class="cell text-lg md:text-2xl"
                :class="{
                  'bg-cell_false_position dark:bg-cell_dark_false_position':
                    index == 1,
                  'rotate-x': animation == true,
                }"
                v-for="(cell, index) in ['p', 'i', 'l', 'l', 's']"
                :key="index"
              >
                {{ cell }}
              </div>
            </div>
            <p><strong>I</strong> is in the word but in the wrong spot.</p>
          </div>
        </div>
        <div>
          <div class="space-y-2">
            <div class="letter-container w-1/2">
              <div
                class="cell text-lg md:text-2xl"
                :class="{
                  'bg-cell_false_bg dark:bg-cell_false_bg': index == 3,
                  'rotate-x': animation == true,
                }"
                v-for="(cell, index) in ['v', 'a', 'g', 'u', 'e']"
                :key="index"
              >
                {{ cell }}
              </div>
            </div>
            <p><strong>U</strong> is not in the word in any spot.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.x {
  position: 0;
}
</style>
<script setup lang="ts">
import { onMounted, ref } from "vue";
const animation = ref(false);
onMounted(() => {
  setTimeout(() => {
    animation.value = true;
  }, 500);
});
</script>
