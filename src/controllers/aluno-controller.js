import Aluno from "../models/aluno-model.js";
import jwtServices from "../services/jwt-services.js";

export const signup = async (req, res) => {
  try {
    const user = await Aluno.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // Criptografa a senha
      role: req.body.role,
    });
    const token = jwtServices.generateAcessToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  try {
    const Aluno = await Aluno.findOne({ email: req.body.email }).exec();
    if (Aluno && (await Aluno.isValidPassword(req.body.password))) {
      const token = jwtServices.generateAcessToken(Aluno);
      res.json({ Aluno, token });
    } else {
      res.status(404).json({ error: "Email or password incorrect" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const store = async (req, res) => {
  try {
    if (!req.Aluno) {
      return res.status(403).json({ error: "Aluno not authenticated" });
    }
    const { text } = req.body;
    const Aluno = req.Aluno._id;
    const content = await Aluno.create({ text, Aluno });
    res.status(201).json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const index = async (req, res) => {
  try {
    const content = await Aluno.find().exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const show = async (req, res) => {
  try {
    const content = await Aluno.findById(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const content = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const destroy = async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id).exec();
    res.status(204).json(); // Retorna status 204 para indicar exclusão sem conteúdo
  } catch (error) {
    res.status(400).json(error);
  }
};
