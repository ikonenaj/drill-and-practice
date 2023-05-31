import * as questionService from "../../services/questionService.js";

const getRandomQuestion = async ({ response }) => {
    const question = await questionService.getRandomQuestion();
    console.log(question);
    if (question && question.length > 0) {
        const answerOptions = await questionService.getAnswerOptions(question[0].id);
    } else {
        response.body = {};
    }
    
};

export { getRandomQuestion };