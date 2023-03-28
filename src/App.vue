<template>
  <section class="md:py-16 py-5 space-y-16">
    <div
      class="mx-auto px-6 py-8 flex gap-8 md:gap-40 bg-header_bg w-max rounded-2xl"
    >
      <button><img src="./assets/icons/questionMark.svg" alt="" /></button>
      <h2 class="font text-2xl md:text-4xl font-semibold">WORDLE</h2>
      <div class="gap-x-4 md:gap-x-7 flex items-center">
        <button><img src="./assets/icons/statistics.svg" alt="" /></button>
        <button><img src="./assets/icons/options.svg" alt="" /></button>
      </div>
    </div>

    <div class="mx-auto w-2/3 md:w-1/3 lg:w-1/5">
      <div class="grid grid-cols-5 gap-2 w-full">
        <div
          :class="handleCellBG(cell)"
          class="rounded-md bg-cell_default_bg aspect-square text-3xl uppercase md:text-4xl font-extrabold text-white flex items-center justify-center"
          v-for="(cell, i) in cellValues"
          :key="i"
        >
          {{ cell.letter }}
        </div>
      </div>
    </div>
    <div class="mx-auto w-max flex flex-col gap-3 items-center">
      <div class="space-x-2 md:space-x-3">
        <button @click="insertLetter('q')" class="keyboard-btn">Q</button>
        <button @click="insertLetter('w')" class="keyboard-btn">W</button>
        <button @click="insertLetter('e')" class="keyboard-btn">E</button>
        <button @click="insertLetter('r')" class="keyboard-btn">R</button>
        <button @click="insertLetter('t')" class="keyboard-btn">T</button>
        <button @click="insertLetter('y')" class="keyboard-btn">Y</button>
        <button @click="insertLetter('u')" class="keyboard-btn">U</button>
        <button @click="insertLetter('i')" class="keyboard-btn">I</button>
        <button @click="insertLetter('o')" class="keyboard-btn">O</button>
        <button @click="insertLetter('p')" class="keyboard-btn">P</button>
      </div>
      <div class="space-x-2 md:space-x-3">
        <button @click="insertLetter('a')" class="keyboard-btn">A</button>
        <button @click="insertLetter('s')" class="keyboard-btn">S</button>
        <button @click="insertLetter('d')" class="keyboard-btn">D</button>
        <button @click="insertLetter('f')" class="keyboard-btn">F</button>
        <button @click="insertLetter('g')" class="keyboard-btn">G</button>
        <button @click="insertLetter('h')" class="keyboard-btn">H</button>
        <button @click="insertLetter('j')" class="keyboard-btn">J</button>
        <button @click="insertLetter('k')" class="keyboard-btn">K</button>
        <button @click="insertLetter('l')" class="keyboard-btn">L</button>
      </div>
      <div class="space-x-2 md:space-x-3 flex items-center relative">
        <button @click="predict()" class="keyboard-btn md:px-5">ENTER</button>
        <button @click="insertLetter('z')" class="keyboard-btn">Z</button>
        <button @click="insertLetter('x')" class="keyboard-btn">X</button>
        <button @click="insertLetter('c')" class="keyboard-btn">C</button>
        <button @click="insertLetter('v')" class="keyboard-btn">V</button>
        <button @click="insertLetter('b')" class="keyboard-btn">B</button>
        <button @click="insertLetter('n')" class="keyboard-btn">N</button>
        <button @click="insertLetter('m')" class="keyboard-btn">M</button>
        <button @click="deleteLetter()" class="keyboard-btn h-full">DEL</button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
const entries = ref(
  Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => {
      return {
        letter: "",
        result: "",
      };
    })
  )
);
const dailyWord = "hello";
let index = 0;
let row = ref(0);

function insertLetter(key: string) {
  index <= 4
    ? (entries.value[row.value].splice(index, 1, { letter: key, result: "" }),
      index++)
    : undefined;
}
function deleteLetter() {
  entries.value[row.value].splice(index - 1, 1, { letter: "", result: "" });
  index > 0 ? index-- : undefined;
}
function predict() {
  entries.value[row.value].filter((cell) => cell.letter != "").length == 5
    ? (checkPredict(), row.value++, (index = 0))
    : alert("Not enough letters");
}
function checkPredict() {
  const wordArray = dailyWord.split("");
  entries.value[row.value].forEach((entry, index) =>
    entry.letter == wordArray[index]
      ? (entry.result = "true")
      : wordArray.includes(entry.letter)
      ? (entry.result = "falsePosition")
      : (entry.result = "false")
  );
  checkGameIsOver();
}
function checkGameIsOver() {
  entries.value[row.value].filter((entry) => entry.result == "true").length == 5
    ? alert("You win daily word is " + dailyWord + ".")
    : undefined;
}
function handleCellBG(cell: { letter: string; result: string }) {
  return cell.result === "true"
    ? "bg-cell_true_bg"
    : cell.result == "falsePosition"
    ? "bg-cell_danger_bg"
    : cell.result == "false"
    ? "bg-cell_false_bg"
    : undefined;
}
const cellValues = computed(() => {
  let arr: object[] = [];
  entries.value.forEach((element) => {
    element.forEach((x) => arr.push(x));
  });
  console.log(arr);
  return arr;
});
</script>
