import { Router } from "express";
import {
  store,
  index,
  show,
  update,
  destroy,
} from "../controllers/disciplina-controller.js";
import jwtAuthenticator from "../middlewares/jwt-autenticator.js"; // Middleware para autenticação JWT
import authorizer from "../middlewares/authorizer.js"; // Middleware para autorização por role

const router = Router();

// Middleware para autenticação e autorização
router.use(jwtAuthenticator);
router.use(authorizer("ADMINISTRATOR", "PROFESSOR"));

// Rotas da carteira

router.get("/", index); // Listar todas as disciplinas
router.post("/", store); // Criar disciplina
router.put("/:id", update); // Atualizar disciplina
router.delete("/:id", destroy); // Deletar disciplina
router.get("/:id", show); // Exibir uma disciplina específica pelo ID

export default router;
