import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizeAnswer, parseArgs } from './solve-captcha.mjs'

test('算术：正常加减乘除，脚本自行计算', () => {
  assert.equal(normalizeAnswer('9').answer, '9')
  assert.equal(normalizeAnswer('12-3').answer, '9')
  assert.equal(normalizeAnswer('6×7').answer, '42')
  assert.equal(normalizeAnswer('8÷2').answer, '4')
  assert.equal(normalizeAnswer('9').confidence, 'medium') // 纯数字结果
  assert.equal(normalizeAnswer('12-3').confidence, 'high') // 回显算式
})

test('负数操作数：X-1?= 读成 -1 不再丢答案', () => {
  assert.equal(normalizeAnswer('3 + -1').answer, '2')
  assert.equal(normalizeAnswer('3 + -1').confidence, 'high')
  assert.equal(normalizeAnswer('-2').answer, '-2') // 纯负数字结果
})

test('离谱值兜底：>9999 判 low 且 answer 为空，由上层重试', () => {
  assert.equal(normalizeAnswer('34889').answer, '')
  assert.equal(normalizeAnswer('34889').confidence, 'low')
  assert.equal(normalizeAnswer('').answer, '')
})

test('合法大数不被误杀', () => {
  assert.equal(normalizeAnswer('8000').answer, '8000')
  assert.equal(normalizeAnswer('100×90').answer, '9000')
})

test('忽略数字乘法：认错数字再算对由算式自算纠正', () => {
  assert.equal(normalizeAnswer('8+9=105').answer, '17')
})

test('文本型保留大小写', () => {
  assert.equal(normalizeAnswer('aB3').answer, 'aB3')
})

test('parseArgs 默认与参数解析', () => {
  const d = parseArgs(['cap.jpg'])
  assert.equal(d.vote, 1); assert.equal(d.upscale, 1); assert.equal(d.arg, 'cap.jpg')
  const v = parseArgs(['cap.jpg', '--json', '--vote=3', '--upscale=2', '--model=auto/x'])
  assert.equal(v.vote, 3); assert.equal(v.upscale, 2); assert.equal(v.model, 'auto/x')
  assert.equal(v.wantJson, true); assert.equal(v.arg, 'cap.jpg')
})
