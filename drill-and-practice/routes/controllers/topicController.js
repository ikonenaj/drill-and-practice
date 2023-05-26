import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";

const addTopic = async ({ request, response }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    await topicService.createTopic(params.get("name"), 1);

    response.redirect("/topics");
};

const listTopics = async ({ render }) => {
    render("topics.eta", { topics: await topicService.getTopics() });
};

const deleteTopic = async ({ params, response }) => {
    await topicService.deleteTopic(params.id);
    response.redirect("/topics");
};

const showTopic = async ({ params, render }) => {
    const topic = await topicService.getTopicById(params.id);
    const data = {
        topic: topic[0],
        questions: await questionService.getQuestions(params.id),
    };
    render("topic.eta", data);
};

export { addTopic, deleteTopic, listTopics, showTopic };