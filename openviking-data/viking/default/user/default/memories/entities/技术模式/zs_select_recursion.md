# zs-select MultiSelect 递归更新修复
修复 MultiSelect.vue 中 updated() 无条件调用 resetInputHeight() 导致的递归更新死循环。

## 问题根因
- updated() 钩子里无条件调用 this.$refs.elSelect.resetInputHeight()
- resetInputHeight() 引发 ElSelectDropdown 内部状态更新，形成 update→updated→resetInputHeight→update 死循环
- 最终抛出 Maximum recursive updates exceeded in <ElSelectDropdown>

## 解决方案
- 移除 updated() 里的强制调用
- 改为只在 $attrs.value / $attrs.options 变化时调用一次，并做去重与定时器合并
- 修改文件：zhi2-web-admin/src/components/zs-select/MultiSelect.vue

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证状态：该文件无新增 linter 错误，本地开发服务可正常启动（端口占用自动切到 8084）
- 所属项目：2-0；来源会话ID：533423a8-81bd-4094-9c97-d30615178fc1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_select_recursion",
  "source_extraction_id": "bfd013e391d9471ea436a5f588e52aad",
  "version": 1,
  "memory_type": "entities"
}
-->