import { Router } from "../deps.js";
import * as authController from "./controllers/authController.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as quizController from "./controllers/quizController.js";

import * as quizApi from "./apis/quizApi.js";

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

router.get("/auth/register", authController.showRegistrationPage);
router.post("/auth/register", authController.register);
router.get("/auth/login", authController.showLoginPage);
router.post("/auth/login", authController.login);

router.get("/quiz", quizController.listTopics);
router.get("/quiz/:id", quizController.getRandomQuestion);
router.get("/quiz/:id/questions/:qId", quizController.showRandomQuestion);
router.post("/quiz/:id/questions/:qId/options/:oId", quizController.saveAnswer);
router.get("/quiz/:id/questions/:qId/correct", quizController.correctAnswer);
router.get("/quiz/:id/questions/:qId/incorrect", quizController.incorrectAnswer);

router.get("/api/questions/random", quizApi.getRandomQuestion);
router.post("/api/questions/answer", quizApi.checkAnswer);

export { router };