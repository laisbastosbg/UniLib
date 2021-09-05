const moment = require("moment");

module.exports.default = [
  {
    title: "COD",
    field: "id",
    editable: "never",
  },
  {
    title: "Nome",
    field: "name",
  },
  {
    title: "Nascimento",
    field: "birthdate",
    render: ({ birthdate }) => moment(birthdate).add(1, 'day').format("DD/MM/YYYY"),
  },
  {
    title: "Admissão",
    field: "createdAt",
    render: ({ createdAt }) => moment(createdAt).format("DD/MM/YYYY"),
  },
  {
    title: "Email",
    field: "email",
  },
  {
    title: "Telefone",
    field: "phone_number",
  },
  {
    title: "CPF",
    field: "cpf",
  },
  {
    title: "Perfil",
    field: "profile",
    lookup: {
      "administrador": "Administrador",
      "bibliotecario": "Bibliotecário"
    },
  },
  {
    title: "Senha",
    field: "password",
    render: (item) => <p>**********</p>
  },
];