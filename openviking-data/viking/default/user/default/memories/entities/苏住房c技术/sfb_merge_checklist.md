# 跨 sfb 分支合并验收口径
苏住房C小程序把原分支近一月修复的 bug 与需求合并到 sfb 分支，要求除 sfb 特殊逻辑外业务逻辑与页面展示保持一致。

## 做法与判据
- 先复现再合并：确认缺陷在 sfb 分支确实存在，不存在则跳过，避免移植因架构不同的「伪缺陷」
- 差异需求以原分支改动为主，把 sfb 专属逻辑摘出单独保留，不用 sfb 旧实现覆盖原分支业务改动
- 合并后清冲突并跑 npm run build:test 构建验证，不只看 diff
- 构建报「Cannot read properties of undefined」或模块缺失，先按报错文件回查 import 的工具文件是否被漏同步

## 核心心法
- 分支合并缺陷常是「新代码+旧工具库」半合并状态，以「构建通过+主链路页面展示一致」为验收，非以「无冲突」为完成
- 典型坑：redirect/index.vue 引用 @/utils/app.js 的 backInfo，合并时 utils/app.js 未同步，补回整个原生桥接工具文件（backInfo/device/getMap）后构建通过

## 验证与归属
- 会话 b173b982：先确认 sfb 分支存在同样问题再合并，补回 utils/app.js 后 npm run build:test 通过，提交 5bdcbd01 推送 origin/sfb
- 涉及文件：redirect/index.vue、utils/app.js、utils/index.js、ZsImage.vue；代码基线 c7d6817

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "sfb_merge_checklist",
  "source_extraction_id": "81652a109a2b411098a21d593e97f48f",
  "version": 1,
  "memory_type": "entities"
}
-->