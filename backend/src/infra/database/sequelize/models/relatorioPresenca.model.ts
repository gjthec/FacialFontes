import { Sequelize, DataTypes } from "sequelize";

export default function defineModel(sequelize: Sequelize) {
  const schema = sequelize.define(
    "relatorioPresenca",
    {
      courseName: {
        type: DataTypes.STRING(120),
        field: "course_name",
      },
      classDate: {
        type: DataTypes.STRING(20),
        field: "class_date",
      },
      studentId: {
        type: DataTypes.STRING(40),
        field: "student_id",
      },
      studentName: {
        type: DataTypes.STRING(120),
        field: "student_name",
      },
      matricula: {
        type: DataTypes.STRING(20),
        field: "matricula",
      },
      status: {
        type: DataTypes.STRING(20),
        field: "status",
      },
      checkInMethod: {
        type: DataTypes.STRING(40),
        field: "check_in_method",
      },
      identityMatched: {
        type: DataTypes.BOOLEAN,
        field: "identity_matched",
      },
      identityScore: {
        type: DataTypes.FLOAT,
        field: "identity_score",
      },
      identityCheckedAtIso: {
        type: DataTypes.STRING(40),
        field: "identity_checked_at_iso",
      },
    },
    {
      freezeTableName: true,
    }
  );

  schema.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    values.id = values.id;
    delete values._id;
    delete values.__v;
    return values;
  };

  return schema;
}
