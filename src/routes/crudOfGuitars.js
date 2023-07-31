import { Router } from "express";
import { create, deleteGuitar, getGuitar, getGuitarByName, getGuitars, patchGuitar } from "../controllers/controllers.js";
import multer from "multer";

const router = Router();

//Obtener guitarras
router.get("/guitars", getGuitars)

//Obtener una guitarra
router.get("/guitars/:id", getGuitar)

//Obtener guitarra por su nombre
router.get("/search", getGuitarByName)

//Crear guitarra
const upload = multer({ dest: "/temp" })

router.post("/guitars", upload.single("guitarImage"), create)

//Actualizar precio de una guitarra
router.patch("/guitars/:id", patchGuitar)

//Borrar una guitarra
router.delete("/guitars/:id", deleteGuitar)

export default router