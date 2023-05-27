import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic)
router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/topics/:id", topicController.showTopic);
router.post("/topics/:id/questions", questionController.addQuestion);

router.get("/topics/:id/questions/:qId", questionController.viewQuestion);
router.post("/topics/:id/questions/:qId", questionController.addAnswer);

router.post("/topics/:id/questions/:qId/options/:oId/delete", questionController.deleteAnswerOption);
router.post("/topics/:id/questions/:qId/delete", questionController.deleteQuestion);

export { router };