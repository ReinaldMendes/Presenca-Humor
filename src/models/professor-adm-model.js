import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const professorSchema = new Schema(
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
    role: {
      type: String,
      enum: ["PROFESSOR", "ADMINISTRATOR"],
      default: "ADMINISTRATOR",
    },
    DisciplinaId: {
      type: [Schema.Types.ObjectId],
      ref: "Disciplina",
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

professorSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
professorSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Professor = model("Professor", professorSchema);

export default Professor;
