import { sql } from "../database/database.js";

const createTopic = async (name, user_id) => {
    await sql`INSERT INTO topics (name, user_id) VALUES (${name}, ${user_id})`;
};

const getTopics = async () => {
    return await sql`SELECT * FROM topics`;
};

const getTopicById = async (id) => {
    return await sql`SELECT * FROM topics WHERE id = ${id}`;
};

const deleteTopic = async (id) => {
    await sql`DELETE FROM topics WHERE id = ${id}`;
};

const getTopicCount = async () => {
    const rows =  await sql `SELECT COUNT(id) FROM topics`;
    if (rows && rows.length > 0) {
        return rows[0].count;
    } else {
        return 0;
    }
};

export { createTopic, deleteTopic, getTopics, getTopicById, getTopicCount };