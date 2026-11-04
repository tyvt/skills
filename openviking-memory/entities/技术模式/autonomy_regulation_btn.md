# 规约备案按钮文案动态化
苏住房G(zhi2-web-admin)规约管理备案列表页修复硬编码按钮文案，随菜单动态显示规约名。

## 问题根因
- 原「备案」按钮文案硬编码，三套规则共用组件时显示不一致

## 解决方案
- 改动唯一一处硬编码位置 `zhi2-web-admin/src/views/autonomy/regulation/components/index.vue`
- 引入枚举与工具：`import { VERSION_TYPE, REGULATION_TYPE, REGULATION_NAME } from '@/enums'`、`import { getKeyByValue } from '@/utils/index'`
- 新增 computed `regulationName()` 用 `getKeyByValue(REGULATION_TYPE, this.regulationType)` 映射名称
- 按钮文案改为 `已备案${this.regulationName}`

## 验证与归属
- 效果：管理规约→「已备案管理规约」、议事规则→「已备案议事规则」、工作规则→「已备案工作规则」
- 权限标识、点击跳转逻辑不变；其它同类页面本就按动态显示
- 涉及文件：autonomy/regulation/components/index.vue、autonomy/discuss/final/index.vue
- 所属项目：苏住房G；来源会话：ba726002-0b18-413d-9066-a944320c62c9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "autonomy_regulation_btn",
  "source_extraction_id": "fc267760b60448b0969348d7d12b352f",
  "version": 1,
  "memory_type": "entities"
}
-->