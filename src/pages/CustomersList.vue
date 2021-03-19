<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    :loading="loading"
    sort-by="nomeFantasia"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Clientes</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid" ref="form">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.nomeFantasia"
                        label="Nome Fantasia"
                        :rules="nomeFantasiaRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.razaoSocial"
                        label="Razão social"
                        :rules="razaoSocialRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.cnpj"
                        label="CNPJ"
                        v-mask="'##.###.###/####-##'"
                        :rules="cnpjRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.email"
                        label="E-mail"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.telefone"
                        label="Telefone"
                        v-mask="'(##) ##### ####'"
                        :rules="telefoneRules"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="handleSave(editedItem.id)"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Tem certeza que deseja remover "{{
                editedItem.nomeFantasia
              }}"?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click="handleRemove(editedItem.id)"
                >Excluir</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:item.dataCadastro="{ item }">
      {{ formatDate(item.dataCadastro) }}
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: () => ({
    valid: false,
    dialog: false,
    dialogDelete: false,
    loading: true,
    headers: [
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
      {
        text: "Opções",
        sortable: false,
        value: "actions",
      },
    ],
    customers: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      nomeFantasia: "",
      razaoSocial: "",
      cnpj: "",
      email: "",
      telefone: "",
    },
    defaultItem: {
      id: 0,
      nomeFantasia: "",
      razaoSocial: "",
      cnpj: "",
      email: "",
      telefone: "",
    },
    nomeFantasiaRules: [(v) => !!v || "O nome fantasia é obrigatório!"],
    razaoSocialRules: [(v) => !!v || "A razão social é obrigatória!"],
    cnpjRules: [(v) => !!v || "O CNPJ é obrigatório!"],
    emailRules: [
      (v) => !!v || "O e-mail é obrigatório!",
      (v) => /.+@.+/.test(v) || "Informe um e-mail válido",
    ],
    telefoneRules: [(v) => !!v || "O telefone é obrigatório!"],
  }),

  computed: {
    formTitle() {
      return "Editar cliente";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getCustomers();
  },

  methods: {
    getCustomers() {
      this.loading = true;
      axios
        .get("https://localhost:5001/api/customers/")
        .then(({ data }) => (this.customers = data))
        .catch(() => {
          this.$notification.error("Ocorreu um erro ao listar os clientes");
        })
        .finally(() => (this.loading = false));
    },

    handleSave(customerId) {
      this.$refs.form.validate();
      if (this.$refs.form.value) {
        const customer = {
          id: customerId,
          nomeFantasia: this.editedItem.nomeFantasia,
          razaoSocial: this.editedItem.razaoSocial,
          cnpj: this.editedItem.cnpj,
          email: this.editedItem.email,
          telefone: this.editedItem.telefone,
        };

        axios
          .put("https://localhost:5001/api/customers/" + customerId, customer)
          .then(() => {
            this.$refs.form.reset();
            this.$notification.success("Cliente atualizado com sucesso!");
          })
          .catch(() => {
            this.$notification.error("Ocorreu um erro ao atualizar o cliente");
          })
          .finally(() => {
            this.getCustomers();
            this.close();
          });
      }
    },

    handleRemove(customerId) {
      axios
        .delete("https://localhost:5001/api/customers/" + customerId)
        .then(() => {
          this.$notification.success("Cliente excluido com sucesso!");
        })
        .catch(() => {
          this.$notification.error("Ocorreu um erro ao excluir o cliente!");
        })
        .finally(() => {
          this.getCustomers();
          this.closeDelete();
        });
    },

    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },

    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>