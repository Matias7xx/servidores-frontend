<template>
  <div>
    <!-- Loading State -->
    <div v-if="servidorStore.loading" class="flex justify-center items-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-2 border-neutral-300 border-t-neutral-900"
      ></div>
    </div>

    <!-- Estado de Erro -->
    <div v-else-if="servidorStore.error">
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start justify-between">
        <div>
          <p class="font-medium text-red-900">Erro ao carregar dados</p>
          <p class="text-sm text-red-700 mt-1">{{ servidorStore.error }}</p>
        </div>
        <button @click="servidorStore.limparErros()" class="text-red-500 hover:text-red-700">
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
    </div>

    <!-- Conteúdo -->
    <div v-else>
      <!-- Header -->
      <div class="mb-4 sm:mb-6 lg:mb-8">
        <h1 class="text-xl sm:text-2xl font-semibold text-neutral-900">Dados Pessoais</h1>
        <p class="text-sm text-neutral-500 mt-1.5">Atualize seus dados</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="updateDados" class="space-y-5">
        <!-- Card: Dados Básicos -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 lg:p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Dados Básicos
          </h2>

          <div class="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4 sm:mb-5">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Nome Completo</label>
              <input
                type="text"
                v-model="form.nome"
                class="w-full bg-neutral-100 border border-neutral-200 rounded-lg py-2.5 px-3.5 text-neutral-500 text-sm font-medium cursor-not-allowed"
                readonly
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Cargo</label>
              <input
                type="text"
                :value="form.cargo"
                class="w-full bg-neutral-100 border border-neutral-200 rounded-lg py-2.5 px-3.5 text-neutral-500 text-sm font-medium cursor-not-allowed"
                readonly
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Matrícula</label>
              <input
                type="text"
                v-model="matriculaFormatada"
                maxlength="9"
                class="w-full bg-neutral-100 border border-neutral-200 rounded-lg py-2.5 px-3.5 text-neutral-500 text-sm font-medium cursor-not-allowed"
                readonly
              />
            </div>
          </div>

          <div class="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">CPF</label>
              <input
                type="text"
                v-model="cpfFormatado"
                maxlength="14"
                class="w-full bg-neutral-100 border border-neutral-200 rounded-lg py-2.5 px-3.5 text-neutral-500 text-sm font-medium cursor-not-allowed"
                readonly
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Sexo</label>
              <input
                type="text"
                v-model="form.sexo"
                class="w-full bg-neutral-100 border border-neutral-200 rounded-lg py-2.5 px-3.5 text-neutral-500 text-sm font-medium cursor-not-allowed"
                readonly
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2"
                >Data de Nascimento</label
              >
              <!-- <input
                type="date"
                v-model="form.datanascimento"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('datanascimento')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('datanascimento')"
              /> -->
              <input
                type="date"
                v-model="form.datanascimento"
                class="w-full bg-neutral-100 border border-neutral-200 rounded-lg py-2.5 px-3.5 text-neutral-500 text-sm font-medium cursor-not-allowed"
                readonly
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2"
                >Orientação Sexual / Identidade de Gênero</label
              >
              <select
                v-model="form.orientacao"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('orientacao')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('orientacao')"
                required
              >
                <option value="">Selecione</option>
                <option value="HE">Heterossexual</option>
                <option value="HO">Homossexual</option>
                <option value="BI">Bissexual</option>
                <option value="AS">Assexual</option>
                <option value="PA">Pansexual</option>
                <option value="QU">Queer</option>
                <option value="CI">Cisgênero</option>
                <option value="TR">Transgênero</option>
                <option value="NB">Não binário</option>
                <option value="IN">Intersexual</option>
                <option value="OU">Outro / Prefiro não informar</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Card: Filiação e Documentos -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 lg:p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Filiação e Documentos
          </h2>

          <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2 mb-5">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Nome do Pai</label>
              <input
                type="text"
                v-model="form.pai"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('pai')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('pai')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Nome da Mãe</label>
              <input
                type="text"
                v-model="form.mae"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('mae')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('mae')"
              />
            </div>
          </div>

          <div class="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-5">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">PASEP</label>
              <input
                type="text"
                v-model="pasepFormatado"
                @input="formatarPASEP"
                maxlength="15"
                placeholder="000.00000.00-0"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('pasep')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('pasep')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Reservista</label>
              <input
                type="text"
                v-model="form.reservista"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('reservista')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('reservista')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">CNH</label>
              <input
                type="text"
                v-model="cnhFormatada"
                @input="formatarCNH"
                maxlength="14"
                placeholder="000.000.000-00"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('numerocnh')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('numerocnh')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Categoria CNH</label>
              <input
                type="text"
                v-model="form.categoriacnh"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('categoriacnh')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('categoriacnh')"
              />
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-5">
            <div class="sm:col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-neutral-700 mb-2"
                >Título de Eleitor</label
              >
              <input
                type="text"
                v-model="tituloFormatado"
                @input="formatarTitulo"
                maxlength="14"
                placeholder="0000 0000 0000"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('titulonumero')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('titulonumero')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Zona</label>
              <input
                type="text"
                v-model="form.titulozona"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('titulozona')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('titulozona')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Seção</label>
              <input
                type="text"
                v-model="form.titulosecao"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('titulosecao')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('titulosecao')"
              />
            </div>
          </div>
        </div>

        <!-- Card: Características Pessoais -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 lg:p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Características Pessoais
          </h2>

          <div class="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Nacionalidade</label>
              <input
                type="text"
                v-model="form.nacionalidade"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('nacionalidade')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('nacionalidade')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Naturalidade</label>
              <input
                type="text"
                v-model="form.naturalidade"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('naturalidade')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('naturalidade')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Cor/Raça (IBGE)</label>
              <select
                v-model="form.cor_raca"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('grauinstrucao')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('cor_raca')"
                required
              >
                <option value="">Selecione</option>
                <option value="Preto">Preto</option>
                <option value="Pardo">Pardo</option>
                <option value="Branco">Branco</option>
                <option value="Indigena">Indígena</option>
                <option value="Amarelo">Amarelo</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Religião</label>
              <select
                v-model="form.religiao"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('religiao')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('religiao')"
                required
              >
                <option value="">Selecione</option>
                <option value="CA">Catolicismo</option>
                <option value="PR">Protestantismo</option>
                <option value="AD">Adventismo</option>
                <option value="MO">Mormonismo</option>
                <option value="TE">Testemunhas de Jeová</option>
                <option value="ES">Espiritismo</option>
                <option value="JU">Judaísmo</option>
                <option value="IS">Islamismo</option>
                <option value="BU">Budismo</option>
                <option value="HI">Hinduísmo</option>
                <option value="MA">Religiões de matriz africana</option>
                <option value="SR">Sem religião</option>
                <option value="OU">Outra</option>
              </select>
            </div>
          </div>

          <div class="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Tipo Sanguíneo</label>
              <select
                v-model="form.tiposanguineo"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('tiposanguineo')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('tiposanguineo')"
              >
                <option value="">Selecione</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Fator RH</label>
              <select
                v-model="form.fator_rh"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('fator_rh')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('fator_rh')"
              >
                <option value="">Selecione</option>
                <option value="Positivo">Positivo</option>
                <option value="Negativo">Negativo</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Alergia</label>
              <input
                type="text"
                v-model="form.alergia"
                placeholder="Descreva se houver"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('alergia')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20 placeholder:text-neutral-400'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('alergia')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Escolaridade</label>
              <select
                v-model="form.grauinstrucao"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('grauinstrucao')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('grauinstrucao')"
                required
              >
                <option value="">Selecione</option>
                <option value="MC">Médio Completo</option>
                <option value="SC">Superior Completo</option>
                <option value="ES">Especialista</option>
                <option value="ME">Mestrado</option>
                <option value="DO">Doutorado</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Card: Uniforme -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 lg:p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
            Uniforme
          </h2>

          <!-- Alerta de Prazo -->
          <div class="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3 mb-3">
            <div class="flex items-start">
              <svg
                class="h-6 w-6 text-red-500 mr-3 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 class="text-md font-semibold text-red-800 mb-1">
                  Prazo para preenchimento das informações de uniforme
                </h3>
                <p class="text-sm text-red-700">
                  <strong>Atenção:</strong> os dados referentes ao uniforme (Tamanho da Camisa,
                  Numeração da Calça, Numeração da Bota, Tamanho do Colete e Tamanho da Combat
                  Shirt) estarão disponíveis para edição somente até
                  <strong>domingo, 02/11/2025 às 23:59</strong>. Após esse horário, não será mais
                  possível realizar alterações.
                </p>
              </div>
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2"
                >Tamanho da Camisa Polo</label
              >
              <select
                v-model="form.tamanhocamisa"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('tamanhocamisa')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('tamanhocamisa')"
              >
                <option value="">Selecione</option>
                <option value="PP">PP</option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
                <option value="XG">XG</option>
                <option value="XGG">XGG</option>
                <option value="EG">EG</option>
                <option value="EGG">EGG</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2"
                >Numeração da Calça</label
              >
              <input
                type="number"
                v-model="form.numeracao_calcas"
                placeholder="Ex: 42"
                min="36"
                max="66"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('numeracao_calcas')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('numeracao_calcas')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2"
                >Numeração da Bota</label
              >
              <input
                type="number"
                v-model="form.numeracao_botas"
                placeholder="Ex: 42"
                min="33"
                max="46"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('numeracao_botas')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('numeracao_botas')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2"
                >Tamanho do Colete</label
              >
              <select
                v-model="form.tamanho_colete"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('tamanho_colete')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('tamanho_colete')"
              >
                <option value="">Selecione</option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2"
                >Tamanho da Combat Shirt</label
              >
              <select
                v-model="form.tamanho_combat_shirt"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('tamanho_combat_shirt')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('tamanho_combat_shirt')"
              >
                <option value="">Selecione</option>
                <option value="PP">PP</option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
                <option value="XG">XG</option>
                <option value="XGG">XGG</option>
              </select>
            </div>

            <!-- <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Tipo de Bota</label>
              <select
                v-model="form.tipo_bota"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('tipo_bota')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('tipo_bota')"
              >
                <option value="">Selecione</option>
                <option value="curto">Cano Curto</option>
                <option value="medio">Cano Longo</option>
              </select>
            </div> -->
          </div>

          <!-- Banner de Medidas -->
          <div
            class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5 flex items-center gap-3 mt-3"
          >
            <svg
              class="w-5 h-5 text-blue-600 shrink-0"
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
            <p class="text-sm text-blue-900">
              Não sabe seu tamanho?
              <a
                href="https://drive.sesds.pb.gov.br/index.php/s/kF84qLF2azcPyAD"
                target="_blank"
                rel="noopener noreferrer"
                class="font-semibold underline hover:text-blue-700"
              >
                Consulte a tabela de medidas aqui
              </a>
            </p>
          </div>
        </div>

        <!-- Card: Contato -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 lg:p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Contato
          </h2>

          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Telefone 1
                <!-- <span class="text-red-500">*</span> -->
              </label>
              <input
                type="text"
                v-model="telefone1Formatado"
                @input="formatarTelefone($event, 'telefone_1')"
                maxlength="15"
                placeholder="(00) 00000-0000"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.telefone_1
                    ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                    : canEdit('telefone_1')
                      ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                      : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('telefone_1')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Telefone 2
                <!-- <span class="text-red-500">*</span> -->
              </label>
              <input
                type="text"
                v-model="telefone2Formatado"
                @input="formatarTelefone($event, 'telefone_2')"
                maxlength="15"
                placeholder="(00) 00000-0000"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.telefone_2
                    ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                    : canEdit('telefone_2')
                      ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                      : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('telefone_2')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                E-mail
                <!-- <span class="text-red-500">*</span> -->
              </label>
              <input
                type="email"
                v-model="form.email"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  errors.email
                    ? 'border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:ring-opacity-20'
                    : canEdit('email')
                      ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                      : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('email')"
              />
            </div>
          </div>
        </div>

        <!-- Card: Endereço -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 lg:p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Endereço
          </h2>

          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-6 mb-5">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">CEP</label>
              <input
                type="text"
                v-model="cepFormatado"
                @input="formatarCEP"
                maxlength="9"
                placeholder="00000-000"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('cep')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('cep')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">UF</label>
              <select
                v-model="form.estado"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('estado')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('estado')"
              >
                <option value="">Selecione</option>
                <option
                  v-for="estado in servidorStore.estados"
                  :key="estado.codigo"
                  :value="estado.sigla"
                >
                  {{ estado.sigla }} - {{ estado.nome }}
                </option>
              </select>
            </div>

            <div class="sm:col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Cidade</label>
              <select
                v-model="form.cidade"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('cidade')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('cidade') || !form.estado"
              >
                <option value="">Selecione uma cidade</option>
                <option
                  v-for="cidade in cidadesFiltradas"
                  :key="cidade.codigo"
                  :value="cidade.codigo"
                >
                  {{ cidade.nome }}
                </option>
              </select>
            </div>

            <div class="sm:col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Bairro</label>
              <input
                type="text"
                v-model="form.bairro"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('bairro')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('bairro')"
              />
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            <div class="sm:col-span-1 md:col-span-4">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Rua</label>
              <input
                type="text"
                v-model="form.rua"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('rua')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('rua')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Número</label>
              <input
                type="text"
                v-model="form.numero"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('numero')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('numero')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Complemento</label>
              <input
                type="text"
                v-model="form.complemento"
                placeholder="Opcional"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('complemento')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20 placeholder:text-neutral-400'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('complemento')"
              />
            </div>
          </div>
        </div>

        <!-- Card: Estado Civil -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-4 sm:p-5 lg:p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Estado Civil
          </h2>

          <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Estado Civil</label>
              <select
                v-model="form.estadocivil"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('estadocivil')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('estadocivil')"
              >
                <option value="">Selecione</option>
                <option value="S">Solteiro(a)</option>
                <option value="C">Casado(a)</option>
                <option value="U">União Estável</option>
                <option value="D">Divorciado(a)</option>
                <option value="V">Viúvo(a)</option>
              </select>
            </div>

            <div v-if="temConjuge()">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Nome do Cônjuge</label>
              <input
                type="text"
                v-model="form.conjuge"
                placeholder="Se aplicável"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('conjuge')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20 placeholder:text-neutral-400'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('conjuge')"
                required
              />
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2 mt-5" v-if="temConjuge()">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">CPF do Cônjuge</label>
              <input
                type="text"
                v-model="conjugeCpfFormatado"
                @input="formatarCpfConjuge"
                maxlength="14"
                placeholder="000.000.000-00"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('conjuge_cpf')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20 placeholder:text-neutral-400'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('conjuge_cpf')"
                required
              />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-3">
          <button
            type="button"
            @click="resetForm"
            class="w-full sm:w-auto px-6 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 order-2 sm:order-1"
          >
            Cancelar
          </button>

          <button
            type="submit"
            :disabled="servidorStore.loading"
            class="w-full sm:w-auto px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:bg-neutral-950 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900 order-1 sm:order-2"
          >
            <span v-if="servidorStore.loading">Salvando...</span>
            <span v-else>Salvar Alterações</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Toast de notificação -->
    <Transition name="toast">
      <div
        v-if="showToast"
        :class="[
          'fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 flex items-start gap-3 w-auto sm:w-full sm:max-w-sm p-4 rounded-lg shadow-xl border-2 z-50 backdrop-blur-sm',
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
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { useServidorStore } from '@/stores/servidor'
import { inject } from 'vue'

//Pegando usuário autenticado pelo Composable
const authUser = inject('authUser')
const { user } = authUser

const servidorStore = useServidorStore()

// Toast
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Formulário
const form = reactive({
  id: null,
  nome: '',
  matricula: '',
  cargo: '',
  cpf: '',
  sexo: '',
  orientacao: '',
  datanascimento: '',
  reservista: '',
  pai: '',
  mae: '',
  pasep: '',
  alergia: '',
  nacionalidade: '',
  religiao: '',
  naturalidade: '',
  tiposanguineo: '',
  fator_rh: '',
  titulonumero: '',
  titulozona: '',
  titulosecao: '',
  tamanho_colete: '',
  numerocnh: '',
  categoriacnh: '',
  grauinstrucao: '',
  tamanhocamisa: '',
  numeracao_botas: '',
  tipo_bota: '',
  numeracao_calcas: '',
  tamanho_combat_shirt: '',
  cor_raca: '',
  telefone_1: '',
  telefone_2: '',
  email: '',
  cep: '',
  estado: '',
  cidade: '',
  bairro: '',
  rua: '',
  numero: '',
  complemento: '',
  estadocivil: '',
  conjuge: '',
  conjuge_cpf: '',
})

const errors = reactive({})

// Variáveis para valores formatados (apenas exibição)
const cpfFormatado = ref('')
const matriculaFormatada = ref('')
const telefone1Formatado = ref('')
const telefone2Formatado = ref('')
const cepFormatado = ref('')
const pasepFormatado = ref('')
const cnhFormatada = ref('')
const tituloFormatado = ref('')
const conjugeCpfFormatado = ref('')

// Computed para cidades filtradas por estado
const cidadesFiltradas = computed(() => {
  return servidorStore.cidades || []
})

// Função para formatar CPF: 000.000.000-00
const formatarCPF = (event) => {
  let valor = event.target.value.replace(/\D/g, '')
  valor = valor.substring(0, 11)

  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  cpfFormatado.value = valor
  form.cpf = valor.replace(/\D/g, '')
}

// Função para formatar CPF do Cônjuge: 000.000.000-00
const formatarCpfConjuge = (event) => {
  let valor = event.target.value.replace(/\D/g, '')
  valor = valor.substring(0, 11)

  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  conjugeCpfFormatado.value = valor
  form.conjuge_cpf = valor.replace(/\D/g, '')
}

// Função para formatar Matrícula: 000.000-0
const formatarMatricula = (event) => {
  let valor = event.target.value.replace(/\D/g, '')
  valor = valor.substring(0, 7)

  if (valor.length <= 7) {
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d{1})$/, '$1-$2')
  }

  matriculaFormatada.value = valor
  form.matricula = valor.replace(/\D/g, '')
}

// Função para formatar Telefone: (00) 00000-0000 ou (00) 0000-0000
const formatarTelefone = (event, campo) => {
  let valor = event.target.value.replace(/\D/g, '')
  valor = valor.substring(0, 11)

  if (valor.length <= 11) {
    if (valor.length <= 10) {
      // Telefone fixo: (00) 0000-0000
      valor = valor.replace(/(\d{2})(\d)/, '($1) $2')
      valor = valor.replace(/(\d{4})(\d{1,4})$/, '$1-$2')
    } else {
      // Celular: (00) 00000-0000
      valor = valor.replace(/(\d{2})(\d)/, '($1) $2')
      valor = valor.replace(/(\d{5})(\d{1,4})$/, '$1-$2')
    }
  }

  if (campo === 'telefone_1') {
    telefone1Formatado.value = valor
    form.telefone_1 = valor.replace(/\D/g, '')
  } else if (campo === 'telefone_2') {
    telefone2Formatado.value = valor
    form.telefone_2 = valor.replace(/\D/g, '')
  }
}

// Função para formatar CEP: 00000-000
const formatarCEP = (event) => {
  let valor = event.target.value.replace(/\D/g, '')
  valor = valor.substring(0, 8)

  if (valor.length <= 8) {
    valor = valor.replace(/(\d{5})(\d{1,3})$/, '$1-$2')
  }

  cepFormatado.value = valor
  form.cep = valor.replace(/\D/g, '')
}

// Função para formatar PASEP: 000.00000.00-0
const formatarPASEP = (event) => {
  let valor = event.target.value.replace(/\D/g, '')
  valor = valor.substring(0, 11)

  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})\.(\d{5})(\d)/, '$1.$2.$3')
    valor = valor.replace(/(\d{3})\.(\d{5})\.(\d{2})(\d{1})$/, '$1.$2.$3-$4')
  }

  pasepFormatado.value = valor
  form.pasep = valor.replace(/\D/g, '')
}

// Função para formatar CNH: 000.000.000-00
const formatarCNH = (event) => {
  let valor = event.target.value.replace(/\D/g, '')
  valor = valor.substring(0, 11)

  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    valor = valor.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, '$1.$2.$3-$4')
  }

  cnhFormatada.value = valor
  form.numerocnh = valor.replace(/\D/g, '')
}

// Função para formatar Título de Eleitor: 0000 0000 0000
const formatarTitulo = (event) => {
  let valor = event.target.value.replace(/\D/g, '')
  valor = valor.substring(0, 12)

  if (valor.length <= 12) {
    valor = valor.replace(/(\d{4})(\d)/, '$1 $2')
    valor = valor.replace(/(\d{4}) (\d{4})(\d)/, '$1 $2 $3')
  }

  tituloFormatado.value = valor
  form.titulonumero = valor.replace(/\D/g, '')
}

// Observar mudanças no estado para limpar a cidade
watch(
  () => form.estado,
  async (novoEstado, estadoAnterior) => {
    if (novoEstado !== estadoAnterior) {
      form.cidade = ''

      if (novoEstado) {
        const estadoObj = servidorStore.estados.find((e) => e.sigla === novoEstado)
        if (estadoObj) {
          await servidorStore.carregarCidadesPorEstado(estadoObj.codigo)
        }
      } else {
        servidorStore.cidades = []
      }
    }
  },
)

// Carregar dados do servidor
const carregarDados = async () => {
  const matricula = user.value?.matricula || null

  if (!matricula) {
    showToastMessage('Erro: Matrícula não encontrada. Faça login novamente.', 'error')
    return
  }

  const result = await servidorStore.carregarServidor(matricula)

  if (result.success && result.data) {
    preencherForm(result.data)
  } else {
    showToastMessage(result.message || 'Erro ao carregar dados', 'error')
  }
}

// Preencher formulário com dados do servidor
const preencherForm = async (dadosServidor) => {
  if (!dadosServidor) return

  const dados = dadosServidor

  // Limpa o formulário primeiro
  Object.keys(form).forEach((key) => {
    form[key] = ''
  })

  // Preenche com os novos dados (converte null para string vazia)
  Object.keys(form).forEach((key) => {
    if (dados[key] !== undefined && dados[key] !== null) {
      form[key] = dados[key]
    } else {
      form[key] = '' // Garante que null vira string vazia
    }
  })

  // ID do servidor
  if (dados.id) {
    form.id = dados.id
  }

  // Cargo
  if (dados.cargo_nome?.nome) {
    form.cargo = dados.cargo_nome.nome
  } else if (dados.cargo) {
    form.cargo = dados.cargo
  }

  // Estado
  if (dados.estado) {
    const estadoEncontrado = servidorStore.estados.find((est) => est.sigla === dados.estado)

    if (estadoEncontrado) {
      form.estado = estadoEncontrado.sigla

      // AGUARDA carregar as cidades ANTES de preencher a cidade
      await servidorStore.carregarCidadesPorEstado(estadoEncontrado.codigo)
    }
  }

  // Cidade
  if (dados.cidade_nome?.codigo) {
    form.cidade = dados.cidade_nome.codigo
  } else if (dados.cidade) {
    form.cidade = dados.cidade
  }

  // Data de nascimento
  if (dados.datanascimento) {
    form.datanascimento = formatarDataParaInput(dados.datanascimento)
  }

  // Formatar campos com máscara (apenas exibição)
  if (dados.cpf) {
    let cpf = dados.cpf.replace(/\D/g, '')
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    cpfFormatado.value = cpf
  }

  if (dados.matricula) {
    let matricula = dados.matricula.toString().replace(/\D/g, '')

    // Garantir que tem no máximo 7 dígitos, 000.000-0
    matricula = matricula.substring(0, 7)

    if (matricula.length === 7) {
      matricula = matricula.replace(/^(\d{3})(\d{3})(\d{1})$/, '$1.$2-$3')
    } else if (matricula.length > 3) {
      // Caso a matrícula carregada não tenha 7 dígitos (ex: apenas 5), mostra 123.45
      matricula = matricula.replace(/^(\d{3})(\d+)$/, '$1.$2')
    }

    matriculaFormatada.value = matricula
  }

  if (dados.telefone_1) {
    let tel = dados.telefone_1.replace(/\D/g, '')
    if (tel.length <= 10) {
      tel = tel.replace(/(\d{2})(\d)/, '($1) $2')
      tel = tel.replace(/(\d{4})(\d{1,4})$/, '$1-$2')
    } else {
      tel = tel.replace(/(\d{2})(\d)/, '($1) $2')
      tel = tel.replace(/(\d{5})(\d{1,4})$/, '$1-$2')
    }
    telefone1Formatado.value = tel
  }

  if (dados.telefone_2) {
    let tel = dados.telefone_2.replace(/\D/g, '')
    if (tel.length <= 10) {
      tel = tel.replace(/(\d{2})(\d)/, '($1) $2')
      tel = tel.replace(/(\d{4})(\d{1,4})$/, '$1-$2')
    } else {
      tel = tel.replace(/(\d{2})(\d)/, '($1) $2')
      tel = tel.replace(/(\d{5})(\d{1,4})$/, '$1-$2')
    }
    telefone2Formatado.value = tel
  }

  if (dados.cep) {
    let cep = dados.cep.replace(/\D/g, '')
    cep = cep.replace(/(\d{5})(\d{1,3})$/, '$1-$2')
    cepFormatado.value = cep
  }

  if (dados.pasep) {
    let pasep = dados.pasep.replace(/\D/g, '')
    pasep = pasep.replace(/(\d{3})(\d)/, '$1.$2')
    pasep = pasep.replace(/(\d{3})\.(\d{5})(\d)/, '$1.$2.$3')
    pasep = pasep.replace(/(\d{3})\.(\d{5})\.(\d{2})(\d{1})$/, '$1.$2.$3-$4')
    pasepFormatado.value = pasep
  }

  if (dados.numerocnh) {
    let cnh = dados.numerocnh.replace(/\D/g, '')
    cnh = cnh.replace(/(\d{3})(\d)/, '$1.$2')
    cnh = cnh.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    cnh = cnh.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, '$1.$2.$3-$4')
    cnhFormatada.value = cnh
  }

  if (dados.titulonumero) {
    let titulo = dados.titulonumero.replace(/\D/g, '')
    titulo = titulo.replace(/(\d{4})(\d)/, '$1 $2')
    titulo = titulo.replace(/(\d{4}) (\d{4})(\d)/, '$1 $2 $3')
    tituloFormatado.value = titulo
  }

  if (dados.conjuge_cpf) {
    let conjuge_cpf = dados.conjuge_cpf.replace(/\D/g, '')
    conjuge_cpf = conjuge_cpf.replace(/(\d{3})(\d)/, '$1.$2')
    conjuge_cpf = conjuge_cpf.replace(/(\d{3})(\d)/, '$1.$2')
    conjuge_cpf = conjuge_cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    conjugeCpfFormatado.value = conjuge_cpf
  }
}

// Formatar data para input type="date"
const formatarDataParaInput = (data) => {
  if (!data) return ''

  // Se já está no formato YYYY-MM-DD, retorna direto
  if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return data
  }

  // Se está no formato DD/MM/YYYY
  if (data.includes('/')) {
    const [dia, mes, ano] = data.split('/')
    const dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
    return dataFormatada
  }

  // Se está no formato YYYY-MM-DD HH:mm:ss (datetime)
  if (data.includes('-') && data.includes(' ')) {
    const dataFormatada = data.split(' ')[0]
    return dataFormatada
  }

  // Tenta criar uma data e formatar
  try {
    const date = new Date(data)
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const dataFormatada = `${year}-${month}-${day}`
      return dataFormatada
    }
  } catch (e) {
    console.error('Erro ao formatar data:', e)
  }

  return data
}

const validarCPF = (cpf) => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '')

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) {
    return false
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false
  }

  // Validação do primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.charAt(9))) {
    return false
  }

  // Validação do segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.charAt(10))) {
    return false
  }

  return true
}

const updateDados = async () => {
  try {
    // Limpa erros anteriores
    Object.keys(errors).forEach((key) => delete errors[key])

    const matricula = user.value?.matricula || null

    if (!matricula) {
      showToastMessage('Erro: Matrícula não encontrada. Faça login novamente.', 'error')
      return
    }

    if (temConjuge()) {
      const cpf = form.conjuge_cpf
      // Se o campo for preenchido (ou seja, não for vazio), ele deve ser válido
      if (cpf && cpf.trim() !== '') {
        // Usa a função validarCPF copiada
        if (!validarCPF(cpf)) {
          // Se inválido, adiciona o erro ao objeto errors e para o envio
          errors.conjuge_cpf = ['CPF do Cônjuge inválido. Por favor, verifique o número digitado.']
          showToastMessage(
            'CPF do Cônjuge inválido. Por favor, verifique o número digitado.',
            'error',
          )
          return
        }
      }
    }

    // Prepara os dados para envio
    const dadosParaEnviar = {
      matricula: matricula,
      ...form,
    }

    const result = await servidorStore.atualizarServidor(dadosParaEnviar)

    if (result.success) {
      showToastMessage(result.message || 'Dados atualizados com sucesso!', 'success')
    } else {
      if (result.errors) {
        Object.assign(errors, result.errors)
      }
      showToastMessage(result.message || 'Erro ao atualizar dados', 'error')
    }
  } catch {
    showToastMessage('Erro ao atualizar dados', 'error')
  }
}

const resetForm = () => {
  // Reseta com dados originais do servidor
  if (servidorStore.servidor) {
    preencherForm(servidorStore.servidor)
  }

  // Limpa erros
  Object.keys(errors).forEach((key) => delete errors[key])
  showToastMessage('Alterações canceladas', 'success')
}

//Comentar o campo que deseja deixar desativado para o usuário
const canEdit = (field) => {
  const editableFields = [
    'orientacao',
    'datanascimento',
    'reservista',
    'pai',
    'mae',
    'pasep',
    'alergia',
    'nacionalidade',
    'religiao',
    'naturalidade',
    'tiposanguineo',
    'fator_rh',
    'titulonumero',
    'titulozona',
    'titulosecao',
    'tamanho_colete', //desativar aqui
    'numeracao_botas', //desativar aqui
    //'tipo_bota', //desativar aqui
    'numeracao_calcas', //desativar aqui
    'tamanho_combat_shirt', //desativar aqui
    'numerocnh',
    'categoriacnh',
    'grauinstrucao',
    'tamanhocamisa', //desativar aqui
    'cor_raca',
    'telefone_1',
    'telefone_2',
    'email',
    'cep',
    'estado',
    'cidade',
    'bairro',
    'rua',
    'numero',
    'complemento',
    'estadocivil',
    'conjuge',
    'conjuge_cpf',
  ]
  return editableFields.includes(field)
}

// Função para verificar se o estado civil implica ter um cônjuge
const temConjuge = () => {
  const estadosComConjuge = ['C', 'U'] // C: Casado(a), U: União Estável
  return estadosComConjuge.includes(form.estadocivil)
}

const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true

  setTimeout(() => {
    hideToast()
  }, 5000)
}

const hideToast = () => {
  showToast.value = false
}

// Carregar dados ao montar componente
onMounted(async () => {
  // carrega estados (ANTES de carregar o servidor!)
  await servidorStore.carregarEstados()

  //  carrega dados do servidor
  await carregarDados()

  //Se já tem estado, carrega as cidades
  if (form.estado) {
    const estadoObj = servidorStore.estados.find((e) => e.sigla === form.estado)

    if (estadoObj) {
      await servidorStore.carregarCidadesPorEstado(estadoObj.codigo)
    }
  }
})
</script>

<style scoped>
input:focus,
select:focus {
  outline: none;
}

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
