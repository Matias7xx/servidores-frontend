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
  color: #171717;
}

html {
  scroll-behavior: smooth;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid #c1a85a;
  outline-offset: 2px;
}
</style>
