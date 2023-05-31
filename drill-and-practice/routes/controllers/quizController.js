import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as quizService from "../../services/quizService.js";

const listTopics = async ({ render }) => {
    const topics = await topicService.getTopics();
    render("quiz.eta", { topics });
};

const getRandomQuestion = async ({ params, response }) => {
    const rows = await quizService.getRandomQuestionId(params.id);
    if (rows && rows.length > 0) {
        response.redirect(`/quiz/${params.id}/questions/${rows[0].id}`);
    } else {
        response.body = "No questions available for this topic";
    }
};

const showRandomQuestion = async ({ params, render, response }) => {
    const rows = await questionService.getQuestion(params.qId);
    if (rows && rows.length > 0) {
        const question = rows[0];
        const answerOptions = await questionService.getAnswerOptions(question.id);
        const data = {
            topicId: params.id,
            questionId: params.qId,
            question: question,
            answerOptions: answerOptions
        };
        render("random.eta", data);
    }
};

const saveAnswer = async ({ params, response, user }) => {
    await quizService.saveAnswer(user.id, params.qId, params.oId);
    const rows = questionService.getAnswerOption(params.oId);
    if (rows && rows.length > 0) {
        const option = rows[0];
        if (option.is_correct) {
            response.redirect(`/quiz/${params.id}/questions/${params.qId}/correct`);
        } else {
            response.redirect(`/quiz/${params.id}/questions/${params.qId}/incorrect`);
        }
    } else {
        response.status = 404;
    }
};

export { listTopics, getRandomQuestion, saveAnswer, showRandomQuestion };