import { assertEquals } from "https://deno.land/std@0.171.0/testing/asserts.ts";

const hello = () => {
  return 'hello world!';
}

Deno.test("Hello should return 'hello world'", () => {
  assertEquals(hello(), 'hello world!');
});