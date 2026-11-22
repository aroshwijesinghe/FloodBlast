import { randomUUID } from "node:crypto";
import assert from "node:assert/strict";
import { test } from "node:test";
import { createReliefRepository } from "./relief.mjs";

test("pledges share a balance and a retry charges only once", () => {
  const relief = createReliefRepository();
  const lunch = relief.list().find(({ meal }) => meal === "lunch");
  const requestId = lunch.id;
  const partial = { requestId, quantity: 50, submissionId: randomUUID() };
  assert.equal(relief.pledge("+94770000001", partial).remaining, 150);
  assert.equal(relief.pledge("+94770000001", partial).remaining, 150);
  assert.throws(() => relief.pledge("+94770000002", {
    requestId, quantity: 151, submissionId: randomUUID(),
  }), { status: 409 });
  assert.equal(relief.pledge("+94770000002", {
    requestId, quantity: 150, submissionId: randomUUID(),
  }).remaining, 0);
  assert.equal(relief.history("+94770000001").length, 1);
});
