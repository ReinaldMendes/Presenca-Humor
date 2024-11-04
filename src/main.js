import e from "express";
import "dotenv/config";
import "./config/db.js";
import aluno_router from "./routers/aluno-router.js";
import user_router from "./routers/professor-adm-router.js";
import disciplina_router from "./routers/disciplina-router.js";
import presenca_router from "./routers/presenca-router.js";
const app = e();
app.use(e.json());
app.use("/aluno", aluno_router);
app.use("/professor", user_router);
app.use("/disciplina", disciplina_router);
app.use("/presenca", presenca_router);

app.listen(process.env.API_PORT, () => console.log("Server Running"));
