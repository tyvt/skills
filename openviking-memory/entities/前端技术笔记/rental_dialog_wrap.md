# 租赁详情弹窗经营范围换行修复
门户企业开业信息公示基本信息弹窗（RentalDetailDialog）长经营范围文本在固定 880px 宽度内换行，避免弹窗被撑宽。

## 改动要点
- 文件：zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue
- 企业详情弹窗由 `width: fit-content` 改为固定 `width: 880px`（保留 `min-width: 880px`）
- 新增 `.rental-field-pair.is-full .rental-field-value` 规则：`white-space: normal; overflow-wrap: anywhere; word-break: break-word`
- 修复前长文本会把弹窗撑到 1552px（接近满屏），修复后保持 880px 不变

## 验证与归属
- 验证：nginx 门户站点 8092 实测，短文本 880px 单行、长经营范围 880px 换行 4 行无横向溢出
- 构建副产物 `public/version.json` 按规范还原，不纳入提交
- 所属项目：门户（zhi2-web-admin）
- 提交：子模块 develop/v2.6.2-portal 提交 77a7e6dee 已推送；主仓库 门户 gitlink 更新至 77a7e6d，提交 7165f68 已推送
- 来源会话时间：2026-11-09

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "rental_dialog_wrap",
  "source_extraction_id": "e9a3b012b5094c79b068d63c7eacbb9c",
  "version": 1,
  "memory_type": "entities"
}
-->