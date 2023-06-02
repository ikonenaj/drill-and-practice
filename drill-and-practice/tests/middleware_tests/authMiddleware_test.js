import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
    name: "GET request to /topics redirects to /auth/login",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/topics")
            .expect(302)
            .expect("location", "/auth/login");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "GET request to /quiz redirects to /auth/login",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/quiz")
            .expect(302)
            .expect("location", "/auth/login");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});