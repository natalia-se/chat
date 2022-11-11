import { Router } from "express";
import { getMessages, reply } from "../controllers/message-controller";

const router = Router();

router.route("/").get(getMessages).post(reply);

export default router;
