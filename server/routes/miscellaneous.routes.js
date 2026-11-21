import {Router} from 'express';
import submitMessage from "../controller/miscellaneous.controller.js"

const router = Router();

router
    .route("/contact")
    .post(submitMessage);

export default router;