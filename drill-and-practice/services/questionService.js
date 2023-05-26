import { sql } from "../database/database.js";

const createQuestion = async (user_id, topic_id, question_text) => {
    await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${user_id}, ${topic_id}, ${question_text})`;
};

const getQuestions = async (topic_id) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${topic_id}`;
};

export { createQuestion, getQuestions };