import { Schema, model } from "mongoose";

const professorSchema = new Schema(
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
    ProfessorId: {
      type: [Schema.Types.ObjectId],
      ref: "Professor",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Disciplina = model("Disciplina", professorSchema);

export default Disciplina;
