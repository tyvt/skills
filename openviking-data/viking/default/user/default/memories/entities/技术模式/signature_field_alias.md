# 后端字段未契约化时前端多别名容错
后端签名字段名未定（#2145/#1977 仍 wait）时，前端主用 `signatureUrl` 并兼容多个兜底别名，先跑通链路并显式记录收敛风险。

## 背景与原因
- C 端「业主倡议签字环节」需往提交体带签名，但后端字段名尚未定稿
- 后端未就绪时，前端等则阻塞联调，硬编码猜字段名则猜错静默丢签名
- 多别名容错让当前链路先跑通，同时显式记录不确定性避免将来无人记得收敛

## 做法要点
- 主字段 `signatureUrl` 首选，其余 `signUrl`/`promoterSign`/`initiatorSignature` 为兜底，按优先级依次尝试
- 别名列表只放一处常量，提交侧用主字段，回显侧用同一套取值函数
- 必须写明遗留风险「待后端定字段后可能需要收敛」并关联后端任务号 #2145/#1977
- 后端定稿后回头删掉多余别名，别让兼容层永久留存

## 分支改动形态
- 覆盖 main-v2.1-mp / sfb(父 dev-sfb) / main-v2.1 三支，每支 `propose/form.vue` 的 `submit()` 补 `signatureUrl: voteStore.signUrl`
- 每支 `propose/detail.vue` 新增「发起人签字」卡片回显，并分别提交子模块与父仓 gitlink

## 验证与归属
- 来源会话 session-4208fc64-80b9-409d-8aad-a50126748229（基线 c35a24a）「剩余风险（明示）」与「C端 #1976 三个分支全补全签字环节」
- 三分支两级提交号：main-v2.1-mp 子 `7b6c2017`/父 `eef287f`；sfb 子 `7a302eb8`/父 `e6e6d31`；main-v2.1 子 `8adcc4ff`/父 `190dd38`
- 涉及文件：ResponseTable.vue、ResponseDialog.vue、suggest/detail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "signature_field_alias",
  "source_extraction_id": "e4f7a4332a82405ead33f2c2960fbe01",
  "version": 1,
  "memory_type": "entities"
}
-->