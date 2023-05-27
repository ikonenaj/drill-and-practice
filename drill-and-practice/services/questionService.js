import { sql } from "../database/database.js";

const createQuestion = async (user_id, topic_id, question_text) => {
    await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${user_id}, ${topic_id}, ${question_text})`;
};

const getQuestions = async (topic_id) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${topic_id}`;
};

const getQuestion = async (id) => {
    return await sql`SELECT * FROM questions WHERE id = ${id}`;
};

const createAnswerOption = async (question_id, option_text, is_correct) => {
    await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${question_id}, ${option_text}, ${is_correct})`;
};

const getAnswerOptions = async (question_id) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id}`;
};

const deleteAnswerOption = async (id) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${id}`;
    await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
};

const deleteQuestion = async (id) => {
    await sql`DELETE FROM questions WHERE id = ${id}`;
};

export { createAnswerOption, createQuestion, deleteAnswerOption, deleteQuestion, getAnswerOptions, getQuestion, getQuestions };