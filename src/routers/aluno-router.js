import { Router } from "express";
import {
  store,
  index,
  show,
  update,
  destroy,
  login,
  signup,
} from "../controllers/aluno-controller.js";
import jwtAuthenticator from "../middlewares/jwt-autenticator.js"; // Middleware para autenticação JWT
import authorizer from "../middlewares/authorizer.js"; // Middleware para autorização por role

const router = Router();

router.post("/login", login);

// Middleware para autenticação e autorização
router.use(jwtAuthenticator);
router.use(authorizer("ADMINISTRATOR", "PROFESSOR"));
router.post("/signup", signup);
router.get("/", index); // Listar todas os alunos
router.post("/", store); // Criar aluno
router.delete("/:id", destroy); // Deletar presenca
router.use(authorizer("ADMINISTRATOR", "PROFESSOR", "ALUNO"));
router.put("/:id", update); // Atualizar aluno
router.get("/:id", show); // Exibir uma presenca específica pelo ID

export default router;
