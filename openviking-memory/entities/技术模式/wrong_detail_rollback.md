# 误改/detail接口批量回滚
批量脚本误将 publish、calculationChart 等非详情接口改为 `./detail`，已按规范回滚约93个文件。

## 根因与规范
- 根因：批量脚本把非详情接口也改成 `../detail`
- 操作类：`POST /action` + body，不加 `/detail`
- 查询类：`POST` 原路径 + body，不加 `/detail`
- 实体详情：保留 `POST /entity/detail`

## 修复结果
- `candidateCollect` 发布公告改为 `this.$post('/system/msg/publish', { msgId: this.form.msgId })`
- 修复批量替换遗留语法错误，`vite build` 通过（约2m27s）
- 误改清单见 `zhi2-web-admin/scripts/audit-wrong-detail-apis.json`

## 验证与归属
- 涉及文件：`audit-wrong-detail-apis.js`、`src/api/company/companyRecord.js`、`toB/companyRecord/detail.vue` 等
- 所属项目：产品2.0；来源会话：ab733ff8-e8ba-41af-a40c-4a367ebc6c84；代码基线：none
- 联调建议重点验证消息发布/撤回、表决图表、大屏统计等接口路径

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "wrong_detail_rollback",
  "source_extraction_id": "e126efa632a44debbf017f2d54ab133a",
  "version": 1,
  "memory_type": "entities"
}
-->