import { superoak } from "../../deps.js";
import { app } from "../../app.js";
import { assertMatch } from "https://deno.land/std@0.171.0/testing/asserts.ts";

Deno.test({
    name: "Making a GET request to / adds a session",
    async fn() {
        const testClient = await superoak(app);
        const response = await testClient.get("/")
            .expect(200);

        const session = response.headers["set-cookie"];
        assertMatch(session, new RegExp("session="));
    }, 
    sanitizeResources: false,
    sanitizeOps: false,
});