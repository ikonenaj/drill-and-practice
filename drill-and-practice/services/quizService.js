import { sql } from "../database/database.js";

const getRandomQuestionId = async (topic_id) => {
    return await sql`SELECT id FROM questions WHERE topic_id = ${topic_id} ORDER BY RANDOM()`;
};

const getRandomQuestion = async (topic_id) => {
    const id = await getRandomQuestionId(topic_id);
    return await sql`SELECT * FROM questions WHERE id = ${id}`;
};

export { getRandomQuestion, getRandomQuestionId };