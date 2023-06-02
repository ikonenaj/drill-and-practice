import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
    name: "Trying to register same email two times displays error message",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/register")
            .set("Content-type", "application/x-www-form-urlencoded")
            .send("email=admin@admin.com&password=123456")
            .expect(200)
            .expect(new RegExp("Email is already registered"));
    }, 
    sanitizeResources: false,
    sanitizeOps: false,
});