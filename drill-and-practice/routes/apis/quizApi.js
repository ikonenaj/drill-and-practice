import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const getRandomQuestion = async ({ response }) => {
    const rows = await questionService.getRandomQuestion();
    if (rows && rows.length > 0) {
        const question = rows[0];
        delete question.user_id;
        delete question.topic_id;
        const answerOptions = await questionService.getAnswerOptions(question.id);
        response.body = {
            questionId: question.id,
            questionText: question.question_text,
            answerOptions: answerOptions.map(option => ({
                optionId: option.id,
                optionText: option.option_text,
            })),
        };
    } else {
        response.body = {};
    }
    
};

const validationRules = {
    questionId: [validasaur.required, validasaur.isNumeric],
    optionId: [validasaur.required, validasaur.isNumeric],
};

const checkAnswer = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    
    const [passes, errors] = await validasaur.validate(
        document,
        validationRules,
    );

    if (passes) {
         const rows = await questionService.getAnswerOption(document.optionId);
         if (rows && rows.length > 0 && (rows[0].question_id == document.questionId)) {
            response.body = { correct: rows[0].is_correct }
            return;
         }
    }
    response.status = 400;
    response.body = errors;
};

export { checkAnswer, getRandomQuestion };