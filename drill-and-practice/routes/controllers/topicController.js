import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const listTopics = async ({ errors, render, user }) => {
    const topics = await topicService.getTopics();
    const data = { errors, topics, user };
    render("topics.eta", data);
};

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)]
};

const addTopic = async ({ render, request, response, user }) => {
    if (user.admin) {
        const body = request.body({ type: "form" });
        const params = await body.value;
        const name = params.get("name");

        const [passes, errors] = await validasaur.validate(
            { name },
            topicValidationRules,
        );

        if (passes) {
            await topicService.createTopic(name, user.id);
            response.redirect("/topics");
        } else {
            console.log(errors);
            await listTopics({ errors, render, user })
        }

    } else {
        response.status = 401;
    }
};

const deleteTopic = async ({ params, response, user }) => {
    if (user.admin) {
        await questionService.deleteQuestions(params.id);
        await topicService.deleteTopic(params.id);
        response.redirect("/topics");
    } else {
        response.status = 401;
    }
};

const showTopic = async ({ errors, params, render, response }) => {
    const topic = await topicService.getTopicById(params.id);
    if (topic && topic.length > 0) {
        const data = {
            errors: errors,
            topic: topic[0],
            questions: await questionService.getQuestions(params.id),
        };
        render("topic.eta", data);
    } else {
        response.status = 404;
    }
    
};

export { addTopic, deleteTopic, listTopics, showTopic };