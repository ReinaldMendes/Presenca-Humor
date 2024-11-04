import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const alunoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        },
      },
    },
    humor: {
      type: String,
      enum: [
        "BEM",
        "BOM MAIS PODIA ESTAR MELHOR",
        "MAL",
        "TRISTE",
        "CANSADO",
        "OUTRO",
      ],
      default: "BEM",
    },
    DisciplinaId: {
      type: [Schema.Types.ObjectId],
      ref: "Disciplina",
      required: true,
    },
    presencaId: {
      type: [Schema.Types.ObjectId],
      ref: "Presenca",
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

alunoSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
alunoSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Aluno = model("Aluno", alunoSchema);

export default Aluno;
