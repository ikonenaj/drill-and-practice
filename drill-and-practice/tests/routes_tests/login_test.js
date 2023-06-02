import { superoak } from "../../deps.js";
import { app } from "../../app.js";

Deno.test({
    name: "Logging in redirects to /topics",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/login")
            .set("Content-type", "application/x-www-form-urlencoded")
            .send("email=admin@admin.com&password=123456")
            .expect(302)
            .expect("location", "/topics");
    }, 
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Incorrect email displays error message",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/login")
            .set("Content-type", "application/x-www-form-urlencoded")
            .send("email=admin@admi.com&password=123456")
            .expect(200)
            .expect(new RegExp("Incorrect email"))
    }, 
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Incorrect password displays error message",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/auth/login")
            .set("Content-type", "application/x-www-form-urlencoded")
            .send("email=admin@admin.com&password=12345")
            .expect(200)
            .expect(new RegExp("Incorrect password"))
    }, 
    sanitizeResources: false,
    sanitizeOps: false,
});