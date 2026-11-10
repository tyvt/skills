# 租赁详情弹窗宽度与字段换行修复
门户企业开业信息公示基本信息弹窗（RentalDetailDialog，rental-enterprise 类型）长字段值（经营范围、企业名称等）在自身栅格单元内换行，弹窗宽度由 fit-content 演进至 960px，避免文字溢出压到相邻字段。

## 改动要点
- 文件：zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue（含 formatCapital 逻辑，显示如 327,117.71万元）；另一变体 zhi2-web-admin-wt-payfund/.../RentalDetailDialog.vue 也同步做相同宽度与换行修复
- 企业详情弹窗宽度演进：`width: fit-content` → 固定 `880px`（2026-11-09，保留 `min-width: 880px`）→ `960px`（2026-11-10，用户要求"稍微宽一些"）
- 新增 `.rental-field-pair.is-full .rental-field-value` 规则：`white-space: normal; overflow-wrap: anywhere; word-break: break-word`（2026-11-09，经营范围等独占整行字段换行）
- 2026-11-10 将基础类 `.rental-field-value` 由 `white-space: nowrap` 改为 `normal` + `overflow-wrap: anywhere`，根因为企业名称（如"苏州创元投资发展（集团）有限公司"16字）因 nowrap 溢出到相邻"统一社会信用代码"单元格
- 修复前长文本会把弹窗撑到 1552px（接近满屏），2026-11-09 修复后保持 880px，2026-11-10 进一步加宽至 960px

## 验证与归属
- 验证：nginx 门户站点 8092 实测，短文本 880px 单行、长经营范围 880px 换行 4 行无横向溢出
- 构建副产物 `public/version.json` 按规范还原，不纳入提交
- 所属项目：门户（zhi2-web-admin 及 zhi2-web-admin-wt-payfund）
- 提交：子模块 develop/v2.6.2-portal 提交 77a7e6dee 已推送；主仓库 门户 gitlink 更新至 77a7e6d，提交 7165f68 已推送
- 来源会话时间：2026-11-09 及 2026-11-10
- 2026-11-10 验证：CSS 改动需重建/刷新页面（HMR）后在 http://127.0.0.1:3080 查看效果

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "rental_dialog_wrap",
  "source_extraction_id": "cdc0b6037cb24dd0bc03a070fcc60609",
  "version": 2,
  "memory_type": "entities"
}
-->