<template>
  <v-container>
    <h2>Listar clientes</h2>
    <v-data-table
        :headers="headers"
        :items="customers"
        item-key="id"
        class="elevation-1"
        :search="search"
        :custom-filter="filterCustomers"
    >
        <template v-slot:top>
            <v-text-field
                v-model="search"
                label="Pesquisar clientes"                
            ></v-text-field>
        </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "CustomersList",
  data() {
    return {
      search: "",
      customers: [
        {
          id: 1,
          nomeFantasia: "MARIA JOSÉ",
          razaoSocial: "CLIENTE TESTE LTDA",
          cnpj: "11.111.111/0001-11",
          email: "cliente@email.com",
          telefone: "(11) 9999 5555",
          dataCadastro: "18/03/2021 12:00",
        },
        {
          id: 2,
          nomeFantasia: "ALESSANDRO DA SILVA",
          razaoSocial: "CLIENTE TESTE LTDA",
          cnpj: "11.111.111/0001-11",
          email: "cliente@email.com",
          telefone: "(11) 9999 5555",
          dataCadastro: "18/03/2021 12:00",
        },
        {
          id: 3,
          nomeFantasia: "AMÉLIA DA SILVA",
          razaoSocial: "CLIENTE TESTE LTDA",
          cnpj: "11.111.111/0001-11",
          email: "cliente@email.com",
          telefone: "(11) 9999 5555",
          dataCadastro: "18/03/2021 12:00",
        },
      ],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Nome fantasia",
          align: "start",
          sortable: true,
          value: "nomeFantasia",
        },
        {
          text: "Razão social",
          align: "start",
          sortable: true,
          value: "razaoSocial",
        },
        {
          text: "CNPJ",
          align: "start",
          sortable: false,
          value: "cnpj",
        },
        {
          text: "E-mail",
          align: "start",
          sortable: false,
          value: "email",
        },
        {
          text: "Telefone",
          align: "start",
          sortable: false,
          value: "telefone",
        },
        {
          text: "Data do cadastro",
          align: "start",
          sortable: true,
          value: "dataCadastro",
        },
      ];
    },
  },
  methods: {
      filterCustomers (value, search) {
          return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1;
      }
  }
};
</script>

<style>
</style>