<template>
  <div>
    <!-- Header -->
    <div class="mb-4 sm:mb-6 lg:mb-8">
      <h1 class="text-xl sm:text-2xl font-semibold text-neutral-900">Editar Dependente</h1>
      <p class="text-sm text-neutral-500 mt-1.5">Atualize os dados do dependente</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-2 border-neutral-300 border-t-neutral-900"
      ></div>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="font-medium text-red-900">Erro ao carregar dados</p>
      <p class="text-sm text-red-700 mt-1">{{ error }}</p>
    </div>

    <!-- Formulário -->
    <div v-else>
      <form @submit.prevent="atualizarDependente" class="space-y-5">
        <!-- Card: Dados do Dependente -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 lg:p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Dados do Dependente
          </h2>

          <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2 mb-5">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Nome Completo <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="form.nome"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.nome
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'bg-white border-neutral-300 text-neutral-900',
                ]"
                required
              />
              <span v-if="errors.nome" class="text-red-600 text-xs mt-1.5 block">{{
                errors.nome[0]
              }}</span>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Sexo <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.sexo_dependente"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.sexo_dependente
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'bg-white border-neutral-300 text-neutral-900',
                ]"
                required
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
              <span v-if="errors.sexo_dependente" class="text-red-600 text-xs mt-1.5 block">{{
                errors.sexo_dependente[0]
              }}</span>
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2 mb-5">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Tipo de Parentesco <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.tipo_dependente"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.tipo_dependente
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'bg-white border-neutral-300 text-neutral-900',
                ]"
                required
              >
                <option value="" disabled>Selecione</option>
                <option value="Cônjuge">Cônjuge</option>
                <option value="Filho">Filho(a)</option>
                <option value="Enteado">Enteado(a)</option>
                <option value="Pai">Pai</option>
                <option value="Mãe">Mãe</option>
              </select>
              <span v-if="errors.tipo_dependente" class="text-red-600 text-xs mt-1.5 block">{{
                errors.tipo_dependente[0]
              }}</span>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Data de Nascimento <span class="text-red-500">*</span>
              </label>
              <input
                type="date"
                v-model="form.data_nascimento"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.data_nascimento
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'bg-white border-neutral-300 text-neutral-900',
                ]"
                required
              />
              <span v-if="errors.data_nascimento" class="text-red-600 text-xs mt-1.5 block">{{
                errors.data_nascimento[0]
              }}</span>
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                CPF <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="cpfFormatado"
                @input="formatarCPF"
                maxlength="14"
                placeholder="000.000.000-00"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 placeholder:text-neutral-400',
                  errors.cpf
                    ? 'border-red-400 bg-red-50 text-red-900'
                    : 'bg-white border-neutral-300 text-neutral-900',
                ]"
                required
              />
              <span v-if="errors.cpf" class="text-red-600 text-xs mt-1.5 block">{{
                errors.cpf[0]
              }}</span>
            </div>
          </div>
        </div>

        <!-- Card: Documentos -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Documentos Anexados
          </h2>

          <!-- Documento Principal -->
          <div class="mb-5 grid grid-cols-1">
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Documento de Vínculo entre o Dependente e o Servidor
              <span class="text-red-500">(.pdf)</span> <span class="text-red-500">*</span>
            </label>
            <input
              type="file"
              ref="anexoInput"
              @change="onFileChange"
              accept=".pdf"
              class="hidden"
            />
            <div
              @click="$refs.anexoInput.click()"
              :class="[
                'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-between flex-wrap gap-2',
                errors.anexo
                  ? 'border-red-400 bg-red-50 text-red-900 hover:bg-red-100'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
              ]"
            >
              <span class="flex-1 min-w-0 truncate">
                {{ nomeArquivoAnexo || 'Clique para alterar a comprovação de vínculo' }}
              </span>
              <span
                :class="[
                  'ml-2 px-3 py-1 text-xs font-medium rounded whitespace-nowrap',
                  errors.anexo ? 'bg-red-200 text-red-800' : 'bg-neutral-200 text-neutral-700',
                ]"
              >
                Escolher arquivo
              </span>
            </div>
            <span v-if="errors.anexo" class="text-red-600 text-xs mt-1.5 block">{{
              errors.anexo[0]
            }}</span>

            <div v-if="mensagemAnexo" class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p
                class="text-sm text-blue-700 font-medium whitespace-pre-wrap"
                v-html="mensagemAnexo"
              ></p>
            </div>

            <!-- Mostrar documento atual -->
            <div v-if="dependente.documento" class="mt-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-green-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-sm text-neutral-600">
                Arquivo atual:
                <button
                  type="button"
                  @click="abrirDocumento(dependente.id, 'documento')"
                  class="text-blue-600 hover:text-blue-700 underline font-medium"
                >
                  Abrir PDF
                </button>
              </p>
            </div>

            <!-- Mostrar novo arquivo selecionado -->
            <div v-if="form.anexo" class="mt-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-blue-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <p class="text-sm text-blue-700 font-medium">
                Novo arquivo selecionado: {{ form.anexo.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- Card: Documentos Adicionais (para Filho/Enteado) -->
        <div
          v-if="showDeficienciaOuFinanceiraInput"
          class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 md:p-5 lg:p-6 grid grid-cols-1"
        >
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Documentos de Comprovação Adicionais
          </h2>

          <!-- Alerta para 21-24 anos -->
          <div
            v-if="showNewDocs21To24"
            class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4"
          >
            <p class="text-sm text-yellow-800 font-medium">
              ATENÇÃO: Para esta faixa etária você deve anexar pelo menos UM dos três documentos
              abaixo.
            </p>
          </div>

          <!-- Alerta para >24 anos -->
          <div
            v-else-if="showNewDocsOver24"
            class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4"
          >
            <p class="text-sm text-yellow-800 font-medium">
              ATENÇÃO: Para esta faixa etária você deve anexar pelo menos UM dos documentos abaixo.
            </p>
          </div>

          <div class="space-y-5">
            <!-- Doc. Dependência Financeira -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Comprovante de Dependência Financeira
                <span class="text-neutral-500 text-xs">(.pdf, máx 2MB)</span>
              </label>
              <input
                type="file"
                ref="docDepFinanceiraInput"
                @change="onDocDepFinanceiraChange"
                accept=".pdf"
                class="hidden"
              />
              <div
                @click="$refs.docDepFinanceiraInput.click()"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-between flex-wrap gap-2',
                  errors.doc_dependencia_financeira
                    ? 'border-red-400 bg-red-50 text-red-900 hover:bg-red-100'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
                ]"
              >
                <span class="flex-1 min-w-0 truncate">
                  {{ nomeArquivoDepFinanceira || 'O novo arquivo irá sobrescrever o atual' }}
                </span>
                <span
                  :class="[
                    'ml-2 px-3 py-1 text-xs font-medium rounded whitespace-nowrap',
                    errors.doc_dependencia_financeira
                      ? 'bg-red-200 text-red-800'
                      : 'bg-neutral-200 text-neutral-700',
                  ]"
                >
                  Escolher arquivo
                </span>
              </div>
              <span
                v-if="errors.doc_dependencia_financeira"
                class="text-red-600 text-xs mt-1.5 block"
                >{{ errors.doc_dependencia_financeira[0] }}</span
              >
              <!-- Arquivo atual -->
              <div
                v-if="dependente.doc_dependencia_financeira"
                class="mt-2 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-green-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-sm text-neutral-600">
                  Arquivo atual:
                  <button
                    type="button"
                    @click="abrirDocumento(dependente.id, 'doc_dependencia_financeira')"
                    class="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Abrir PDF
                  </button>
                </p>
              </div>

              <!-- Novo arquivo selecionado -->
              <div v-if="form.doc_dependencia_financeira" class="mt-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-blue-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p class="text-sm text-blue-700 font-medium">
                  Novo arquivo selecionado: {{ form.doc_dependencia_financeira.name }}
                </p>
              </div>
            </div>

            <!-- Doc. Laudo Deficiência -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Laudo Médico de Deficiência
                <span class="text-neutral-500 text-xs">(.pdf, máx 2MB)</span>
              </label>
              <input
                type="file"
                ref="docLaudoDeficienciaInput"
                @change="onDocLaudoDeficienciaChange"
                accept=".pdf"
                class="hidden"
              />
              <div
                @click="$refs.docLaudoDeficienciaInput.click()"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-between flex-wrap gap-2',
                  errors.doc_laudo_deficiencia
                    ? 'border-red-400 bg-red-50 text-red-900 hover:bg-red-100'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
                ]"
              >
                <span class="flex-1 min-w-0 truncate">
                  {{ nomeArquivoLaudoDeficiencia || 'O novo arquivo irá sobrescrever o atual' }}
                </span>
                <span
                  :class="[
                    'ml-2 px-3 py-1 text-xs font-medium rounded whitespace-nowrap',
                    errors.doc_laudo_deficiencia
                      ? 'bg-red-200 text-red-800'
                      : 'bg-neutral-200 text-neutral-700',
                  ]"
                >
                  Escolher arquivo
                </span>
              </div>
              <span v-if="errors.doc_laudo_deficiencia" class="text-red-600 text-xs mt-1.5 block">{{
                errors.doc_laudo_deficiencia[0]
              }}</span>

              <div v-if="dependente.doc_laudo_deficiencia" class="mt-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-green-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-sm text-neutral-600">
                  Arquivo atual:
                  <button
                    type="button"
                    @click="abrirDocumento(dependente.id, 'doc_laudo_deficiencia')"
                    class="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Abrir PDF
                  </button>
                </p>
              </div>

              <div v-if="form.doc_laudo_deficiencia" class="mt-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-blue-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p class="text-sm text-blue-700 font-medium">
                  Novo arquivo selecionado: {{ form.doc_laudo_deficiencia.name }}
                </p>
              </div>
            </div>

            <!-- Doc. Curso Superior -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Comprovante de Matrícula em Curso Superior
                <span class="text-neutral-500 text-xs">(.pdf, máx 2MB)</span>
              </label>
              <input
                type="file"
                ref="docCursoSuperiorInput"
                @change="onDocCursoSuperiorChange"
                accept=".pdf"
                class="hidden"
              />
              <div
                @click="$refs.docCursoSuperiorInput.click()"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-between flex-wrap gap-2',
                  errors.doc_curso_superior
                    ? 'border-red-400 bg-red-50 text-red-900 hover:bg-red-100'
                    : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
                ]"
              >
                <span class="flex-1 min-w-0 truncate">
                  {{ nomeArquivoCursoSuperior || 'O novo arquivo irá sobrescrever o atual' }}
                </span>
                <span
                  :class="[
                    'ml-2 px-3 py-1 text-xs font-medium rounded whitespace-nowrap',
                    errors.doc_curso_superior
                      ? 'bg-red-200 text-red-800'
                      : 'bg-neutral-200 text-neutral-700',
                  ]"
                >
                  Escolher arquivo
                </span>
              </div>
              <span v-if="errors.doc_curso_superior" class="text-red-600 text-xs mt-1.5 block">{{
                errors.doc_curso_superior[0]
              }}</span>

              <!-- Arquivo atual -->
              <div v-if="dependente.doc_curso_superior" class="mt-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-green-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-sm text-neutral-600">
                  Arquivo atual:
                  <button
                    type="button"
                    @click="abrirDocumento(dependente.id, 'doc_curso_superior')"
                    class="text-blue-600 hover:text-blue-700 underline font-medium"
                  >
                    Abrir PDF
                  </button>
                </p>
              </div>

              <!-- Novo arquivo selecionado -->
              <div v-if="form.doc_curso_superior" class="mt-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 text-blue-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p class="text-sm text-blue-700 font-medium">
                  Novo arquivo selecionado: {{ form.doc_curso_superior.name }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 justify-end">
          <router-link
            to="/dependentes"
            class="w-full sm:w-auto px-4 sm:px-6 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 text-center"
          >
            Cancelar
          </router-link>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:bg-neutral-950 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
          >
            <span v-if="submitting">Atualizando...</span>
            <span v-else>Salvar Alterações</span>
          </button>
        </div>
      </form>

      <!-- Toast -->
      <Transition name="toast">
        <div
          v-if="showToast"
          :class="[
            'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 left-4 sm:left-auto flex items-start gap-3 w-full max-w-sm p-4 rounded-lg shadow-xl border-2 z-50 backdrop-blur-sm',
            toastType === 'success' ? 'bg-white/95 border-green-500' : 'bg-white/95 border-red-500',
          ]"
          role="alert"
        >
          <div
            :class="[
              'shrink-0 w-6 h-6 rounded-full flex items-center justify-center',
              toastType === 'success' ? 'bg-green-500' : 'bg-red-500',
            ]"
          >
            <svg
              v-if="toastType === 'success'"
              class="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <svg v-else class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-neutral-900">{{ toastMessage }}</p>
          </div>
          <button
            type="button"
            @click="hideToast"
            class="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDependentesStore } from '@/stores/dependentes'
import { dependentesService } from '@/services/dependentesService'
import { inject } from 'vue'

// Usuário autenticado
const authUser = inject('authUser')
const { user } = authUser

const router = useRouter()
const route = useRoute()
const dependentesStore = useDependentesStore()

const dependente = ref({})
const loading = ref(true)
const error = ref(null)

const form = reactive({
  id: '',
  servidor_matricula: '',
  nome: '',
  cpf: '',
  sexo_dependente: '',
  tipo_dependente: '',
  data_nascimento: '',
  anexo: null,
  doc_dependencia_financeira: null,
  doc_laudo_deficiencia: null,
  doc_curso_superior: null,
})

const errors = reactive({})
const cpfFormatado = ref('')
const nomeArquivoAnexo = ref('')
const nomeArquivoDepFinanceira = ref('')
const nomeArquivoLaudoDeficiencia = ref('')
const nomeArquivoCursoSuperior = ref('')
const mensagemAnexo = ref('')

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Calcula idade do dependente
const idadeDependente = computed(() => {
  if (!form.data_nascimento) return null
  const hoje = new Date()
  const dataNasc = new Date(form.data_nascimento)
  let idade = hoje.getFullYear() - dataNasc.getFullYear()
  const mesAtual = hoje.getMonth()
  const diaAtual = hoje.getDate()
  const mesNasc = dataNasc.getMonth()
  const diaNasc = dataNasc.getDate()

  if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
    idade--
  }
  return idade
})

// Verifica se é filho ou enteado
const isFilhoOuEnteado = computed(() => {
  return form.tipo_dependente === 'Filho' || form.tipo_dependente === 'Enteado'
})

// Mostra campos de documentos adicionais
const showDeficienciaOuFinanceiraInput = computed(() => {
  if (!isFilhoOuEnteado.value) return false
  const idade = idadeDependente.value
  return idade !== null && idade >= 21
})

// Mostra docs para 21-24 anos
const showNewDocs21To24 = computed(() => {
  if (!isFilhoOuEnteado.value) return false
  const idade = idadeDependente.value
  return idade !== null && idade >= 21 && idade <= 24
})

// Mostra docs para >24 anos
const showNewDocsOver24 = computed(() => {
  if (!isFilhoOuEnteado.value) return false
  const idade = idadeDependente.value
  return idade !== null && idade > 24
})

const formatarDataParaInput = (data) => {
  if (!data) return ''

  if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return data
  }

  if (data.includes('/')) {
    const [dia, mes, ano] = data.split('/')
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
  }

  if (data.includes('T')) {
    return data.split('T')[0]
  }

  try {
    const date = new Date(data)
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  } catch (e) {
    console.error('Erro ao formatar data:', e)
  }

  return ''
}

// Função para buscar os dados do dependente
const fetchData = async () => {
  try {
    loading.value = true
    error.value = null

    const dependenteId = route.params.id

    await dependentesStore.carregarDependentes()

    const dep = dependentesStore.dependentes.find((d) => d.id == dependenteId)

    if (!dep) {
      error.value = 'Dependente não encontrado'
      return
    }

    dependente.value = dep

    form.id = dep.id
    form.servidor_matricula = user.value?.matricula || null
    form.nome = dep.nome || ''
    form.cpf = dep.cpf || ''
    form.sexo_dependente = dep.sexo_dependente || ''
    form.tipo_dependente = dep.tipo_dependente || ''

    if (dep.cpf) {
      let cpf = dep.cpf.replace(/\D/g, '')
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      cpfFormatado.value = cpf
    }

    if (dep.data_nascimento) {
      form.data_nascimento = formatarDataParaInput(dep.data_nascimento)
    }

    atualizarMensagemAnexo()
  } catch {
    error.value = 'Erro ao conectar com o servidor'
  } finally {
    loading.value = false
  }
}

// Formatação de CPF
const formatarCPF = () => {
  let valor = cpfFormatado.value.replace(/\D/g, '')

  if (valor.length > 11) {
    valor = valor.substring(0, 11)
  }

  if (valor.length >= 9) {
    valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
  } else if (valor.length >= 6) {
    valor = valor.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
  } else if (valor.length >= 3) {
    valor = valor.replace(/(\d{3})(\d{0,3})/, '$1.$2')
  }

  cpfFormatado.value = valor
  form.cpf = valor.replace(/\D/g, '')
}

// Validação de CPF
const validarCPF = (cpf) => {
  const cpfLimpo = cpf.replace(/\D/g, '')

  if (cpfLimpo.length !== 11) return false
  if (/^(\d)\1+$/.test(cpfLimpo)) return false

  let soma = 0
  let resto

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i)
  }

  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false

  soma = 0
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i)
  }

  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false

  return true
}

// Atualizar mensagem do anexo
const atualizarMensagemAnexo = () => {
  const tipo = form.tipo_dependente
  const mensagens = {
    Cônjuge: 'Certidão de Casamento ou Declaração de União Estável.',
    Filho: 'Documento que comprove a relação com o Servidor.',
    Enteado: 'Documento que comprove a relação com o Servidor.',
    Pai: 'Documento que comprove a relação com o Servidor.',
    Mãe: 'Documento que comprove a relação com o Servidor.',
  }

  mensagemAnexo.value = mensagens[tipo] || ''
}

// Função para alterar anexo principal
const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.type !== 'application/pdf') {
      showToastMessage('Apenas arquivos PDF são permitidos', 'error')
      event.target.value = ''
      nomeArquivoAnexo.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      showToastMessage('Arquivo deve ter no máximo 2MB', 'error')
      event.target.value = ''
      nomeArquivoAnexo.value = ''
      return
    }

    form.anexo = file
    nomeArquivoAnexo.value = file.name
  } else {
    nomeArquivoAnexo.value = ''
  }
}

// Função para doc dependência financeira
const onDocDepFinanceiraChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.type !== 'application/pdf') {
      showToastMessage('Apenas arquivos PDF são permitidos', 'error')
      event.target.value = ''
      nomeArquivoDepFinanceira.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      showToastMessage('Arquivo deve ter no máximo 2MB', 'error')
      event.target.value = ''
      nomeArquivoDepFinanceira.value = ''
      return
    }

    form.doc_dependencia_financeira = file
    nomeArquivoDepFinanceira.value = file.name
  } else {
    nomeArquivoDepFinanceira.value = ''
  }
}

// Função para doc laudo deficiência
const onDocLaudoDeficienciaChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.type !== 'application/pdf') {
      showToastMessage('Apenas arquivos PDF são permitidos', 'error')
      event.target.value = ''
      nomeArquivoLaudoDeficiencia.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      showToastMessage('Arquivo deve ter no máximo 2MB', 'error')
      event.target.value = ''
      nomeArquivoLaudoDeficiencia.value = ''
      return
    }

    form.doc_laudo_deficiencia = file
    nomeArquivoLaudoDeficiencia.value = file.name
  } else {
    nomeArquivoLaudoDeficiencia.value = ''
  }
}

// Função para doc curso superior
const onDocCursoSuperiorChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.type !== 'application/pdf') {
      showToastMessage('Apenas arquivos PDF são permitidos', 'error')
      event.target.value = ''
      nomeArquivoCursoSuperior.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      showToastMessage('Arquivo deve ter no máximo 2MB', 'error')
      event.target.value = ''
      nomeArquivoCursoSuperior.value = ''
      return
    }

    form.doc_curso_superior = file
    nomeArquivoCursoSuperior.value = file.name
  } else {
    nomeArquivoCursoSuperior.value = ''
  }
}

// Função para abrir documentos
const abrirDocumento = async (idDependente, tipoDocumento) => {
  try {
    const response = await dependentesService.getDocumentoUrl(idDependente, tipoDocumento)
    if (response.success && response.url) {
      const janela = window.open(
        response.url,
        'anexo',
        'width=800,height=600,scrollbars=yes,resizable=yes',
      )
      if (!janela) {
        alert('Popup bloqueado! Permita popups para visualizar o anexo.')
      }
    } else {
      showToastMessage('Erro ao abrir documento', 'error')
    }
  } catch {
    showToastMessage('Erro ao abrir documento', 'error')
  }
}

// Função para atualizar dependente
const atualizarDependente = async () => {
  try {
    Object.keys(errors).forEach((key) => delete errors[key])

    if (!form.data_nascimento || form.data_nascimento.trim() === '') {
      errors.data_nascimento = ['A data de nascimento é obrigatória']
      showToastMessage('Por favor, preencha a data de nascimento', 'error')
      return
    }

    if (!form.cpf || form.cpf.trim() === '') {
      errors.cpf = ['O CPF é obrigatório']
      showToastMessage('Por favor, preencha o CPF', 'error')
      return
    }

    if (!validarCPF(form.cpf)) {
      errors.cpf = ['CPF inválido']
      showToastMessage('CPF inválido. Por favor, verifique o número digitado', 'error')
      return
    }

    // VALIDAÇÃO DOS DOCUMENTOS ADICIONAIS
    if (isFilhoOuEnteado.value) {
      const idade = idadeDependente.value

      // Verifica se já tem documentos salvos
      const temDocDepFinanceira =
        dependente.value.doc_dependencia_financeira || form.doc_dependencia_financeira
      const temDocLaudo = dependente.value.doc_laudo_deficiencia || form.doc_laudo_deficiencia
      const temDocCursoSuperior = dependente.value.doc_curso_superior || form.doc_curso_superior

      // Se 21 a 24 anos, um dos três é obrigatório
      if (idade >= 21 && idade <= 24) {
        if (!temDocDepFinanceira && !temDocLaudo && !temDocCursoSuperior) {
          errors.doc_dependencia_financeira = [
            'É obrigatório anexar UM dos três documentos de comprovação.',
          ]
          showToastMessage(
            'Para esta faixa etária, é obrigatório anexar a Dependência Financeira, o Laudo de Deficiência OU o Comprovante de Curso Superior.',
            'error',
          )
          return
        }
      }

      // Se > 24 anos, um dos dois é obrigatório (Curso Superior não é aceito)
      if (idade > 24) {
        if (!temDocDepFinanceira && !temDocLaudo) {
          errors.doc_dependencia_financeira = [
            'É obrigatório anexar UM dos dois documentos de comprovação.',
          ]
          showToastMessage(
            'Para esta faixa etária, é obrigatório anexar a Dependência Financeira OU o Laudo de Deficiência.',
            'error',
          )
          return
        }
      }
    }

    form.servidor_matricula = user.value?.matricula || null

    if (!form.servidor_matricula) {
      showToastMessage('Erro: Matrícula não encontrada', 'error')
      return
    }

    const formData = new FormData()

    formData.append('id', form.id)
    formData.append('servidor_matricula', form.servidor_matricula)
    formData.append('nome', form.nome)
    formData.append('cpf', form.cpf)
    formData.append('sexo_dependente', form.sexo_dependente)
    formData.append('tipo_dependente', form.tipo_dependente)
    formData.append('data_nascimento', form.data_nascimento)
    formData.append('datanascimento', form.data_nascimento)

    if (form.anexo instanceof File) {
      formData.append('anexo', form.anexo)
    }

    if (form.doc_dependencia_financeira instanceof File) {
      formData.append('doc_dependencia_financeira', form.doc_dependencia_financeira)
    }

    if (form.doc_laudo_deficiencia instanceof File) {
      formData.append('doc_laudo_deficiencia', form.doc_laudo_deficiencia)
    }

    if (form.doc_curso_superior instanceof File) {
      formData.append('doc_curso_superior', form.doc_curso_superior)
    }

    const result = await dependentesStore.atualizarDependente(formData)

    if (result.success) {
      showToastMessage(result.message || 'Dependente atualizado com sucesso!', 'success')

      setTimeout(() => {
        router.push('/dependentes')
      }, 1500)
    } else {
      if (result.errors && Object.keys(result.errors).length > 0) {
        Object.assign(errors, result.errors)
        showToastMessage('Verifique os campos do formulário', 'error')
      } else {
        showToastMessage(result.message || 'Erro ao atualizar dependente', 'error')
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 422) {
      const validationErrors = err.response.data.errors || {}
      Object.keys(validationErrors).forEach((key) => {
        errors[key] = validationErrors[key]
      })
      showToastMessage('Verifique os campos do formulário', 'error')
    } else {
      showToastMessage(err.response?.data?.message || 'Erro ao atualizar dependente', 'error')
    }
  }
}

const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true

  setTimeout(() => hideToast(), 5000)
}

const hideToast = () => {
  showToast.value = false
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
