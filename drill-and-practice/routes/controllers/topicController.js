import * as topicService from "../../services/topicService.js";

const addTopic = async ({ request, response }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    await topicService.createTopic(params.get("name"), 1);

    response.redirect("/topics");
};

const listTopics = async ({ render }) => {
    render("topics.eta", { topics: await topicService.getTopics() });
};

export { addTopic, listTopics };