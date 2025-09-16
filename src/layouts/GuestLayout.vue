<template>
  <div class="guest-layout">
    <!-- Conteúdo para usuários não autenticados -->
    <router-view />
  </div>
</template>

<script setup>
// Layout para páginas públicas (Login, etc.)
</script>

<style scoped>
.guest-layout {
  /* Estilos específicos para layout de visitante se necessário */
}
</style>