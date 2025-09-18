<template>
    <div class="bg-gray-50">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-screen">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>

      <!-- Estado de Erro -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto mt-8">
        <strong class="font-bold">Erro!</strong>
        <span class="block sm:inline">{{ error }}</span>
        <button @click="error = null" class="ml-4 text-red-500 hover:text-red-700">
          Fechar
        </button>
      </div>

      <!-- Conteúdo -->
      <div v-else class="container mx-auto px-4 py-8">

        <!-- Form Container -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <!-- Form Header -->
          <div class="bg-black text-white p-4 border-l-8" style="border-left-color: rgb(193,168,90);">
            <h2 class="text-xl font-semibold">
              Atualizar Dados Pessoais
            </h2>
          </div>

          <!-- Form Content -->
          <form @submit.prevent="updateDados" class="p-6">

            <!-- Nome, Cargo e Matrícula -->
            <div class="grid gap-6 md:grid-cols-5 mb-6">
              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Nome</label>
                <input
                  type="text"
                  v-model="form.nome"
                  class="w-full border-gray-300 bg-gray-200 rounded-lg py-2 px-3 text-gray-900"
                  readonly
                >
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Cargo</label>
                <input
                  type="text"
                  :value="servidor.cargo_nome?.nome"
                  class="w-full border-gray-300 bg-gray-200 rounded-lg py-2 px-3 text-gray-900"
                  readonly
                >
              </div>

              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Matrícula</label>
                <input
                  type="text"
                  v-model="servidor.matricula"
                  class="w-full border-gray-300 bg-gray-200 rounded-lg py-2 px-3 text-gray-900"
                  readonly
                >
              </div>
            </div>

            <!-- CPF, Sexo, Orientação Sexual, Data Nascimento -->
            <div class="grid gap-6 md:grid-cols-8 mb-6">
              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">CPF</label>
                <input
                  type="text"
                  v-model="form.cpf"
                  class="w-full border-gray-300 bg-gray-200 rounded-lg py-2 px-3 text-gray-900"
                  readonly
                >
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Sexo</label>
                <input
                  type="text"
                  v-model="form.sexo"
                  class="w-full border-gray-300 bg-gray-200 rounded-lg py-2 px-3 text-gray-900"
                  readonly
                >
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Orientação Sexual</label>
                <select
                  v-model="form.orientacao"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('orientacao') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :disabled="!canEdit('orientacao')"
                >
                  <option value=""></option>
                  <option value="HE">Heterossexual</option>
                  <option value="HO">Homossexual</option>
                  <option value="BI">Bissexual</option>
                  <option value="OU">Outros</option>
                </select>
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Data Nascimento</label>
                <input
                  type="date"
                  v-model="form.datanascimento"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('datanascimento') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('datanascimento')"
                >
              </div>
            </div>

            <!-- Reservista, Pai, Mãe -->
            <div class="grid gap-6 md:grid-cols-5 mb-6">
              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Reservista</label>
                <input
                  type="text"
                  v-model="form.reservista"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('reservista') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('reservista')"
                >
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Nome do Pai</label>
                <input
                  type="text"
                  v-model="form.pai"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('pai') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('pai')"
                >
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Nome da Mãe</label>
                <input
                  type="text"
                  v-model="form.mae"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('mae') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('mae')"
                >
              </div>
            </div>

            <!-- PASEP, Alergia, Nacionalidade -->
            <div class="grid gap-6 md:grid-cols-6 mb-6">
              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Número PASEP</label>
                <input
                  type="text"
                  v-model="form.pasep"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('pasep') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('pasep')"
                >
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Possui alergia?</label>
                <input
                  type="text"
                  v-model="form.alergia"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('alergia') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('alergia')"
                >
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Nacionalidade</label>
                <input
                  type="text"
                  v-model="form.nacionalidade"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('nacionalidade') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('nacionalidade')"
                >
              </div>
            </div>

            <!-- Religião, Naturalidade, Tipo Sanguíneo, Fator RH -->
            <div class="grid gap-6 md:grid-cols-8 mb-6">
              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Religião</label>
                <select
                  v-model="form.religiao"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('religiao') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :disabled="!canEdit('religiao')"
                >
                  <option value=""></option>
                  <option value="CA">Catolicismo</option>
                  <option value="PR">Protestantismo</option>
                  <option value="AD">Adventismo</option>
                  <option value="MO">Mormonismo</option>
                  <option value="TE">Testemunhas de Jeová</option>
                  <option value="ES">Espiritismo</option>
                  <option value="OU">Outra</option>
                </select>
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Naturalidade</label>
                <input
                  type="text"
                  v-model="form.naturalidade"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('naturalidade') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('naturalidade')"
                >
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Tipo Sanguíneo</label>
                <select
                  v-model="form.tiposanguineo"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('tiposanguineo') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :disabled="!canEdit('tiposanguineo')"
                >
                  <option value=""></option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Fator RH</label>
                <select
                  v-model="form.fator_rh"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('fator_rh') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :disabled="!canEdit('fator_rh')"
                >
                  <option value=""></option>
                  <option value="Positivo">Positivo</option>
                  <option value="Negativo">Negativo</option>
                </select>
              </div>
            </div>

            <!-- Título de Eleitor, Zona, Seção, Colete -->
            <div class="grid gap-6 md:grid-cols-5 mb-6">
              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Título de Eleitor</label>
                <input
                  type="text"
                  v-model="form.titulonumero"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('titulonumero') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('titulonumero')"
                >
              </div>

              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Zona</label>
                <input
                  type="text"
                  v-model="form.titulozona"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('titulozona') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('titulozona')"
                >
              </div>

              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Seção</label>
                <input
                  type="text"
                  v-model="form.titulosecao"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('titulosecao') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('titulosecao')"
                >
              </div>

              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Colete balístico</label>
                <select
                  v-model="form.tamanho_colete"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('tamanho_colete') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :disabled="!canEdit('tamanho_colete')"
                >
                  <option value="">{{ form.tamanho_colete }}</option>
                  <option value="P">P</option>
                  <option value="M">M</option>
                  <option value="G">G</option>
                  <option value="EG">EG</option>
                </select>
              </div>
            </div>

            <!-- CNH, Categoria, Escolaridade, Tamanho Camisa -->
            <div class="grid gap-6 md:grid-cols-4 mb-6">
              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Número CNH</label>
                <input
                  type="text"
                  v-model="form.numerocnh"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('numerocnh') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('numerocnh')"
                >
              </div>

              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Categoria</label>
                <input
                  type="text"
                  v-model="form.categoriacnh"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('categoriacnh') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('categoriacnh')"
                >
              </div>

              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Escolaridade</label>
                <select
                  v-model="form.grauinstrucao"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('grauinstrucao') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :disabled="!canEdit('grauinstrucao')"
                >
                  <option value=""></option>
                  <option value="SC">Superior Completo</option>
                  <option value="SI">Superior Incompleto</option>
                  <option value="MC">Médio Completo</option>
                  <option value="MI">Médio Incompleto</option>
                  <option value="FU">Fundamental Completo</option>
                  <option value="ME">Mestrado</option>
                  <option value="DO">Doutorado</option>
                  <option value="ES">Especialista</option>
                </select>
              </div>

              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Tamanho camisa</label>
                <select
                  v-model="form.tamanhocamisa"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('tamanhocamisa') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :disabled="!canEdit('tamanhocamisa')"
                >
                  <option value="">{{ form.tamanhocamisa }}</option>
                  <option value="P">P</option>
                  <option value="M">M</option>
                  <option value="G">G</option>
                  <option value="GG">GG</option>
                </select>
              </div>
            </div>

            <!-- Cor/Raça, Telefones, Email -->
            <div class="grid gap-6 md:grid-cols-5 mb-6">
              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Cor/Raça(IBGE)</label>
                <input
                  type="text"
                  v-model="form.cor_raca"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('cor_raca') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('cor_raca')"
                >
              </div>

              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Telefone 1</label>
                <input
                  type="text"
                  v-model="form.telefone_1"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    errors.telefone_1 ? 'border-red-500 bg-red-50' : canEdit('telefone_1') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('telefone_1')"
                >
                <span v-if="errors.telefone_1" class="text-red-500 text-xs mt-1">{{ errors.telefone_1[0] }}</span>
              </div>

              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Telefone 2</label>
                <input
                  type="text"
                  v-model="form.telefone_2"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('telefone_2') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('telefone_2')"
                >
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Email</label>
                <input
                  type="email"
                  v-model="form.email"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    errors.email ? 'border-red-500 bg-red-50' : canEdit('email') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('email')"
                >
                <span v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</span>
              </div>
            </div>

            <!-- CEP, UF, Cidade, Bairro -->
            <div class="grid gap-6 md:grid-cols-6 mb-6">
              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">CEP</label>
                <input
                  type="text"
                  v-model="form.cep"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('cep') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('cep')"
                >
              </div>

            <div class="col-span-1">
  <label class="block text-sm font-medium text-black mb-2">UF</label>
  <select
    v-model="form.estado"
    :class="[
      'w-full border rounded-lg py-2 px-3 text-gray-900',
      canEdit('estado') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
    ]"
    :disabled="!canEdit('estado')"
  >
    <!-- Opção vazia -->
    <option value="">Selecione...</option>
    <!-- Lista de estados - usando nome (que contém a sigla) como value -->
    <option v-for="estado in estados" :key="estado.codigo" :value="estado.nome">
      {{ estado.nome }}
    </option>
  </select>
</div>

            <div class="col-span-2">
  <label class="block text-sm font-medium text-black mb-2">Cidade</label>
  <select
    v-model="form.cidade_id"
    :class="[
      'w-full border rounded-lg py-2 px-3 text-gray-900',
      canEdit('cidade_id') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
    ]"
    :disabled="!canEdit('cidade_id')"
  >
    <!-- Opção vazia -->
    <option value="">Selecione...</option>
    <!-- Lista de cidades - usando codigo como value -->
    <option v-for="cidade in cidades" :key="cidade.id" :value="cidade.codigo">
      {{ cidade.nome }}
    </option>
  </select>
</div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Bairro</label>
                <input
                  type="text"
                  v-model="form.bairro"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('bairro') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('bairro')"
                >
              </div>
            </div>

            <!-- Rua, Número, Complemento -->
            <div class="grid gap-6 md:grid-cols-5 mb-6">
              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Rua</label>
                <input
                  type="text"
                  v-model="form.rua"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('rua') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('rua')"
                >
              </div>

              <div class="col-span-1">
                <label class="block text-sm font-medium text-black mb-2">Nr</label>
                <input
                  type="text"
                  v-model="form.numero"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('numero') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('numero')"
                >
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Complemento</label>
                <input
                  type="text"
                  v-model="form.complemento"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('complemento') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('complemento')"
                >
              </div>
            </div>

            <!-- Estado Civil, Cônjuge -->
            <div class="grid gap-6 md:grid-cols-4 mb-6">
              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Estado Civil</label>
                <select
                  v-model="form.estadocivil"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('estadocivil') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :disabled="!canEdit('estadocivil')"
                >
                  <option value="">{{ getEstadoCivilLabel(form.estadocivil) }}</option>
                  <option value="C">Casado(a)</option>
                  <option value="S">Solteiro(a)</option>
                  <option value="D">Divorciado(a)</option>
                  <option value="V">Viúvo(a)</option>
                  <option value="U">União Estável</option>
                </select>
              </div>

              <div class="col-span-2">
                <label class="block text-sm font-medium text-black mb-2">Cônjuge</label>
                <input
                  type="text"
                  v-model="form.conjuge"
                  :class="[
                    'w-full border rounded-lg py-2 px-3 text-gray-900',
                    canEdit('conjuge') ? 'bg-white border-gray-300' : 'bg-gray-200 border-gray-300'
                  ]"
                  :readonly="!canEdit('conjuge')"
                >
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                @click="resetForm"
                class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancelar
              </button>

              <button
                type="submit"
                :disabled="submitting"
                class="inline-flex items-center gap-1 bg-green-600 text-white text-sm font-semibold rounded-full px-4 py-2 hover:bg-green-700 transition disabled:opacity-50"
              >
                <svg v-if="!submitting" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                <span v-if="submitting">Salvando...</span>
                <span v-else>Editar Informações</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { servidorService } from '@/services/servidorService'

// Estado local
const loading = ref(true)
const submitting = ref(false)
const error = ref(null)
const servidor = ref({})
const cidades = ref([])
const estados = ref([])
const servidorConfig = ref([])

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
  conjuge: ''
})

const errors = reactive({})

// Métodos
const fetchData = async () => {
  try {
    loading.value = true
    error.value = null

    // Usar servidorService em vez de fetch direto
    const response = await servidorService.getServidorEdit()

    if (response.success) {
      servidor.value = response.data.servidor
      cidades.value = response.data.cidades
      estados.value = response.data.estados
      servidorConfig.value = response.data.servidor_config

      // Debug: Ver os valores do servidor
      console.log('Estado do servidor:', servidor.value.estado)
      console.log('Lista de estados:', estados.value)

      // Popular form
      Object.keys(form).forEach(key => {
        if (key === 'estado') {
          const estadoSalvo = servidor.value.estado

          if (estadoSalvo && estadoSalvo.length === 2) {
            form[key] = estadoSalvo
          } else if (estadoSalvo) {
            const estadoEncontrado = estados.value.find(e =>
              e.codigo == estadoSalvo || e.id == estadoSalvo
            )
            form[key] = estadoEncontrado ? estadoEncontrado.nome : estadoSalvo
            console.log('Estado encontrado:', estadoEncontrado)
            console.log('Sigla a ser usada:', estadoEncontrado ? estadoEncontrado.nome : estadoSalvo)
          } else {
            form[key] = ''
          }
        } else if (key === 'cidade_id') {
          form[key] = servidor.value.cidade || ''
        } else {
          form[key] = servidor.value[key] || ''
        }
      })

      console.log('Estado no form:', form.estado)
    } else {
      error.value = response.message
    }
  } catch (err) {
    error.value = 'Erro ao conectar com o servidor'
    console.error('Erro detalhado:', err)
  } finally {
    loading.value = false
  }
}

const updateDados = async () => {
  try {
    submitting.value = true
    Object.keys(errors).forEach(key => delete errors[key])

    // Usar servidorService em vez de fetch direto
    const response = await servidorService.updateServidor({
      id: servidor.value.id_servidor,
      ...form
    })

    if (response.success) {
      alert('Dados atualizados com sucesso!')
      await fetchData() // Refresh data
    } else {
      if (response.errors) {
        Object.assign(errors, response.errors)
      } else {
        error.value = response.message
      }
    }
  } catch (err) {
    error.value = 'Erro ao atualizar dados'
    console.error('Erro detalhado:', err)
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    if (key === 'estado') {
      const estadoSalvo = servidor.value.estado
      if (estadoSalvo && estadoSalvo.length === 2) {
        form[key] = estadoSalvo
      } else if (estadoSalvo) {
        const estadoEncontrado = estados.value.find(e =>
          e.codigo == estadoSalvo || e.id == estadoSalvo
        )
        form[key] = estadoEncontrado ? estadoEncontrado.nome : estadoSalvo
      } else {
        form[key] = ''
      }
    } else if (key === 'cidade_id') {
      form[key] = servidor.value.cidade || ''
    } else {
      form[key] = servidor.value[key] || ''
    }
  })
  Object.keys(errors).forEach(key => delete errors[key])
}

const canEdit = (field) => {
  const editableFields = [
    'orientacao', 'datanascimento', 'reservista', 'pai', 'mae', 'pasep',
    'alergia', 'nacionalidade', 'religiao', 'naturalidade', 'tiposanguineo',
    'fator_rh', 'titulonumero', 'titulozona', 'titulosecao', 'tamanho_colete',
    'numerocnh', 'categoriacnh', 'grauinstrucao', 'tamanhocamisa', 'cor_raca',
    'telefone_1', 'telefone_2', 'email', 'cep', 'estado', 'cidade_id',
    'bairro', 'rua', 'numero', 'complemento', 'estadocivil', 'conjuge', 'conjuge_cpf'
  ]
  return editableFields.includes(field)
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('pt-BR')
}

const getEstadoCivilLabel = (value) => {
  const labels = {
    'C': 'Casado(a)',
    'S': 'Solteiro(a)',
    'D': 'Divorciado(a)',
    'V': 'Viúvo(a)',
    'U': 'União Estável'
  }
  return labels[value] || ''
}

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
/* Forçar cores mais escuras */
.text-gray-900 {
  color: #1a1a1a !important;
}

label {
  color: #1a1a1a !important;
  font-weight: 600 !important;
}

input, select {
  color: #1a1a1a !important;
}

input:disabled, select:disabled {
  color: #4a4a4a !important;
}
</style>
