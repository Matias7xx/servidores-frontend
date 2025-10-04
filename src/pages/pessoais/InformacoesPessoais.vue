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
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-neutral-900">Informações Pessoais</h1>
        <p class="text-sm text-neutral-500 mt-1.5">Atualize seus dados cadastrais</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="updateDados" class="space-y-5">
        <!-- Card: Dados Básicos -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Dados Básicos
          </h2>

          <div class="grid gap-5 md:grid-cols-3 mb-5">
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
                :value="servidorStore.servidor?.cargo_nome?.nome"
                class="w-full bg-neutral-100 border border-neutral-200 rounded-lg py-2.5 px-3.5 text-neutral-500 text-sm font-medium cursor-not-allowed"
                readonly
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Matrícula</label>
              <input
                type="text"
                :value="servidorStore.servidor?.matricula"
                class="w-full bg-neutral-100 border border-neutral-200 rounded-lg py-2.5 px-3.5 text-neutral-500 text-sm font-medium cursor-not-allowed"
                readonly
              />
            </div>
          </div>

          <div class="grid gap-5 md:grid-cols-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">CPF</label>
              <input
                type="text"
                v-model="form.cpf"
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
              <input
                type="date"
                v-model="form.datanascimento"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('datanascimento')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('datanascimento')"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2"
                >Orientação Sexual</label
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
              >
                <option value="">Selecione</option>
                <option value="HE">Heterossexual</option>
                <option value="HO">Homossexual</option>
                <option value="BI">Bissexual</option>
                <option value="OU">Outros</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Card: Filiação e Documentos -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Filiação e Documentos
          </h2>

          <div class="grid gap-5 md:grid-cols-2 mb-5">
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

          <div class="grid gap-5 md:grid-cols-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">PASEP</label>
              <input
                type="text"
                v-model="form.pasep"
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
                v-model="form.numerocnh"
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
        </div>

        <!-- Card: Características Pessoais -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Características Pessoais
          </h2>

          <div class="grid gap-5 md:grid-cols-4 mb-5">
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
              <input
                type="text"
                v-model="form.cor_raca"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('cor_raca')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :readonly="!canEdit('cor_raca')"
              />
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
              >
                <option value="">Selecione</option>
                <option value="CA">Catolicismo</option>
                <option value="PR">Protestantismo</option>
                <option value="AD">Adventismo</option>
                <option value="MO">Mormonismo</option>
                <option value="TE">Testemunhas de Jeová</option>
                <option value="ES">Espiritismo</option>
                <option value="OU">Outra</option>
              </select>
            </div>
          </div>

          <div class="grid gap-5 md:grid-cols-4">
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
              >
                <option value="">Selecione</option>
                <option value="FU">Fundamental Completo</option>
                <option value="MI">Médio Incompleto</option>
                <option value="MC">Médio Completo</option>
                <option value="SI">Superior Incompleto</option>
                <option value="SC">Superior Completo</option>
                <option value="ES">Especialista</option>
                <option value="ME">Mestrado</option>
                <option value="DO">Doutorado</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Card: Dados Eleitorais e Uniformes -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Dados Eleitorais e Uniformes
          </h2>

          <div class="grid gap-5 md:grid-cols-5 mb-5">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-neutral-700 mb-2"
                >Título de Eleitor</label
              >
              <input
                type="text"
                v-model="form.titulonumero"
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

          <div class="grid gap-5 md:grid-cols-3">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Tamanho Camisa</label>
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
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Tamanho Colete</label>
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
                <option value="EG">EG</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Card: Contato -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Contato
          </h2>

          <div class="grid gap-5 md:grid-cols-3">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Telefone 1 <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="form.telefone_1"
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
              <span v-if="errors.email" class="text-red-600 text-xs mt-1.5 block">{{
                errors.email[0]
              }}</span>
            </div>
          </div>
        </div>

        <!-- Card: Endereço -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Endereço
          </h2>

          <div class="grid gap-5 md:grid-cols-6 mb-5">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">CEP</label>
              <input
                type="text"
                v-model="form.cep"
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
                  :value="estado.nome"
                >
                  {{ estado.nome }}
                </option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Cidade</label>
              <select
                v-model="form.cidade_id"
                :class="[
                  'w-full border rounded-lg py-2.5 px-3.5 text-sm transition-all duration-200',
                  canEdit('cidade_id')
                    ? 'bg-white border-neutral-300 text-neutral-900 hover:border-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:ring-opacity-20'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-500 font-medium cursor-not-allowed',
                ]"
                :disabled="!canEdit('cidade_id')"
              >
                <option value="">Selecione</option>
                <option
                  v-for="cidade in servidorStore.cidades"
                  :key="cidade.id"
                  :value="cidade.codigo"
                >
                  {{ cidade.nome }}
                </option>
              </select>
            </div>

            <div class="md:col-span-2">
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

          <div class="grid gap-5 md:grid-cols-6">
            <div class="md:col-span-4">
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
        <div class="bg-white rounded-lg border border-neutral-200 shadow-sm p-6">
          <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-5">
            Estado Civil
          </h2>

          <div class="grid gap-5 md:grid-cols-2">
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

            <div>
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
              />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200"
          >
            Cancelar
          </button>

          <button
            type="submit"
            :disabled="servidorStore.loading"
            class="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 active:bg-neutral-950 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
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
          'fixed bottom-6 right-6 flex items-start gap-3 w-full max-w-sm p-4 rounded-lg shadow-xl border-2 z-50 backdrop-blur-sm',
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
import { ref, reactive, onMounted } from 'vue'
import { useServidorStore } from '@/stores/servidor'

// Stores
const servidorStore = useServidorStore()

// Toast
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Formulário
const form = reactive({
  nome: '',
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
  cor_raca: '',
  telefone_1: '',
  telefone_2: '',
  email: '',
  cep: '',
  estado: '',
  cidade_id: '',
  bairro: '',
  rua: '',
  numero: '',
  complemento: '',
  estadocivil: '',
  conjuge: '',
})

const errors = reactive({})

// Métodos
const fetchData = async () => {
  try {
    await servidorStore.carregarServidor()

    if (servidorStore.servidor) {
      Object.keys(form).forEach((key) => {
        if (key === 'estado') {
          const estadoSalvo = servidorStore.servidor.estado
          if (estadoSalvo && estadoSalvo.length === 2) {
            form[key] = estadoSalvo
          } else if (estadoSalvo) {
            const estadoEncontrado = servidorStore.estados.find(
              (e) => e.codigo == estadoSalvo || e.id == estadoSalvo,
            )
            form[key] = estadoEncontrado ? estadoEncontrado.nome : estadoSalvo
          } else {
            form[key] = ''
          }
        } else if (key === 'cidade_id') {
          form[key] = servidorStore.servidor.cidade || ''
        } else {
          form[key] = servidorStore.servidor[key] || ''
        }
      })
    }
  } catch (err) {
    console.error('Erro ao carregar dados:', err)
    showToastMessage('Erro ao carregar dados do servidor', 'error')
  }
}

const updateDados = async () => {
  try {
    Object.keys(errors).forEach((key) => delete errors[key])

    const result = await servidorStore.atualizarServidor({
      id: servidorStore.servidor.id,
      ...form,
    })

    if (result.success) {
      showToastMessage(result.message || 'Dados atualizados com sucesso!', 'success')
      await fetchData()
    } else {
      if (result.errors) {
        Object.assign(errors, result.errors)
      }
      showToastMessage(result.message || 'Erro ao atualizar dados', 'error')
    }
  } catch (err) {
    console.error('Erro ao atualizar:', err)
    showToastMessage('Erro ao atualizar dados', 'error')
  }
}

const resetForm = () => {
  if (servidorStore.servidor) {
    Object.keys(form).forEach((key) => {
      if (key === 'estado') {
        const estadoSalvo = servidorStore.servidor.estado
        if (estadoSalvo && estadoSalvo.length === 2) {
          form[key] = estadoSalvo
        } else if (estadoSalvo) {
          const estadoEncontrado = servidorStore.estados.find(
            (e) => e.codigo == estadoSalvo || e.id == estadoSalvo,
          )
          form[key] = estadoEncontrado ? estadoEncontrado.nome : estadoSalvo
        } else {
          form[key] = ''
        }
      } else if (key === 'cidade_id') {
        form[key] = servidorStore.servidor.cidade || ''
      } else {
        form[key] = servidorStore.servidor[key] || ''
      }
    })
  }
  Object.keys(errors).forEach((key) => delete errors[key])
  showToastMessage('Alterações canceladas', 'success')
}

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
    'tamanho_colete',
    'numerocnh',
    'categoriacnh',
    'grauinstrucao',
    'tamanhocamisa',
    'cor_raca',
    'telefone_1',
    'telefone_2',
    'email',
    'cep',
    'estado',
    'cidade_id',
    'bairro',
    'rua',
    'numero',
    'complemento',
    'estadocivil',
    'conjuge',
  ]
  return editableFields.includes(field)
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

onMounted(() => {
  fetchData()
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
