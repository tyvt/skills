# 列表 link 跳详情三处对齐
为统计/列表列添加 zs-table-column link 跳转时，除引入 getRouterPathByFilePath 外还需核对主键回退、路由语义与权限合法性三处，否则列可点但报参数异常或 404。

## 关键要点
- 主键回退：页面 primaryKey 为 complexId 时，点击处理需用 row?.projectId || row?.complexId（或反向），不能只认一个字段名。
- 路由语义：列展示「物业管理区域/complexName」时跳转目标可能是 property/complex/detail 而非 building/project/detail；两套主键非同一实体时禁止混用。
- 权限与合法性：getRouterPathByFilePath 无菜单会 msgError 并 throw，router.push 外层要 try/catch；主键用 isNavigableDataId 拦截空串、add 等非法段。

## 实施建议
- 对照同仓库已落地 pubBankAccountInfo 等页抄模式，不要只改模板不改 id 来源。

## 验证与归属
- 验证：primaryKey 为 complexId 若列表接口只带 complexId 不带 projectId 点击提示参数异常；列展示 complexName 使用 building/project/detail；getRouterPathByFilePath 无菜单权限时 msgError 并 throw；Fix: isNavigableDataId。
- 涉及文件：zhi2-web-admin/src/views/property/userStatistics/index.vue、zhi2-web-admin/src/utils/ruoyi.js
- 所属项目：惠山二期G；来源会话：434fe31b-709a-4ab2-b00a-310a247d5d86；代码基线：289cc30

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "link_detail_align",
  "source_extraction_id": "66a2e2029661484ebfefac8efb7a3328",
  "version": 1,
  "memory_type": "entities"
}
-->