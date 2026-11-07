# 网关 zs-method:delete 缺陷
防汛模块 E2E 删除接口经网关返回 400/1400，直连 DELETE 返回 200，定位为网关 method tunneling 改写缺陷。

## 方法隧道约定
- 修改 = `POST` + 请求头 `zs-method: put`，删除 = `POST` + 请求头 `zs-method: delete`（来源会话 session-c3716c15 Key Technical Concepts）
- 该约定用于本项目所有写操作

## 缺陷现象与定位
- 防汛模块 E2E 删除步骤接口返回 400/1400，删除不生效
- 直连对照实验：同 URL 直接发 `DELETE` 返回 200，经网关发 `POST + zs-method: delete` 返回 400/1400
- 差异仅在网关对 `zs-method` 头改写/转发路径，结论为「网关 zs-method:delete 缺陷待后端」
- E2E 删除类接口只能先记为遗留，不能算前端 bug，也不要在前端加 try/catch 假装成功

## 排查流程
- 遇到 tunneled 删除失败，同一路径分别发 `POST+zs-method:delete`、原生 `DELETE`、直连后端端口三种比对状态码
- 直连后端 200 + 过网关 400 → 网关缺陷，登记为后端遗留
- 原生 `DELETE` 能通说明后端接口本身支持，改法等网关修好或临时直连用原生 DELETE
- 每条 E2E 失败区分「前端实现错」「后端未就绪」「网关缺陷」三类，遗留写进 `zhi2-web-admin/docs/flood/common-errors.md`
- 同类排查对 `zs-method: put` 同样适用

## 验证与归属
- 来源会话 session-42ca405e-529e-4af3-98b5-81e2b92083de（基线 6156653）最终结论交付记录带 `[PUA生效 🔥] 网关 delete 改写直连对照实验`
- 涉及文件：zhi2-web-admin/e2e-flood-crud.cjs、docs/flood/common-errors.md、src/utils/request.js


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_delete_defect",
  "source_extraction_id": "f53177084e504b838182c24425977ff7",
  "version": 1,
  "memory_type": "entities"
}
-->