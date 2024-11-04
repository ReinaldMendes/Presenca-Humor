import { Router } from "express";
import {
  store,
  index,
  show,
  update,
  destroy,
} from "../controllers/presenca-controller.js";
import jwtAuthenticator from "../middlewares/jwt-autenticator.js"; // Middleware para autenticação JWT
import authorizer from "../middlewares/authorizer.js"; // Middleware para autorização por role

const router = Router();

// Middleware para autenticação e autorização
router.use(jwtAuthenticator);
router.use(authorizer("ADMINISTRATOR", "PROFESSOR", "ALUNO"));

// Rotas da carteira

router.get("/", index); // Listar todas as presenca
router.post("/", store); // Criar presenca
router.use(authorizer("ADMINISTRATOR", "PROFESSOR"));
router.put("/:id", update); // Atualizar presenca
router.delete("/:id", destroy); // Deletar presenca
router.get("/:id", show); // Exibir uma presenca específica pelo ID

export default router;
