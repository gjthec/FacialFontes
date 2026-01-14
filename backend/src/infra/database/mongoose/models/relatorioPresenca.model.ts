import mongoose, { Connection } from "mongoose";
import { updateCounter } from "./counter.model";

export default function defineModel(mongooseConnection: Connection) {
  if (mongooseConnection.models.relatorioPresenca) {
    return mongooseConnection.models.relatorioPresenca;
  }

  var schema = new mongoose.Schema(
    {
      _id: {
        type: Number,
        required: false,
      },
      courseName: {
        type: String,
      },
      classDate: {
        type: String,
      },
      studentId: {
        type: String,
      },
      studentName: {
        type: String,
      },
      matricula: {
        type: String,
      },
      status: {
        type: String,
      },
      checkInMethod: {
        type: String,
      },
      identityMatched: {
        type: Boolean,
      },
      identityScore: {
        type: Number,
      },
      identityCheckedAtIso: {
        type: String,
      },
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

    this._id = await updateCounter(mongooseConnection, "RelatorioPresenca");
    next();
  });

  return mongooseConnection.model("relatorioPresenca", schema);
}
