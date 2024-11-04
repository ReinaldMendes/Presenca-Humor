import { Router } from "express";
import {
  signup,
  login,
  store,
  index,
  update,
  destroy,
} from "../controllers/professor-adm-controller.js";
import jwtAuthenticator from "../middlewares/jwt-autenticator.js"; // Middleware para autenticação JWT
import authorizer from "../middlewares/authorizer.js"; // Middleware para autorização por role

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.use(jwtAuthenticator);
router.use(authorizer("ADMINISTRATOR", "SUPORT", "PROFESSOR"));
router.get("/", index);
router.get("/:id", index);
router.post("/", store); // Criar usuário
router.put("/:id", update); // Atualizar usuário
router.delete("/:id", destroy); // Deletar usuário

export default router;
