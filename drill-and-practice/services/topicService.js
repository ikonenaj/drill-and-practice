import { sql } from "../database/database.js";

const createTopic = async (name, user_id) => {
    await sql`INSERT INTO topics (name, user_id) VALUES (${name}, ${user_id})`;
};

const getTopics = async () => {
    return await sql`SELECT * FROM topics`;
};

export { createTopic, getTopics };