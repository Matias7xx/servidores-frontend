<template>
  <div>
    <!-- Header -->
    <div class="mb-4 sm:mb-6 lg:mb-8">
      <h1 class="text-xl sm:text-2xl font-semibold text-neutral-900">Alterar Senhas</h1>
      <p class="text-sm text-neutral-500 mt-1.5">
        Gerencie suas senhas de acesso e assinatura digital
      </p>
    </div>

    <!-- Formulários -->
    <div class="space-y-5">
      <!-- Card: Senha de Acesso -->
      <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 lg:p-6">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
            <svg
              class="w-5 h-5 text-neutral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-base font-semibold text-neutral-900">Senha de Acesso</h2>
            <p class="text-sm text-neutral-500">Senha utilizada para fazer login no sistema</p>
          </div>
        </div>

        <!-- Mensagem de Sucesso -->
        <div v-if="sucessoAcesso" class="mb-5 bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div
              class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0"
            >
              <svg
                class="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-green-800">Sucesso!</p>
              <p class="text-sm text-green-700 mt-0.5">{{ mensagemSucessoAcesso }}</p>
            </div>
          </div>
        </div>

        <!-- Mensagem de Erro -->
        <div v-if="erroAcesso" class="mb-5 bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <svg
                class="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-red-800">Erro</p>
              <p class="text-sm text-red-700 mt-0.5">{{ mensagemErroAcesso }}</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="alterarSenhaAcesso" class="space-y-5">
          <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-3">
            <!-- Senha Atual -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Senha de <strong>Acesso Atual</strong> <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  :type="mostrarSenhaAtualAcesso ? 'text' : 'password'"
                  v-model="formAcesso.senhaAtual"
                  required
                  :class="[
                    'w-full border rounded-lg py-2.5 pl-3.5 pr-11 text-sm transition-all duration-200',
                    erroAcesso
                      ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                      : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                  ]"
                  :disabled="loadingAcesso"
                />
                <button
                  type="button"
                  @click="mostrarSenhaAtualAcesso = !mostrarSenhaAtualAcesso"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
                  :disabled="loadingAcesso"
                  tabindex="-1"
                >
                  <svg
                    v-if="mostrarSenhaAtualAcesso"
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Nova Senha -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Nova Senha de <strong>Acesso</strong> <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  :type="mostrarNovaSenhaAcesso ? 'text' : 'password'"
                  v-model="formAcesso.novaSenha"
                  required
                  placeholder="Mínimo 8 caracteres"
                  :class="[
                    'w-full border rounded-lg py-2.5 pl-3.5 pr-11 text-sm transition-all duration-200',
                    erroAcesso
                      ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                      : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                  ]"
                  :disabled="loadingAcesso"
                  @input="validarSenhaAcesso"
                />
                <button
                  type="button"
                  @click="mostrarNovaSenhaAcesso = !mostrarNovaSenhaAcesso"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
                  :disabled="loadingAcesso"
                  tabindex="-1"
                >
                  <svg
                    v-if="mostrarNovaSenhaAcesso"
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirmar Senha -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Confirmar Senha <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  :type="mostrarConfirmarSenhaAcesso ? 'text' : 'password'"
                  v-model="formAcesso.confirmarSenha"
                  required
                  :class="[
                    'w-full border rounded-lg py-2.5 pl-3.5 pr-11 text-sm transition-all duration-200',
                    erroAcesso
                      ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                      : formAcesso.confirmarSenha &&
                          formAcesso.novaSenha !== formAcesso.confirmarSenha
                        ? 'border-red-300 bg-white text-neutral-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                        : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                  ]"
                  :disabled="loadingAcesso"
                />
                <button
                  type="button"
                  @click="mostrarConfirmarSenhaAcesso = !mostrarConfirmarSenhaAcesso"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
                  :disabled="loadingAcesso"
                  tabindex="-1"
                >
                  <svg
                    v-if="mostrarConfirmarSenhaAcesso"
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <p
                v-if="
                  formAcesso.confirmarSenha && formAcesso.novaSenha !== formAcesso.confirmarSenha
                "
                class="mt-1.5 text-xs text-red-600 font-medium"
              >
                As senhas não conferem
              </p>
            </div>
          </div>

          <!-- Força da Senha -->
          <div v-if="formAcesso.novaSenha" class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-neutral-600">Força da senha:</span>
              <span
                :class="[
                  'text-xs font-semibold',
                  forcaSenhaAcesso.cor === 'red'
                    ? 'text-red-600'
                    : forcaSenhaAcesso.cor === 'yellow'
                      ? 'text-yellow-600'
                      : 'text-green-600',
                ]"
              >
                {{ forcaSenhaAcesso.texto }}
              </span>
            </div>
            <div class="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
              <div
                :class="[
                  'h-full rounded-full transition-all duration-300',
                  forcaSenhaAcesso.cor === 'red'
                    ? 'bg-red-500'
                    : forcaSenhaAcesso.cor === 'yellow'
                      ? 'bg-yellow-500'
                      : 'bg-green-500',
                ]"
                :style="{ width: forcaSenhaAcesso.porcentagem + '%' }"
              ></div>
            </div>
          </div>

          <!-- Informações sobre a senha -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-start gap-2">
              <svg
                class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
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
              <div class="flex-1">
                <p class="text-xs font-semibold text-blue-900 mb-2">Requisitos de segurança:</p>
                <ul class="text-xs text-blue-800 space-y-1.5">
                  <li class="flex items-start gap-2">
                    <span class="text-blue-600 font-bold">•</span>
                    <span>Mínimo de 8 caracteres</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-blue-600 font-bold">•</span>
                    <span>Não pode conter matrícula, CPF ou data de nascimento</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-blue-600 font-bold">•</span>
                    <span>Não pode ser igual à senha atual ou à última senha utilizada</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Botão Salvar -->
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="loadingAcesso"
              :class="[
                'px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm',
                loadingAcesso
                  ? 'bg-neutral-400 text-white cursor-not-allowed'
                  : 'bg-neutral-900 text-white hover:bg-neutral-700 hover:shadow-md active:scale-95',
              ]"
            >
              <span v-if="!loadingAcesso" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Alterar Senha de Acesso
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
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
                Alterando...
              </span>
            </button>
          </div>
        </form>
      </div>

      <!-- Card: Senha de Assinatura -->
      <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 lg:p-6">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
            <svg
              class="w-5 h-5 text-neutral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-base font-semibold text-neutral-900">Senha de Assinatura Digital</h2>
            <p class="text-sm text-neutral-500">
              Senha utilizada para assinar documentos digitalmente
            </p>
          </div>
        </div>

        <!-- Mensagem de Sucesso -->
        <div
          v-if="sucessoAssinatura"
          class="mb-5 bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0"
            >
              <svg
                class="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-green-800">Sucesso!</p>
              <p class="text-sm text-green-700 mt-0.5">{{ mensagemSucessoAssinatura }}</p>
            </div>
          </div>
        </div>

        <!-- Mensagem de Erro -->
        <div v-if="erroAssinatura" class="mb-5 bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <svg
                class="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-red-800">Erro</p>
              <p class="text-sm text-red-700 mt-0.5">{{ mensagemErroAssinatura }}</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="alterarSenhaAssinatura" class="space-y-5">
          <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-3">
            <!-- Senha Atual -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Senha de <strong>Acesso Atual</strong> <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  :type="mostrarSenhaAtualAssinatura ? 'text' : 'password'"
                  v-model="formAssinatura.senhaAtual"
                  required
                  :class="[
                    'w-full border rounded-lg py-2.5 pl-3.5 pr-11 text-sm transition-all duration-200',
                    erroAssinatura
                      ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                      : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                  ]"
                  :disabled="loadingAssinatura"
                />
                <button
                  type="button"
                  @click="mostrarSenhaAtualAssinatura = !mostrarSenhaAtualAssinatura"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
                  :disabled="loadingAssinatura"
                  tabindex="-1"
                >
                  <svg
                    v-if="mostrarSenhaAtualAssinatura"
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Nova Senha -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Nova Senha de <strong>Assinatura</strong> <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  :type="mostrarNovaSenhaAssinatura ? 'text' : 'password'"
                  v-model="formAssinatura.novaSenha"
                  required
                  placeholder="Mínimo 8 caracteres"
                  :class="[
                    'w-full border rounded-lg py-2.5 pl-3.5 pr-11 text-sm transition-all duration-200',
                    erroAssinatura
                      ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                      : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                  ]"
                  :disabled="loadingAssinatura"
                  @input="validarSenhaAssinatura"
                />
                <button
                  type="button"
                  @click="mostrarNovaSenhaAssinatura = !mostrarNovaSenhaAssinatura"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
                  :disabled="loadingAssinatura"
                  tabindex="-1"
                >
                  <svg
                    v-if="mostrarNovaSenhaAssinatura"
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirmar Senha -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Confirmar Senha <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  :type="mostrarConfirmarSenhaAssinatura ? 'text' : 'password'"
                  v-model="formAssinatura.confirmarSenha"
                  required
                  :class="[
                    'w-full border rounded-lg py-2.5 pl-3.5 pr-11 text-sm transition-all duration-200',
                    erroAssinatura
                      ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                      : formAssinatura.confirmarSenha &&
                          formAssinatura.novaSenha !== formAssinatura.confirmarSenha
                        ? 'border-red-300 bg-white text-neutral-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                        : 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20',
                  ]"
                  :disabled="loadingAssinatura"
                />
                <button
                  type="button"
                  @click="mostrarConfirmarSenhaAssinatura = !mostrarConfirmarSenhaAssinatura"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-gray-50 rounded-r-lg transition-colors duration-200"
                  :disabled="loadingAssinatura"
                  tabindex="-1"
                >
                  <svg
                    v-if="mostrarConfirmarSenhaAssinatura"
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5 text-neutral-400 hover:text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <p
                v-if="
                  formAssinatura.confirmarSenha &&
                  formAssinatura.novaSenha !== formAssinatura.confirmarSenha
                "
                class="mt-1.5 text-xs text-red-600 font-medium"
              >
                As senhas não conferem
              </p>
            </div>
          </div>

          <!-- Força da Senha -->
          <div v-if="formAssinatura.novaSenha" class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-neutral-600">Força da senha:</span>
              <span
                :class="[
                  'text-xs font-semibold',
                  forcaSenhaAssinatura.cor === 'red'
                    ? 'text-red-600'
                    : forcaSenhaAssinatura.cor === 'yellow'
                      ? 'text-yellow-600'
                      : 'text-green-600',
                ]"
              >
                {{ forcaSenhaAssinatura.texto }}
              </span>
            </div>
            <div class="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
              <div
                :class="[
                  'h-full rounded-full transition-all duration-300',
                  forcaSenhaAssinatura.cor === 'red'
                    ? 'bg-red-500'
                    : forcaSenhaAssinatura.cor === 'yellow'
                      ? 'bg-yellow-500'
                      : 'bg-green-500',
                ]"
                :style="{ width: forcaSenhaAssinatura.porcentagem + '%' }"
              ></div>
            </div>
          </div>

          <!-- Informações sobre a senha -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-start gap-2">
              <svg
                class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
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
              <div class="flex-1">
                <p class="text-xs font-semibold text-blue-900 mb-2">Requisitos de segurança:</p>
                <ul class="text-xs text-blue-800 space-y-1.5">
                  <li class="flex items-start gap-2">
                    <span class="text-blue-600 font-bold">•</span>
                    <span>Mínimo de 8 caracteres</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-blue-600 font-bold">•</span>
                    <span>Não pode conter matrícula, CPF ou data de nascimento</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-blue-600 font-bold">•</span>
                    <span>Não pode ser igual à senha atual ou à última senha utilizada</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Botão Salvar -->
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="loadingAssinatura"
              :class="[
                'px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm',
                loadingAssinatura
                  ? 'bg-neutral-400 text-white cursor-not-allowed'
                  : 'bg-neutral-900 text-white hover:bg-neutral-700 hover:shadow-md active:scale-95',
              ]"
            >
              <span v-if="!loadingAssinatura" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Alterar Senha de Assinatura
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
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
                Alterando...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthUser } from '@/composables/useAuthUser'
import { servidorService } from '@/services/servidorService'

const { userMatricula } = useAuthUser()

// Estado Senha de Acesso
const formAcesso = ref({
  senhaAtual: '',
  novaSenha: '',
  confirmarSenha: '',
})
const mostrarSenhaAtualAcesso = ref(false)
const mostrarNovaSenhaAcesso = ref(false)
const mostrarConfirmarSenhaAcesso = ref(false)
const loadingAcesso = ref(false)
const erroAcesso = ref(false)
const mensagemErroAcesso = ref('')
const sucessoAcesso = ref(false)
const mensagemSucessoAcesso = ref('')

// Estado Senha de Assinatura
const formAssinatura = ref({
  senhaAtual: '',
  novaSenha: '',
  confirmarSenha: '',
})
const mostrarSenhaAtualAssinatura = ref(false)
const mostrarNovaSenhaAssinatura = ref(false)
const mostrarConfirmarSenhaAssinatura = ref(false)
const loadingAssinatura = ref(false)
const erroAssinatura = ref(false)
const mensagemErroAssinatura = ref('')
const sucessoAssinatura = ref(false)
const mensagemSucessoAssinatura = ref('')

// Calcular força da senha
const calcularForcaSenha = (senha) => {
  if (!senha) return { porcentagem: 0, texto: '', cor: 'red' }

  let forca = 0

  // Tamanho
  if (senha.length >= 8) forca += 25
  if (senha.length >= 12) forca += 15

  // Complexidade
  if (/[a-z]/.test(senha)) forca += 15
  if (/[A-Z]/.test(senha)) forca += 15
  if (/[0-9]/.test(senha)) forca += 15
  if (/[^a-zA-Z0-9]/.test(senha)) forca += 15

  if (forca <= 40) {
    return { porcentagem: forca, texto: 'Fraca', cor: 'red' }
  } else if (forca <= 70) {
    return { porcentagem: forca, texto: 'Média', cor: 'yellow' }
  } else {
    return { porcentagem: forca, texto: 'Forte', cor: 'green' }
  }
}

const forcaSenhaAcesso = computed(() => calcularForcaSenha(formAcesso.value.novaSenha))
const forcaSenhaAssinatura = computed(() => calcularForcaSenha(formAssinatura.value.novaSenha))

// Validações
const validarSenhaAcesso = () => {
  erroAcesso.value = false
  mensagemErroAcesso.value = ''
}

const validarSenhaAssinatura = () => {
  erroAssinatura.value = false
  mensagemErroAssinatura.value = ''
}

// Alterar Senha de Acesso
const alterarSenhaAcesso = async () => {
  erroAcesso.value = false
  mensagemErroAcesso.value = ''
  sucessoAcesso.value = false
  mensagemSucessoAcesso.value = ''

  // Validações frontend
  if (formAcesso.value.novaSenha !== formAcesso.value.confirmarSenha) {
    erroAcesso.value = true
    mensagemErroAcesso.value = 'As senhas não conferem'
    return
  }

  if (formAcesso.value.novaSenha.length < 8) {
    erroAcesso.value = true
    mensagemErroAcesso.value = 'A senha deve ter no mínimo 8 caracteres'
    return
  }

  loadingAcesso.value = true

  try {
    const response = await servidorService.alterarSenhaAcesso({
      matricula: userMatricula.value,
      senha_atual: formAcesso.value.senhaAtual,
      nova_senha: formAcesso.value.novaSenha,
      confirmar: formAcesso.value.confirmarSenha,
    })

    if (response.success) {
      sucessoAcesso.value = true
      mensagemSucessoAcesso.value = response.message || 'Senha de acesso alterada com sucesso'

      // Limpar formulário
      formAcesso.value = {
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: '',
      }
      mostrarSenhaAtualAcesso.value = false
      mostrarNovaSenhaAcesso.value = false
      mostrarConfirmarSenhaAcesso.value = false

      // Remover mensagem de sucesso após 5 segundos
      setTimeout(() => {
        sucessoAcesso.value = false
        mensagemSucessoAcesso.value = ''
      }, 5000)
    } else {
      erroAcesso.value = true
      mensagemErroAcesso.value = response.message || 'Erro ao alterar senha'
    }
  } catch (error) {
    erroAcesso.value = true
    mensagemErroAcesso.value = error.message || 'Erro ao alterar senha'
  } finally {
    loadingAcesso.value = false
  }
}

// Alterar Senha de Assinatura
const alterarSenhaAssinatura = async () => {
  erroAssinatura.value = false
  mensagemErroAssinatura.value = ''
  sucessoAssinatura.value = false
  mensagemSucessoAssinatura.value = ''

  // Validações frontend
  if (formAssinatura.value.novaSenha !== formAssinatura.value.confirmarSenha) {
    erroAssinatura.value = true
    mensagemErroAssinatura.value = 'As senhas não conferem'
    return
  }

  if (formAssinatura.value.novaSenha.length < 8) {
    erroAssinatura.value = true
    mensagemErroAssinatura.value = 'A senha deve ter no mínimo 8 caracteres'
    return
  }

  loadingAssinatura.value = true

  try {
    const response = await servidorService.alterarSenhaAssinatura({
      matricula: userMatricula.value,
      senha_atual: formAssinatura.value.senhaAtual,
      nova_senha: formAssinatura.value.novaSenha,
      confirmar: formAssinatura.value.confirmarSenha,
    })

    if (response.success) {
      sucessoAssinatura.value = true
      mensagemSucessoAssinatura.value =
        response.message || 'Senha de assinatura alterada com sucesso'

      // Limpar formulário
      formAssinatura.value = {
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: '',
      }
      mostrarSenhaAtualAssinatura.value = false
      mostrarNovaSenhaAssinatura.value = false
      mostrarConfirmarSenhaAssinatura.value = false

      // Remover mensagem de sucesso após 5 segundos
      setTimeout(() => {
        sucessoAssinatura.value = false
        mensagemSucessoAssinatura.value = ''
      }, 5000)
    } else {
      erroAssinatura.value = true
      mensagemErroAssinatura.value = response.message || 'Erro ao alterar senha'
    }
  } catch (error) {
    erroAssinatura.value = true
    mensagemErroAssinatura.value = error.message || 'Erro ao alterar senha'
  } finally {
    loadingAssinatura.value = false
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}

button {
  transition: all 0.2s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  button,
  input,
  div {
    transition-duration: 0.01ms !important;
  }
}
</style>
