import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateStory, validateRegistry, validateRepository } from "./validate.mjs";
const story = () => JSON.parse(readFileSync(new URL("../stories/tariff-preview.json", import.meta.url)));
const registry = () => JSON.parse(readFileSync(new URL("../content/registry.json", import.meta.url)));
test("current repository", () => assert.equal(validateRepository(), true));
test("valid provisional story", () => assert.equal(validateStory(story()), true));
test("reject repeated or out-of-range timings", () => {
  const s=story(); s.topics[1].startFrame=s.topics[0].startFrame; assert.throws(()=>validateStory(s), /ordered/);
  s.topics[1].startFrame=999; assert.throws(()=>validateStory(s), /ordered/);
});
test("reject unsupported flags", () => {
  const s=story(); s.topics[0].hero.partners[0]="ZZ"; assert.throws(()=>validateStory(s), /flags/);
});
test("reject fabricated aligned status", () => {
  const s=story(); s.timingStatus="aligned"; assert.throws(()=>validateStory(s), /SHA-256/);
});
test("reject duplicate events", () => {
  const r=registry(); r.items.push({...r.items[0], id:"GW-002"}); assert.throws(()=>validateRegistry(r,story), /event key/);
});
test("reject unapproved release", () => {
  const r=registry(); r.items[0].status="published"; assert.throws(()=>validateRegistry(r,story), /approval/);
});
test("reject unsafe audio path", () => {
  const s=story(); s.audioPath="private/../voice.wav"; assert.throws(()=>validateStory(s), /private relative/);
});
