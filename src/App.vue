<template>
  <transition name="fade">
    <div v-if="isPopupActive">
      <component
        :is="currentPopup"
        :message="message"
        :statistics="statistics"
        @close="isPopupActive = false"
      ></component>
    </div>
  </transition>

  <section class="md:py-16 py-5 space-y-16">
    <div
      class="mx-auto px-6 py-8 flex gap-8 md:gap-40 bg-header_bg w-max rounded-2xl"
    >
      <button @click="showPopup('', howToPopup)">
        <img src="./assets/icons/questionMark.svg" alt="" />
      </button>
      <h2 class="font text-2xl md:text-4xl font-semibold">WORDLE</h2>
      <div class="gap-x-4 md:gap-x-7 flex items-center">
        <button @click="showPopup('', resultPopup)">
          <img src="./assets/icons/statistics.svg" alt="" />
        </button>
        <button>
          <img src="./assets/icons/options.svg" alt="" />
        </button>
      </div>
    </div>

    <div class="mx-auto w-2/3 md:w-1/3 lg:w-1/5">
      <div class="letter-container">
        <div
          :class="[handleCellBG(cell.result), handleShake(i)]"
          class="cell"
          v-for="(cell, i) in cellValues"
          :key="i"
        >
          {{ cell.letter }}
        </div>
      </div>
    </div>
    <div class="mx-auto w-max flex flex-col gap-3 items-center">
      <div class="space-x-2 md:space-x-3">
        <button
          class="keyboard-btn"
          :class="handleKeyBG(key)"
          @click="insertLetter(key)"
          v-for="(key, i) in keyboard.firstRow"
          :key="i"
        >
          {{ key }}
        </button>
      </div>
      <div class="space-x-2 md:space-x-3">
        <button
          class="keyboard-btn"
          :class="handleKeyBG(key)"
          @click="insertLetter(key)"
          v-for="(key, i) in keyboard.secondRow"
          :key="i"
        >
          {{ key }}
        </button>
      </div>
      <div class="space-x-2 md:space-x-3 flex items-center relative">
        <button @click="predict()" class="keyboard-btn md:px-5">ENTER</button>
        <button
          class="keyboard-btn"
          :class="handleKeyBG(key)"
          @click="insertLetter(key)"
          v-for="(key, i) in keyboard.thirdRow"
          :key="i"
        >
          {{ key }}
        </button>
        <button @click="deleteLetter()" class="keyboard-btn h-full">DEL</button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import howToPopup from "./components/howToPopup.vue";
import messagePopup from "./components/messagePopup.vue";
import resultPopup from "./components/resultPopup.vue";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
interface Prediction {
  letter: string;
  result: string;
}
interface Statistics {
  win: boolean;
  correctAttempt: number | null;
}
const message = ref();
const gameIsActive = ref(true);
const dailyWord = "araba";
const rowLength = 5;
const attemptsLimit = 6;
let currentPopup = messagePopup;
const keyboard = {
  firstRow: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  secondRow: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  thirdRow: ["z", "x", "c", "v", "b", "n", "m"],
};

const entries = ref(
  Array.from({ length: attemptsLimit }, () =>
    Array.from({ length: rowLength }, (): Prediction => {
      return {
        letter: "",
        result: "",
      };
    })
  )
);
let index = 0;
let statistics: Statistics = { win: false, correctAttempt: null };
let row = ref(0);
const isPopupActive = ref(false);
const wordArray = dailyWord.split("");

function insertLetter(key: string) {
  index <= 4 && gameIsActive.value == true
    ? (entries.value[row.value].splice(index, 1, { letter: key, result: "" }),
      index++)
    : undefined;
}
function deleteLetter() {
  entries.value[row.value].splice(index - 1, 1, { letter: "", result: "" });
  index > 0 ? index-- : undefined;
}
function predict() {
  if (gameIsActive.value == true)
    entries.value[row.value].filter((cell) => cell.letter != "").length ==
    rowLength
      ? checkPredict()
      : showPopup("Not enough letters", messagePopup);
}
function showPopup(msg: string | null, component: any) {
  message.value = msg;
  isPopupActive.value = true;
  currentPopup = component;
}
function checkPredict() {
  gameIsActive.value = false;
  entries.value[row.value].forEach(
    (entry, index) => {
      setTimeout(() => {
        entry.letter == wordArray[index]
          ? (entry.result = "true")
          : wordArray.includes(entry.letter) &&
            entry.letter !== wordArray[index]
          ? (entry.result = "falsePosition")
          : (entry.result = "false");
      }, index * 200);
    },
    setTimeout(() => {
      checkGameIsOver();
    }, rowLength * 200)
  );
}
function checkGameIsOver() {
  console.log();

  entries.value[row.value].filter((entry) => entry.result == "true").length ==
  rowLength
    ? [
        showPopup(dailyWord, resultPopup),
        ((statistics.win = true), (statistics.correctAttempt = row.value)),
      ]
    : cellValues.value.filter((cell) => cell.letter !== "").length ==
      rowLength * attemptsLimit
    ? showPopup(dailyWord, resultPopup)
    : row.value++;
  index = 0;
  gameIsActive.value = true;
}
function handleCellBG(result: string) {
  return result === "true"
    ? `bg-cell_true_bg  rotate-x`
    : result == "falsePosition"
    ? `bg-cell_false_position rotate-x`
    : result == "false"
    ? `bg-cell_false_bg rotate-x`
    : undefined;
}
function handleKeyBG(key: string): string {
  const entries = cellValues.value.filter((cell) => key == cell.letter);
  console.log(entries);
  const trueBG = entries.filter((entry) => entry.result == "true");
  const falsePositionBG = entries.filter(
    (entry) => entry.result == "falsePosition"
  );
  const falseBG = entries.filter((entry) => entry.result == "false");

  return trueBG.length > 0
    ? "bg-cell_true_bg"
    : falsePositionBG.length > 0
    ? "bg-cell_false_position"
    : falseBG.length > 0
    ? "bg-cell_false_bg"
    : "";
  // return entry?.result === "true"
  //   ? "bg-cell_true_bg"
  //   : entry?.result === "falsePosition"
  //   ? "bg-cell_false_position"
  //   : entry?.result === "false"
  //   ? "bg-cell_false_bg"
  //   : "";
}
function handleShake(index: number): string | undefined {
  return isPopupActive.value == true &&
    currentPopup == messagePopup &&
    index < (row.value + 1) * rowLength &&
    index >= row.value * rowLength
    ? "shake"
    : undefined;
}
const cellValues = computed((): Prediction[] => {
  let arr: Prediction[] = [];
  entries.value.forEach((element) => {
    element.forEach((x) => arr.push(x));
  });
  return arr;
});
function keyPressed(e: any) {
  Object.values(keyboard).forEach((row) =>
    row.includes(e.key) ? insertLetter(e.key) : undefined
  );

  e.key === "Enter"
    ? predict()
    : e.key === "Backspace"
    ? deleteLetter()
    : undefined;
}
onMounted(() => {
  document.addEventListener("keydown", keyPressed);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyPressed);
});
</script>
