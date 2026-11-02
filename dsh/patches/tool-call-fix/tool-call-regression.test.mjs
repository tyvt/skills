import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';
const resolve = createRequire(path.join(path.dirname(process.execPath), 'node_modules/@deepseek-ai/dsh/package.json'));
const adapterFile = resolve.resolve('@deepseek-ai/dsh-llm-pi-ai');
const nativeResolve = createRequire(adapterFile);
const {defineTool,ToolRuntime}=await import(pathToFileURL(resolve.resolve('@deepseek-ai/dsh-tools')));
const parserFile=nativeResolve.resolve.paths('@earendil-works/pi-ai').map(dir=>path.join(dir,'@earendil-works/pi-ai/dist/utils/json-parse.js')).find(file=>existsSync(file));
if (!parserFile) throw new Error('Cannot locate the installed pi-ai argument parser');
const {parseToolCallArguments}=await import(pathToFileURL(parserFile));
const source=readFileSync(adapterFile,'utf8');
const start=source.indexOf('async function* toStreamChunks(');
const end=source.indexOf('//#endregion',start);
const convert=new Function('brandString','mapUsage','mapStopReason','toPiReplayState','LlmError',source.slice(start,end)+'; return toStreamChunks;')(x=>x,x=>x,()=>({kind:'tool-use'}),()=>({}),Error);
async function convertedArguments(raw){const call={type:'toolCall',id:'call-1',name:'grep',...parseToolCallArguments(raw)};async function* events(){yield {type:'toolcall_end',contentIndex:0,toolCall:call};yield {type:'done',message:{content:[call],usage:{}}};}const chunks=[];for await(const c of convert(events(),200000))chunks.push(c);return JSON.parse(chunks.find(c=>c.type==='block-end').block.arguments);}
function fixture(name='grep',parameters={pattern:{type:'string',required:true}}){let calls=0;const tool=defineTool({name,description:'fixture',parameters,execute:()=>{calls++;return 'ok'},output:{schema:{type:'string'},render:()=>[]}});return {tool,calls:()=>calls};}
test('malformed provider JSON retains its diagnostic instead of becoming an empty object',async()=>{const args=await convertedArguments('{"pattern":');assert.equal(typeof args,'string');assert.match(args,/Received arguments/);});
test('malformed JSON cannot execute a zero-parameter tool',async()=>{const {tool,calls}=fixture('side_effect',{});await assert.rejects(async()=>tool.execute(await convertedArguments('{bad')),/invalid arguments/);assert.equal(calls(),0);});
test('valid JSON and Windows path repair still work',async()=>{assert.deepEqual(await convertedArguments('{"pattern":"abc"}'),{pattern:'abc'});assert.deepEqual(await convertedArguments('{"pattern":"C:\\project"}'),{pattern:'C:\\project'});});
test('legitimate no-argument calls remain valid',async()=>{const {tool,calls}=fixture('get_goal',{});assert.equal(await tool.execute(await convertedArguments('')),'ok');assert.equal(calls(),1);});
test('missing arguments identify tool, required types and corrective instruction',async()=>{const {tool,calls}=fixture();await assert.rejects(()=>tool.execute({}),error=>{assert.equal(error.code,'INVALID_ARGS');assert.deepEqual(error.violations,['missing required property "pattern"']);assert.match(error.message,/grep/);assert.match(error.message,/pattern.*string/);assert.match(error.message,/JSON object/);return true});assert.equal(calls(),0);});
test('valid arguments are executed once without invented defaults',async()=>{const {tool,calls}=fixture();assert.equal(await tool.execute({pattern:'hello'}),'ok');assert.equal(calls(),1);});
test('malformed diagnostic reaches model feedback',async()=>{const {tool}=fixture();const args=await convertedArguments('{"pattern":');await assert.rejects(()=>tool.execute(args),/Received arguments/);});
test('unknown tools return only currently callable names',async()=>{const exec={name:'GetDynamicTools',signal:new AbortController().signal};const runtime=Object.create(ToolRuntime.prototype);runtime.cancellationStates=new WeakMap([[exec,{callerSignal:exec.signal,bodyInvoked:false}]]);runtime.resolveExecution=()=>undefined;runtime.schemas=()=>[{name:'grep'},{name:'read'},{name:'hidden'}];runtime.collapses=name=>name==='hidden';const result=await runtime.dispatchToolBody(exec);assert.equal(result.isError,true);const text=JSON.stringify(result.content);assert.match(text,/grep/);assert.match(text,/read/);assert.doesNotMatch(text,/hidden/);});
