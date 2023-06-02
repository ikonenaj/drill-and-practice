import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
    name: "GET request to / displays statistics",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/")
            .expect(200)
            .expect(new RegExp("Topics:"))
            .expect(new RegExp("Questions:"))
            .expect(new RegExp("Answers:"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});