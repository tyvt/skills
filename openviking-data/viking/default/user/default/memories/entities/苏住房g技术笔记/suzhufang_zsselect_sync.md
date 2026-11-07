# 苏住房G 子表行内 zs-select 的 :value.sync 失效
property/serviceItem/detail.vue 行内用 zs-select :value.sync 切选项不刷新，且表格重构误删顶部预览区。

## 问题现象
- 阳光物业服务事项新增页行内下拉切「固定内容/文本输入」看似无反应，仅部分列跟随变
- 同期表格上方「服务内容：xxx」预览区因重构被删，用户报「切换不生效且顶部预览没了」

## 根因
- Vue 2 对插槽作用域对象嵌套属性的 .sync 双向绑定不可靠：zs-select $emit('update:value') 后父层 .sync 赋值路径落 tableData[i] 二级属性
- 该属性行对象创建时未声明，运行时追加不触发响应式（与 data 未声明状态→对 undefined 调 forEach 同类根因）

## 解决方案
- 行内控件改单向 :value + 显式 @update:value 回调
- 回调用 this.$set(this.tableData, rowIndex, {...row, contentType: val}) 回写保响应式
- initDefaultContentType 字典加载写默认值也改 $set
- 改版确认被删派生视图（contentStr 计算属性）是否有业务方依赖，新增态文本输入给 [x] 占位符

## 验证与归属
- 验证会话 b1211693（2026-07-27，基线 d109b83）：用户报服务事项新增切换不生效且顶部无预览
- 修复为 :value + @update:value + handleContentTypeChange 配 $set 更新 tableData，恢复 contentStr + initDefaultContentType 改 $set
- 涉及文件：zhi2-web-admin/src/views/property/serviceItem/detail.vue、zhi2-web-admin/src/views/property/serviceItem/index.vue
- 所属项目：苏住房G；代码基线：d109b83
- 与已知「行内可编辑子表 computed setter 当 v-model 让 zs-table 重算高度 row 为 undefined」根因修法不同，勿混

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "suzhufang_zsselect_sync",
  "source_extraction_id": "5476d06cd4c6428c960d083c3f249c32",
  "version": 1,
  "memory_type": "entities"
}
-->