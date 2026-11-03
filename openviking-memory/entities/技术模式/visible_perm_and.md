# 操作列 visible 与 permission 必须为 AND 组合
zs-operate-column 中按钮的 visible(row) 与 permission 需同时命中才渲染，避免业务态可见性旁路权限。

## 问题现象
- 按钮同时配 visible 与 permission 时，visible 返回 true 即渲染，即使无权限也显示（权限绕过 F01）
- 组件内部若为「visible 命中就显示，permission 只在无 visible 时生效」的短路结构，业务态控制会顶掉权限门禁

## 解决方案
- 组件层改为 `show = visible(row) && hasPermission(perm)` 的 AND 组合，而非任一命中即显示
- 改完必须回归无权限场景：用仅部分权限账号验证按钮不出现，只测有权限账号看不出问题
- 页面侧 data() 须声明 moduleName/businessName，否则 perm 拼错等价于放行
- 现有调用方若依赖旧 OR 行为，改 AND 后按钮变少，需逐个核对是正确收敛还是改调用方

## 验证与归属
- 验证：会话 session-9126d917-b8a3-4db0-b250-80e5b6c5d189（基线 c35a24a）交付记录首条确认修复
- 涉及文件：zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue、zhi2-web-admin/src/views/flood/components/CheckPage.vue
- 所属项目：zhi2-web-admin（防汛）；来源会话：session-9126d917-b8a3-4db0-b250-80e5b6c5d189；代码基线：c35a24a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "visible_perm_and",
  "source_extraction_id": "930bccb7cb144d8c9eea94018298599d",
  "version": 1,
  "memory_type": "entities"
}
-->