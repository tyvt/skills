# 表决详情按钮禁止v-show与v-hasPermi混用
太仓G端表决类详情页底部业务按钮混用 `v-show` 与 `v-hasPermi` 导致状态已变仍显示错误按钮，且状态比较须归一类型。

## 问题根因
- 同时写 `v-show`（按 bizState/decisionState）和 `v-hasPermi`，有权时 `el.style.display=''` 覆盖 `display:none`
- 接口返回 `decisionState`/`bizState` 可能是数字，`['1','2','5'].includes(x)` 对数字 5 失效

## 修复方案
- 业务状态与权限合并进单一 `v-if`，权限用 `checkPermission([...])` 或计算属性
- 比较前 `String(x)` 或统一计算属性；延期态 `decisionState=5` 纳入「提前结束」「撤销」等展示条件

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 6bb25673 一般表决延期态缺按钮；同主题 bundle 002/008 归纳 v-show 与 v-hasPermi 互相覆盖
- 涉及文件：zhi1-web-admin/src/views/estate/optionDecision/detail.vue、ownerDecision/detail.vue、directives/permission/hasPermi.js
- 所属项目：太仓G；来源会话：6bb25673-a3f0-4f17-9c69-8943d17f4cb8；代码基线：e177dad

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vshow_haspermi_mix",
  "source_extraction_id": "ee62528ea6844ee48025867c5031521c",
  "version": 1,
  "memory_type": "entities"
}
-->