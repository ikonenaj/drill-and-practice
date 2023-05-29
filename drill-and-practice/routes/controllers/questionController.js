import { validasaur } from "../../deps.js";
import * as questionService from "../../services/questionService.js";
import { getTopicById } from "../../services/topicService.js";
import { showTopic } from "./topicController.js";

const questionValidationRules = {
    question_text: [validasaur.required, validasaur.minLength(1)]
};

const addQuestion = async ({ params, render, request, response, user }) => {
    const body = request.body({ type: "form" });
    const qParams = await body.value;
    const question_text = qParams.get("question_text");

    const [passes, errors] = await validasaur.validate(
        { question_text },
        questionValidationRules
    );

    if (passes) {
        await questionService.createQuestion(user.id, params.id, question_text);
        response.redirect(`/topics/${params.id}`);
    } else {
        console.log(errors);
        await showTopic({ errors, params, render, response });
    }
};

const viewQuestion = async ({ params, render }) => {
    const topic = await getTopicById(params.id);
    const question = await questionService.getQuestion(params.qId);
    const data = {
        topic: topic[0],
        question: question[0],
        answer_options: await questionService.getAnswerOptions(params.qId),
    };
    render("question.eta", data);
};

const addAnswer = async ({ params, request, response }) => {
    const body = request.body({ type: "form" });
    const aParams = await body.value;
    let isCorrect = false;
    if (aParams.has("is_correct")) {
        isCorrect = true;
    }

    await questionService.createAnswerOption(params.qId, aParams.get("option_text"), isCorrect);
    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

const deleteAnswerOption = async ({ params, response }) => {
    await questionService.deleteAnswerOption(params.oId);
    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.qId);
    response.redirect(`/topics/${params.id}`);
};

export { addAnswer, addQuestion, deleteAnswerOption, deleteQuestion, viewQuestion };