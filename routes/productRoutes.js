import express from "express";
import { insertProduct , getAllProducts } from "../controllers/productController.js";

const router = express.Router();
router.use(express.json());

router.post("/insertProduct" , insertProduct);
router.get("/getAllProducts" , getAllProducts);

export default router;