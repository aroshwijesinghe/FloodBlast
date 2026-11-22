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

test("fulfillment tracks individual pledges and advances in order", () => {
  const relief = createReliefRepository();
  const request = relief.list().find(({ category }) => category === "medical");
  const pledge = (phone, quantity) => relief.pledge(phone, {
    requestId: request.id, quantity, submissionId: randomUUID(),
  });
  assert.equal(pledge("first", 10).status, "PARTIALLY_PLEDGED");
  const first = relief.history("first")[0].id;
  assert.throws(() => relief.advance({ pledgeId: first, status: "IN_TRANSIT" }), { status: 409 });
  assert.equal(pledge("second", 20).status, "FULLY_PLEDGED");
  assert.throws(() => relief.advance({ pledgeId: first, status: "DELIVERED" }), { status: 409 });
  assert.equal(relief.advance({ pledgeId: first, status: "IN_TRANSIT" }).status, "IN_TRANSIT");
  assert.equal(relief.advance({ pledgeId: first, status: "DELIVERED" }).status, "IN_TRANSIT");
  assert.equal(relief.history("first")[0].status, "DELIVERED");
  const second = relief.history("second")[0].id;
  relief.advance({ pledgeId: second, status: "IN_TRANSIT" });
  assert.equal(relief.advance({ pledgeId: second, status: "DELIVERED" }).status, "DELIVERED");
});
