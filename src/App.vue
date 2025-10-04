<template>
  <div id="app" class="min-h-screen">
    <router-view />
  </div>
</template>

<script setup></script>

<style>
/* estilos globais */
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

#app {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  color: #2c3e50;
}

/* Estilos para loading */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Estilos para scroll suave */
html {
  scroll-behavior: smooth;
}

/* Remover outline para mouse users */
.js-focus-visible button:focus:not(.focus-visible),
.js-focus-visible input:focus:not(.focus-visible),
.js-focus-visible select:focus:not(.focus-visible),
.js-focus-visible textarea:focus:not(.focus-visible) {
  outline: none;
}

input:focus,
select:focus {
  outline: none;
}
</style>
