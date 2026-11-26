import { readFileSync, existsSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const read = p => JSON.parse(readFileSync(resolve(root, p), "utf8"));
const assert = (ok, msg) => { if (!ok) throw new Error(msg); };
const nonempty = v => typeof v === "string" && v.trim().length > 0;
const flags = new Set(["US","CN","EU","JP"]);
const kinds = new Set(["partner-hub","radar","rate-dial","connection","trade","hub"]);
export function validateStory(s) {
  assert(nonempty(s.category) && nonempty(s.headline), "category/headline required");
  assert(Number.isFinite(s.durationSeconds) && s.durationSeconds >= 15 && s.durationSeconds <= 60, "duration outside 15–60 seconds");
  assert(["provisional","aligned"].includes(s.timingStatus), "invalid timing status");
  if (s.timingStatus === "aligned") assert(/^[a-f0-9]{64}$/i.test(s.alignmentSha256 ?? ""), "aligned story requires audio alignment SHA-256");
  assert(Array.isArray(s.topics) && s.topics.length > 0, "topics required");
  let previous = 0;
  for (const t of s.topics) {
    assert(nonempty(t.text), "topic text required");
    assert(Number.isInteger(t.startFrame) && t.startFrame > previous && t.startFrame < Math.round(s.durationSeconds * 30), "topic frames must be ordered and in range");
    previous = t.startFrame;
    const h = t.hero;
    assert(h && kinds.has(h.kind), "unsupported hero kind");
    if (h.kind === "partner-hub") {
      assert(flags.has(h.center) && Array.isArray(h.partners) && h.partners.length > 0 && h.partners.every(x => x === null || flags.has(x)), "invalid partner flags");
    }
    if (h.kind === "connection") assert(flags.has(h.left) && flags.has(h.right), "invalid connection flags");
  }
  if (s.audioPath !== undefined) assert(typeof s.audioPath === "string" && /^private\/[a-zA-Z0-9_./-]+\.(wav|mp3)$/.test(s.audioPath) && !s.audioPath.split("/").includes(".."), "audio must be a private relative path");
  return true;
}
export function validateRegistry(reg, load = read) {
  assert(reg.schemaVersion === 1 && Array.isArray(reg.items), "invalid registry");
  const ids = new Set(), keys = new Set();
  for (const item of reg.items) {
    assert(/^GW-\d{3,}$/.test(item.id) && !ids.has(item.id), "duplicate or invalid ID");
    assert(nonempty(item.eventKey) && !keys.has(item.eventKey), "duplicate or empty event key");
    ids.add(item.id); keys.add(item.eventKey);
    assert(nonempty(item.title), "missing title");
    assert(["idea","draft","preview","approved","uploaded","scheduled","published"].includes(item.status), "invalid status");
    assert(["unverified","external","owner-reported"].includes(item.provenance), "invalid provenance");
    assert(Array.isArray(item.sourceUrls) && item.sourceUrls.every(x => typeof x === "string" && /^https?:\/\//.test(x)), "invalid source URLs");
    if (item.provenance === "external") assert(item.sourceUrls.length > 0, "external provenance needs source");
    let story;
    if (item.storyPath !== null) {
      assert(typeof item.storyPath === "string" && /^stories\/[a-z0-9-]+\.json$/.test(item.storyPath), "invalid story path");
      story = load(item.storyPath); validateStory(story);
    }
    if (["approved","uploaded","scheduled","published"].includes(item.status)) {
      assert(item.publication?.ownerApproved === true && item.provenance !== "unverified", "release requires owner approval and provenance");
      assert(story && story.timingStatus === "aligned" && story.audioPath, "release requires aligned story and audio path");
      assert(!story.topics.some(t => t.hero.kind === "partner-hub" && t.hero.partners.includes(null)), "release has placeholder flags");
    }
    if (item.status === "uploaded") assert(nonempty(item.publication.uploadedAt), "upload date required");
    if (item.status === "scheduled") assert(nonempty(item.publication.scheduledAt), "schedule date required");
    if (item.status === "published") assert(nonempty(item.publication.publishedAt) || nonempty(item.publication.youtubeUrl), "publication evidence required");
  }
  return true;
}
export function validateRepository() {
  const tokens = read("brand/tokens.json");
  assert(tokens.frame.width === 1080 && tokens.frame.height === 1920 && tokens.typography.sizes1080.minimum >= 32, "frame/type mismatch");
  assert(tokens.palette.primary === "#A3E635" && tokens.palette.secondary === "#38BDF8" && tokens.palette.alert === "#FF625C", "approved colors changed");
  const audio = read("config/audio.json");
  assert(audio.voice.voice === "af_jessica" && audio.music.bpm === 128, "approved audio identity changed");
  assert(existsSync(resolve(root, audio.music.path)), "approved music missing");
  validateRegistry(read("content/registry.json"));
  return true;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  validateRepository(); console.log("GlyphWire repository validation passed");
}
