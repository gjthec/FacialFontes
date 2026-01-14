import { Sequelize, DataTypes } from "sequelize";

export default function defineModel(sequelize: Sequelize) {
  const schema = sequelize.define("aluno", {
    nome: {
      type: DataTypes.STRING(80),
      validate: {
        len: {
          args: [0, 80],
          msg: "O campo deve ter entre 0 e 80 caracteres.",
        },
      },
      field: "nome",
    },
    matricula: {
      type: DataTypes.STRING(20),
      validate: {
        len: {
          args: [0, 20],
          msg: "O campo deve ter entre 0 e 20 caracteres.",
        },
      },
      field: "matricula",
    },
    cpf: {
      type: DataTypes.STRING(14),
      field: "cpf",
    },
    email: {
      type: DataTypes.STRING(120),
      field: "email",
    },
    curso: {
      type: DataTypes.STRING(120),
      field: "curso",
    },
    status: {
      type: DataTypes.STRING(20),
      field: "status",
    },
    foto: {
      type: DataTypes.STRING,
      field: "foto",
    },
  });

  schema.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    values.id = values.id;
    delete values._id;
    delete values.__v;
    return values;
  };

  return schema;
}
