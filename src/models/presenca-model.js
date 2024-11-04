import { Schema, model } from "mongoose";

const presencaSchema = new Schema(
  {
    alunoId: {
      type: [Schema.Types.ObjectId],
      ref: "Aluno",
      required: true,
    },
    DisciplinaId: {
      type: [Schema.Types.ObjectId],
      ref: "Disciplina",
      required: true,
    },
    presencaTurma: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
    // locationstamps: true,
  }
);

const Presenca = model("Presenca", presencaSchema);

export default Presenca;
