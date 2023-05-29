import { getTopicCount } from "../../services/topicService.js";
import { getAnswerCount, getQuestionCount } from "../../services/questionService.js";

const showMain = async ({ render }) => {
  render("main.eta", { topicCount: await getTopicCount(), questionCount: await getQuestionCount(), answerCount: await getAnswerCount()});
};

export { showMain };
