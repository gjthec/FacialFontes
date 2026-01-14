import mongoose, { Connection } from "mongoose";
import { updateCounter } from "./counter.model";

export default function defineModel(mongooseConnection: Connection) {
  if (mongooseConnection.models.aluno) {
    return mongooseConnection.models.aluno;
  }

  var schema = new mongoose.Schema(
    {
      _id: {
        type: Number,
        required: false,
      },
      nome: {
        type: String,
        maxlength: 80,
        validate: {
          validator: function (value: string) {
            return value.length >= 1 && value.length <= 80;
          },
          message: "O campo deve ter no máximo 80 caracteres.",
        },
      },
      matricula: {
        type: String,
        maxlength: 20,
      },
      cpf: {
        type: String,
      },
      email: {
        type: String,
      },
      curso: {
        type: String,
      },
      status: {
        type: String,
      },
      foto: { type: mongoose.Schema.Types.ObjectId, ref: "fieldFile" },
    },
    { timestamps: true }
  );

  schema.set("toObject", {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });

  schema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  });

  schema.pre("save", async function (next) {
    if (!this.isNew) return next();

    this._id = await updateCounter(mongooseConnection, "Aluno");
    next();
  });

  return mongooseConnection.model("aluno", schema);
}
