import { sql } from "../database/database.js";

const getRandomQuestionId = async (topic_id) => {
    return await sql`SELECT id FROM questions WHERE topic_id = ${topic_id} ORDER BY RANDOM()`;
};

const getRandomQuestion = async (topic_id) => {
    const id = await getRandomQuestionId(topic_id);
    return await sql`SELECT * FROM questions WHERE id = ${id}`;
};

const saveAnswer = async (user_id, question_id, question_answer_option_id) => {
    await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${user_id}, ${question_id}, ${question_answer_option_id})`;
};

export { getRandomQuestion, getRandomQuestionId, saveAnswer };