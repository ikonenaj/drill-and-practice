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

const getAnswerOption = async (id) => {
    return await sql`SELECT * FROM question_answer_options WHERE id = ${id}`;
};

const deleteAnswerOption = async (id) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${id}`;
    await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
};

const deleteQuestion = async (id) => {
    await sql`DELETE FROM questions WHERE id = ${id}`;
};

const deleteQuestions = async (topic_id) => {
    await sql`DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topic_id})`;
    await sql`DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topic_id})`;
    await sql`DELETE FROM questions WHERE topic_id = ${topic_id}`;
};

const getQuestionCount = async () => {
    const rows = await sql`SELECT COUNT(id) FROM questions`;
    if (rows && rows.length > 0) {
        return rows[0].count;
    } else {
        return 0;
    }
};

const getAnswerCount = async () => {
    const rows = await sql`SELECT COUNT(id) FROM question_answers`;
    if (rows && rows.length > 0) {
        return rows[0].count;
    } else {
        return 0;
    }
};

const getRandomQuestion = async () => {
    return await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;
};

export { createAnswerOption, createQuestion, deleteAnswerOption, deleteQuestion, deleteQuestions, getAnswerCount, getAnswerOption, getAnswerOptions, getQuestion, getQuestionCount, getQuestions, getRandomQuestion };