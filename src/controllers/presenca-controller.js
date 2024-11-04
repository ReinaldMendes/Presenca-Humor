import Presenca from "../models/presenca-model.js";

// Função para criar uma nova Presenca
export const store = async (req, resp) => {
  try {
    const content = await Presenca.create(req.body);
    resp.status(201).json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

// Função para listar todas as Presencas
export const index = async (req, resp) => {
  try {
    const content = await Presenca.find().exec();
    resp.json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

// Função para exibir uma Presenca específica pelo ID
export const show = async (req, resp) => {
  try {
    const content = await Presenca.findById(req.params.id)
      .populate("alunoId")
      .exec();
    resp.json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

// Função para atualizar uma Presenca pelo ID
export const update = async (req, res) => {
  try {
    const content = await Presenca.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Função para deletar uma Presenca pelo ID
export const destroy = async (req, resp) => {
  try {
    await Presenca.findByIdAndDelete(req.params.id).exec();
    resp.status(204).send();
  } catch (error) {
    resp.status(400).json(error);
  }
};
