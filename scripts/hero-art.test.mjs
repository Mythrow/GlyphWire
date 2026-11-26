import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {heroArt,reveal} from "../src/shorts/heroArt.ts";
const read=p=>JSON.parse(readFileSync(new URL("../"+p,import.meta.url),"utf8"));
const palette=read("brand/tokens.json").palette;
const story=read("stories/tariff-preview.json");
const flags={US:"data:image/svg+xml;base64,dGVzdA==",CN:"data:image/svg+xml;base64,dGVzdA==",EU:"data:image/svg+xml;base64,dGVzdA==",JP:"data:image/svg+xml;base64,dGVzdA=="};
test("frame-driven reveal clamps and increases",()=>{
  assert.equal(reveal(-1,0,10),0);assert.equal(reveal(20,0,10),1);assert.ok(reveal(5,0,10)>reveal(2,0,10));
});
test("every hero frame produces deterministic finite vector geometry",()=>{
  for(let i=0;i<story.topics.length;i++){
    const topic=story.topics[i],end=story.topics[i+1]?.startFrame??720;
    for(let f=topic.startFrame;f<end;f++){
      const svg=heroArt(topic.hero,f-topic.startFrame,palette,flags);
      assert.equal(svg,heroArt(topic.hero,f-topic.startFrame,palette,flags));
      assert.ok(svg.length>0);assert.doesNotMatch(svg,/NaN|Infinity|undefined|<text|<script/i);
    }
  }
});
test("partner placeholders are not invented flags",()=>{
  const svg=heroArt(story.topics[0].hero,120,palette,flags);
  assert.equal((svg.match(/<image /g)||[]).length,4);
});
test("connection resolves to approved coral",()=>{
  const svg=heroArt(story.topics[3].hero,100,palette,flags);
  assert.ok(svg.includes('stroke="'+palette.alert+'"'));assert.equal((svg.match(/<image /g)||[]).length,2);
});
test("fixed frame geometry remains unchanged",()=>{
  const frame=readFileSync(new URL("../src/shorts/TopicShort.tsx",import.meta.url),"utf8");
  for(const fragment of ['padding: 96','top: 96, right: 96','<Logo size={120}','top: 640','top: 860','bottom: 96, height: 8','scale(${1 - 0.42 * shrink})','background: palette.background','f / durationInFrames'])assert.ok(frame.includes(fragment),fragment);
});
