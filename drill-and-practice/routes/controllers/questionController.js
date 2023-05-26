import * as questionService from "../../services/questionService.js";

const addQuestion = async ({ params, request, response }) => {
    const body = request.body({ type: "form" });
    const qParams = await body.value;

    await questionService.createQuestion(1, params.id, qParams.get("question_text"));
    response.redirect(`/topics/${params.id}`);
};


export { addQuestion };