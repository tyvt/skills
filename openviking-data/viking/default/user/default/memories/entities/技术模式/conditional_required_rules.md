# 联动显隐字段条件必填规则
开户等表单中「是否结息」为是时才展示并校验「结息类型」，应使用 rules.required 表达式而非自定义 validator。

## 问题背景
- 物业管理区域开户 complex/detail 中「结息类型」仅用自定义 validator 能触发校验，但 Element UI 不会在标签前显示必填红星
- 全局约定「红星只认 rules.required」，自定义 validator 无法满足显隐联动必填星号

## 解决方案
- 写成 rules 项：required: this.form.ifSettlement == '1'，message 与 trigger 与同模块其他字段一致
- 字段 v-if 隐藏时继续依赖 handleIfSettlementChange 等逻辑清空并跳过校验
- 不要为要星号单独 hack CSS

## 验证与归属
- 验证证据：物业管理区域开户 complex/detail 改后为「是否结息=是」联动显示红星
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountOpen/complex/detail.vue、zhi2-web-admin/src/views/maintenance/accountOpen/components/detail.vue
- 所属项目：园区公共收益；来源会话：60384e27-d5c5-4139-80d6-c344a20e3167；代码基线：7458acc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "conditional_required_rules",
  "source_extraction_id": "819e5a7101104283bab49fe88e924f5a",
  "version": 1,
  "memory_type": "entities"
}
-->