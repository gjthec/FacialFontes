import { Sequelize, DataTypes } from "sequelize";

export default function defineModel(sequelize: Sequelize) {
  const schema = sequelize.define("registro", {
    cursoId: {
      type: DataTypes.STRING,
      field: "curso_id",
    },
    matricula: {
      type: DataTypes.STRING(60),
      validate: {
        len: {
          args: [0, 60],
          msg: "O campo deve ter entre 0 e 60 caracteres.",
        },
      },
      field: "matricula",
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
