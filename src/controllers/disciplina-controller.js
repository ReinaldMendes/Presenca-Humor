import Disciplina from "../models/disciplina-model.js";

// Função para criar uma nova Disciplina
export const store = async (req, resp) => {
  try {
    const content = await Disciplina.create(req.body);
    resp.status(201).json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

// Função para listar todas as Disciplinas
export const index = async (req, resp) => {
  try {
    const content = await Disciplina.find().exec();
    resp.json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

// Função para exibir uma Disciplina específica pelo ID e presenca
export const show = async (req, resp) => {
  try {
    const content =
      (await Disciplina.findById(req.params.id).populate("alunoId")) &&
      populate("presencaId").exec();
    resp.json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

// Função para atualizar uma Disciplina pelo ID
export const update = async (req, res) => {
  try {
    const content = await Disciplina.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Função para deletar uma Disciplina pelo ID
export const destroy = async (req, resp) => {
  try {
    await Disciplina.findByIdAndDelete(req.params.id).exec();
    resp.status(204).send();
  } catch (error) {
    resp.status(400).json(error);
  }
};
