<template>
  <section class="md:py-16 py-5 space-y-16">
    <div
      class="mx-auto px-6 py-8 flex gap-8 md:gap-40 bg-header_bg w-max rounded-2xl"
    >
      <button><img src="./assets/icons/questionMark.svg" alt="" /></button>
      <h2 class="font text-2xl md:text-4xl font-semibold">WORDLE</h2>
      <div class="space-x-4 md:space-x-7">
        <button><img src="./assets/icons/statistics.svg" alt="" /></button>
        <button><img src="./assets/icons/options.svg" alt="" /></button>
      </div>
    </div>
    <div class="mx-auto w-2/3 md:w-1/3 lg:w-1/5">
      <div class="grid grid-cols-5 gap-2 w-full">
        <div
          class="rounded-md bg-cell_default_bg aspect-square text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center"
          v-for="cell in 30"
          :key="cell"
        >
          2
        </div>
      </div>
    </div>
    <div class="mx-auto w-max flex flex-col gap-3 items-center">
      <div class="space-x-2 md:space-x-3">
        <button data-key="q" class="keyboard-btn">Q</button>
        <button data-key="w" class="keyboard-btn">W</button>
        <button data-key="e" class="keyboard-btn">E</button>
        <button data-key="r" class="keyboard-btn">R</button>
        <button data-key="t" class="keyboard-btn">T</button>
        <button data-key="y" class="keyboard-btn">Y</button>
        <button data-key="u" class="keyboard-btn">U</button>
        <button data-key="i" class="keyboard-btn">I</button>
        <button data-key="o" class="keyboard-btn">O</button>
        <button data-key="p" class="keyboard-btn">P</button>
      </div>
      <div class="space-x-2 md:space-x-3">
        <button data-key="a" class="keyboard-btn">A</button>
        <button data-key="s" class="keyboard-btn">S</button>
        <button data-key="d" class="keyboard-btn">D</button>
        <button data-key="f" class="keyboard-btn">F</button>
        <button data-key="g" class="keyboard-btn">G</button>
        <button data-key="h" class="keyboard-btn">H</button>
        <button data-key="j" class="keyboard-btn">J</button>
        <button data-key="k" class="keyboard-btn">K</button>
        <button data-key="l" class="keyboard-btn">L</button>
      </div>
      <div class="space-x-2 md:space-x-3 flex items-center relative">
        <button data-key="enter" class="keyboard-btn md:px-5">ENTER</button>
        <button data-key="z" class="keyboard-btn">Z</button>
        <button data-key="x" class="keyboard-btn">X</button>
        <button data-key="c" class="keyboard-btn">C</button>
        <button data-key="v" class="keyboard-btn">V</button>
        <button data-key="b" class="keyboard-btn">B</button>
        <button data-key="n" class="keyboard-btn">N</button>
        <button data-key="m" class="keyboard-btn">M</button>
        <button data-key="delete" class="keyboard-btn h-full">DEL</button>
      </div>
    </div>
  </section>
</template>
