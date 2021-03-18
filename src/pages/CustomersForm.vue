<template>
  <div>
    <v-form v-model="valid" ref="form">
      <v-container>
        <h2>Cadastrar cliente</h2>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="nomeFantasia"
              :rules="nomeFantasiaRules"
              label="Nome fantasia"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="razaoSocial"
              :rules="razaoSocialRules"
              label="Razão social"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cnpj"
              :rules="cnpjRules"
              label="CNPJ"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="telefone"
              :rules="telefoneRules"
              label="Telefone para contato"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="primary" @click="handleForm"> Cadatrar </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "CustomersForm",
  data: () => ({
    valid: false,
    nomeFantasia: "",
    razaoSocial: "",
    cnpj: "",
    email: "",
    telefone: "",
    nomeFantasiaRules: [(v) => !!v || "O nome fantasia é obrigatório!"],
    razaoSocialRules: [(v) => !!v || "A razão social é obrigatória!"],
    cnpjRules: [(v) => !!v || "O CNPJ é obrigatório!"],
    emailRules: [
      (v) => !!v || "O e-mail é obrigatório!",
      (v) => /.+@.+/.test(v) || "Informe um e-mail válido",
    ],
    telefoneRules: [(v) => !!v || "O telefone é obrigatório!"],
  }),
  methods: {
    handleForm() {
      this.$refs.form.validate();
      if (this.$refs.form.value) {
        console.log({
            nomeFantasia: this.nomeFantasia,
            razaoSocial: this.razaoSocial,
            cnpj: this.cnpj,
            email: this.email,
            telefone: this.telefone,
        });
        this.$refs.form.reset();
        this.$notification.success('Cliente cadastrado com sucesso!')
      }
    },
  },
};
</script>

<style>
</style>