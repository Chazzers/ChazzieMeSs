<script setup lang="ts"></script>

<template>
  <nav
    class="fixed inset-0 [contain:paint] z-10 -translate-x-full md:transform-none md:static transition-transform"
  >
    <div
      class="w-4/5 flex flex-col items-left p-4 border-solid border-r border-slate-400 h-full bg-white md:w-auto md:min-h-screen"
    >
      <div class="flex gap-4 justify-between md:hidden">
        <h2>Main Menu</h2>
        <button type="button" @click="$emit('closeMenu')">Close</button>
      </div>
      <ul>
        <li><NuxtLink href="/">Home</NuxtLink></li>
        <li><NuxtLink href="/brands">Merken</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>
