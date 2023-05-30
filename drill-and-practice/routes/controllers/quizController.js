import * as topicService from "../../services/topicService.js";
import * as quizService from "../../services/quizService.js";

const listTopics = async ({ render }) => {
    const topics = await topicService.getTopics();
    render("quiz.eta", { topics });
};

const getRandomQuestion = async ({ params, render, response }) => {
    const rows = await quizService.getRandomQuestionId(params.id);
    if (rows && rows.length > 0) {
        response.redirect(`/quiz/${params.id}/questions/${rows[0].id}`);
    } else {
        
    }
};

export { listTopics, getRandomQuestion };