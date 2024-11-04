import ProfAdm from "../models/professor-adm-model.js";
import jwtServices from "../services/jwt-services.js";

export const signup = async (req, res) => {
  try {
    const user = await ProfAdm.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // Criptografa a senha
      role: req.body.role,
    });
    const token = jwtServices.generateAcessToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const user = await ProfAdm.findOne({ email: req.body.email }).exec();
    if (user && (await user.isValidPassword(req.body.password))) {
      const token = jwtServices.generateAcessToken(user);
      res.json({ user, token });
    } else {
      res.status(404).json({ error: "Email or password incorrect" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const store = async (req, res) => {
  try {
    if (!req.ProfAdm) {
      return res.status(403).json({ error: "ProfAdm not authenticated" });
    }
    const { text } = req.body;
    const ProfAdm = req.ProfAdm._id;
    const content = await ProfAdm.create({ text, ProfAdm });
    res.status(201).json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const index = async (req, res) => {
  try {
    const content = await ProfAdm.find().exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const show = async (req, res) => {
  try {
    const content = await ProfAdm.findById(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const content = await ProfAdm.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const destroy = async (req, res) => {
  try {
    await ProfAdm.findByIdAndDelete(req.params.id).exec();
    res.status(204).json(); // Retorna status 204 para indicar exclusão sem conteúdo
  } catch (error) {
    res.status(400).json(error);
  }
};
