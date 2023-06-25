<template>
  <section
    class="md:py-10 py-5 flex flex-col justify-between h-screen dark:bg-main_dark_bg"
  >
    <div
      class="mx-auto px-6 py-8 flex gap-8 md:gap-40 dark:bg-header_dark_bg bg-header_bg w-max rounded-2xl"
    >
      <div class="flex gap-4">
        <button @click="showPopup('', 'howToModal')">
          <img
            class="dark:hidden"
            src="./assets/icons/questionMark.svg"
            alt=""
          />
          <img
            class="hidden dark:block"
            src="./assets/icons/questionMarkDark.svg"
            alt=""
          />
        </button>
        <button @click="showPopup('', 'resultModal')">
          <img class="dark:hidden" src="./assets/icons/statistics.svg" alt="" />
          <img
            class="dark:block hidden"
            src="./assets/icons/statisticsDark.svg"
            alt=""
          />
        </button>
      </div>
      <h2 class="font text-2xl md:text-4xl font-semibold dark:text-white">
        WORDLE
      </h2>
      <div class="">
        <div class="flex gap-1 items-center">
          <img
            width="30"
            class="dark:hidden"
            src="./assets/icons/sun.svg"
            alt=""
          />
          <img
            width="30"
            class="hidden dark:block"
            src="./assets/icons/sunDark.svg"
            alt=""
          />

          <label class="switch">
            <input
              :checked="themeCheck()"
              type="checkbox"
              @click="themeSwitch()"
            />
            <span class="slider round"></span>
          </label>
          <img
            width="25"
            src="./assets/icons/moon.svg"
            alt=""
            class="dark:hidden"
          />
          <img
            width="25"
            src="./assets/icons/moonDark.svg"
            alt=""
            class="hidden dark:block"
          />
        </div>
      </div>
    </div>

    <div class="mx-auto w-2/3 md:w-1/2 lg:w-1/5">
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
      <div class="space-x-1.5 md:space-x-3">
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
      <div class="space-x-1.5 md:space-x-3">
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
      <div class="space-x-1.5 md:space-x-3 flex items-center relative">
        <button @click="enterThePredict()" class="keyboard-btn md:px-5">
          ENTER
        </button>
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
    <teleport to="body">
      <transition name="fade">
        <component
          v-if="isPopupActive"
          :is="currentPopup"
          :message="message"
          :statistics="statistics"
          @close="isPopupActive = false"
        ></component>
      </transition>
    </teleport>
  </section>
</template>
<script setup lang="ts">
import howToModal from "./components/howToModal.vue";
import messageToast from "./components/messageToast.vue";
import resultModal from "./components/resultModal.vue";
import { Prediction, Statistics, MyObject } from "./interfaces/interfaces";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

//*** Daily word of game ***/
const dailyWord = "modal";

const components: MyObject = {
  howToModal: howToModal,
  messageToast: messageToast,
  resultModal: resultModal,
};

let statistics: Statistics = {
  win: false,
  correctAttempt: null,
  gameFinished: false,
};
const message = ref();
const isAnimationActive = ref(false);
const rowLength = 5;
const attemptsLimit = 6;
let currentPopup = "";
const currentRow = ref(0);
const isPopupActive = ref(false);
let activeCharIndex = 0;
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
function showPopup(msg: string | null, component: string) {
  message.value = msg;
  isPopupActive.value = true;
  currentPopup = components[component];
}

const keyboard = {
  firstRow: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  secondRow: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  thirdRow: ["z", "x", "c", "v", "b", "n", "m"],
};
const activeRowOfEntries = computed(() => {
  return entries.value[currentRow.value];
});
const isGamePlayable = computed(() => {
  return !isAnimationActive.value == true && !statistics.gameFinished;
});
function insertLetter(key: string) {
  if (
    isGamePlayable.value &&
    // maximizing the entered letter length
    activeCharIndex <= rowLength - 1
  ) {
    activeRowOfEntries.value.splice(activeCharIndex, 1, {
      letter: key,
      result: "",
    }),
      activeCharIndex++;
  }
}
function deleteLetter() {
  if (isGamePlayable.value)
    activeRowOfEntries.value.splice(activeCharIndex - 1, 1, {
      letter: "",
      result: "",
    });
  activeCharIndex > 0 ? activeCharIndex-- : undefined;
}
function enterThePredict() {
  if (isGamePlayable.value)
    activeRowOfEntries.value.every((cell) => cell.letter != "")
      ? checkPredict()
      : showPopup("Not enough letters", "messageToast");
}

function checkPredict() {
  const dailyWordArray = dailyWord.split("");
  //rotate animation
  isAnimationActive.value = true;
  // timeout for showing serial animation
  activeRowOfEntries.value.forEach(
    (entry, activeCharIndex) => {
      setTimeout(() => {
        entry.letter == dailyWordArray[activeCharIndex]
          ? (entry.result = "true")
          : dailyWordArray.includes(entry.letter) &&
            entry.letter !== dailyWordArray[activeCharIndex]
          ? (entry.result = "falsePosition")
          : (entry.result = "false");
      }, activeCharIndex * 200);
    },
    setTimeout(() => {
      checkGameIsOver();
    }, rowLength * 200)
  );
}
function updateTheStatisticsForWin() {
  (statistics.win = true),
    (statistics.gameFinished = true),
    (statistics.correctAttempt = currentRow.value);
}
function checkGameIsOver() {
  // if row's every letters in true place
  activeRowOfEntries.value.every((entry) => entry.result == "true")
    ? [showPopup(dailyWord, "resultModal"), updateTheStatisticsForWin()]
    : // if there is no attempt left
    cellValues.value.every((cell) => cell.letter !== "") && !statistics.win
    ? [(statistics.gameFinished = true), showPopup(dailyWord, "resultModal")]
    : // if the game continues
      [currentRow.value++, (activeCharIndex = 0)];

  //rotate animation
  isAnimationActive.value = false;
}
function handleCellBG(result: string) {
  return result === "true"
    ? `bg-cell_true_bg dark:bg-cell_dark_true_bg  cell-animation`
    : result === "falsePosition"
    ? `bg-cell_false_position dark:bg-cell_dark_false_position cell-animation`
    : result === "false"
    ? `bg-cell_false_bg dark:bg-cell_dark_false_bg cell-animation`
    : "";
}
function handleKeyBG(key: string): string {
  const entries = cellValues.value.filter((cell) => key === cell.letter);
  const counts = entries.reduce((acc: any, entry) => {
    acc[entry.result] = (acc[entry.result] || 0) + 1;
    return acc;
  }, {});
  return counts.true
    ? "bg-cell_true_bg dark:bg-cell_true_bg"
    : counts.falsePosition
    ? "bg-cell_false_position dark:bg-cell_dark_false_position"
    : counts.false
    ? "bg-cell_false_bg dark:bg-key_dark_false"
    : "";
}
// function handleKeyBG(key: string): string {
//   const entries = cellValues.value.filter((cell) => key == cell.letter);

//   const trueBG = entries.filter((entry) => entry.result == "true");
//   const falsePositionBG = entries.filter(
//     (entry) => entry.result == "falsePosition"
//   );
//   const falseBG = entries.filter((entry) => entry.result == "false");

//   return trueBG.length > 0
//     ? "bg-cell_true_bg"
//     : falsePositionBG.length > 0
//     ? "bg-cell_false_position"
//     : falseBG.length > 0
//     ? "bg-cell_false_bg"
//     : "";
// }
function handleShake(index: number): string | undefined {
  return isPopupActive.value == true &&
    currentPopup == messageToast &&
    index < (currentRow.value + 1) * rowLength &&
    index >= currentRow.value * rowLength
    ? "shake"
    : undefined;
}
// const cellValues = computed((): Prediction[] => {
//   let arr: Prediction[] = [];
//   entries.value.forEach((element) => {
//     element.forEach((x) => arr.push(x));
//   });
//   return arr;
// });
const cellValues = computed(() =>
  entries.value.flatMap((element) => element).flat()
);

function keyPressed(e: any) {
  Object.values(keyboard).forEach((currentRow) =>
    currentRow.includes(e.key) ? insertLetter(e.key) : undefined
  );

  e.key === "Enter"
    ? enterThePredict()
    : e.key === "Backspace"
    ? deleteLetter()
    : undefined;
}
function themeCheck() {
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return userTheme === "dark" || (!userTheme && systemTheme)
    ? [document.documentElement.classList.add("dark"), true]
    : false;
}
function themeSwitch() {
  const documentClass = document.documentElement.classList;
  documentClass.contains("dark")
    ? [documentClass.remove("dark"), localStorage.setItem("theme", "light")]
    : [documentClass.add("dark"), localStorage.setItem("theme", "dark")];
}
onMounted(() => {
  document.addEventListener("keydown", keyPressed);
  themeCheck();
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyPressed);
});
</script>
