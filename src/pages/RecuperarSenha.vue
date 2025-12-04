<template>
  <div
    class="min-h-screen flex flex-col sm:justify-center items-center pt-4 sm:pt-0 px-4 sm:px-6 bg-linear-to-b from-neutral-50 to-neutral-100"
  >
    <!-- Logo e título -->
    <div class="relative z-10 mb-6 sm:mb-8 flex flex-col items-center">
      <img
        src="/img/logo-pc.png"
        alt="Logo PCPB"
        class="w-32 sm:w-40 lg:w-40 h-auto drop-shadow-lg shrink-0"
      />

      <div class="mt-3 text-center">
        <h1 class="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-800">
          Recuperação de Senha
        </h1>
        <h1 class="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-800">Ficha Funcional</h1>
        <div class="mt-1 text-sm text-gray-600">Diretoria de Recursos Humanos</div>
      </div>
    </div>

    <!-- Card de Recuperação -->
    <div
      class="w-full max-w-sm sm:max-w-md px-4 sm:px-6 py-6 sm:py-8 bg-white shadow-xl sm:rounded-lg relative z-10 border border-neutral-200"
    >
      <!-- Mensagem de Sucesso -->
      <div v-if="mensagemSucesso" class="mb-3 p-3 bg-green-50 border border-green-200 rounded-md">
        <div class="flex flex-col items-center text-center">
          <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div class="space-y-1">
            <!-- mensagem que vem do backend -->
            <p class="text-sm font-medium text-green-700 leading-snug">
              {{ mensagemSucesso }}
            </p>
            <p class="text-xs text-green-600 leading-tight">
              Verifique sua caixa de entrada e spam.
            </p>
          </div>
        </div>
      </div>

      <!-- Mensagem de Erro -->
      <div v-if="mensagemErro" class="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
        <div class="flex items-start gap-2.5">
          <svg
            class="w-5 h-5 text-red-500 shrink-0 mt-px"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-sm text-red-600 flex-1 leading-snug">
            {{ mensagemErro }}
          </p>
        </div>
      </div>

      <!-- Informação -->
      <div
        v-if="!mensagemSucesso"
        class="mb-3 p-3 bg-neutral-50 border border-neutral-200 rounded-md"
      >
        <div class="flex items-start gap-2.5">
          <svg
            class="w-5 h-5 text-neutral-500 shrink-0 mt-px"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-sm text-neutral-700 leading-snug">
            Digite sua matrícula abaixo. Uma nova senha será gerada e enviada para o e-mail
            cadastrado no sistema.
          </p>
        </div>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="handleRecuperarSenha" class="space-y-4 sm:space-y-6">
        <!-- Campo Matrícula -->
        <div class="relative">
          <label for="matricula" class="block text-sm font-medium text-neutral-700 mb-2">
            Matrícula
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            </div>
            <input
              id="matricula"
              ref="matriculaInput"
              v-model="matricula"
              type="text"
              inputmode="numeric"
              required
              :disabled="loading"
              placeholder="Informe sua Matrícula"
              maxlength="7"
              autocomplete="username"
              class="h-11 pl-10 pr-4 block w-full border border-neutral-300 rounded-md shadow-sm transition-colors duration-200 py-2 sm:py-3 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
              @input="handleMatriculaInput"
            />
          </div>
        </div>

        <!-- Botões -->
        <div class="flex flex-col space-y-3">
          <!-- Botão Recuperar -->
          <button
            type="submit"
            :disabled="loading || !matricula.trim()"
            :class="[
              'w-full flex items-center justify-center space-x-2 px-6 py-2 sm:py-3 bg-[#c1a85a] text-white font-medium rounded-md focus:outline-none transition-all duration-200 text-sm sm:text-base',
              loading || !matricula.trim()
                ? 'opacity-75 cursor-not-allowed'
                : 'hover:bg-[#a8924e] hover:shadow-lg transform hover:-translate-y-0.5',
            ]"
          >
            <svg
              v-if="loading"
              class="animate-spin h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ loading ? 'PROCESSANDO...' : 'GERAR NOVA SENHA' }}</span>
          </button>

          <!-- Botão Voltar -->
          <router-link
            to="/login"
            class="w-full flex items-center justify-center space-x-2 px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 focus:outline-none transition-all duration-200 text-sm sm:text-base"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>VOLTAR PARA LOGIN</span>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { recuperacaoSenhaService } from '@/services/recuperacaoSenhaService'

// Estado
const matricula = ref('')
const loading = ref(false)
const mensagemSucesso = ref('')
const mensagemErro = ref('')

// Refs dos elementos
const matriculaInput = ref(null)

// Métodos
const limparMensagens = () => {
  mensagemSucesso.value = ''
  mensagemErro.value = ''
}

const handleMatriculaInput = (event) => {
  const value = event.target.value.replace(/\D/g, '')
  matricula.value = value
  limparMensagens()
}

const handleRecuperarSenha = async () => {
  limparMensagens()

  if (!matricula.value.trim()) {
    mensagemErro.value = 'Por favor, digite sua matrícula.'
    return
  }

  loading.value = true

  try {
    const resultado = await recuperacaoSenhaService.recuperarSenha(matricula.value)

    if (resultado.success) {
      // A mensagem já vem do backend com o e-mail mascarado incluído
      mensagemSucesso.value = resultado.message
      matricula.value = '' // Limpa o campo
    } else {
      mensagemErro.value = resultado.message
    }
  } catch {
    mensagemErro.value = 'Erro inesperado. Tente novamente mais tarde.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (matriculaInput.value) {
    matriculaInput.value.focus()
  }
})
</script>

<style scoped>
button,
a {
  transition: all 0.2s ease-in-out;
}

@media (max-width: 480px) {
  .max-w-sm {
    max-width: 95%;
  }
}

@media (prefers-reduced-motion: reduce) {
  button,
  a {
    transition-duration: 0.01ms !important;
  }
}
</style>
