# 列表跨页保留选中致批量带旧数据
产品2.0 zs-select-column 默认 reserve-selection:true，翻页后旧页勾选仍留在 this.ids，逐页校验类批量操作会带上已翻页旧数据提交报错。

## 问题现象
- 列表多选列翻页后，之前页勾选的行仍留在 this.ids 里
- 批量操作（如权利人同步）带着已不在当前页的数据提交，接口校验报旧错
- 用户以为只选了当前页，实际选中集合与可见集合不一致

## 根因
- zs-select-column 默认 reserve-selection:true（el-table 跨页保留选中），翻页不清空勾选
- 配合列表刷新后 selection 也不同步

## 解决方案
- 对「按当前页选中做批量操作」的列表，显式传 `:reserve-selection="false"` 关闭跨页保留
- 加载新数据后清空选中：重写 listMixins 的 listCallback，在翻页/搜索回调里调用 clearSelection()
- 注意区分：跨页汇总类批量需求才该开 reserve-selection；逐页校验的批量操作必须关掉

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 f30c7962，根因是默认 reserve-selection:true，修复为 :reserve-selection="false" + 重写 listCallback 调 clearSelection()
- 涉及文件：zhi2-web-admin/src/views/property/complex/index.vue、zhi2-web-admin/src/components/zs-select-column/zs-select-column.vue
- 所属项目：产品2.0；来源会话ID：f30c7962-32af-468a-9d91-311b5e899302；代码基线：2198ce6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_select_column_reserve",
  "source_extraction_id": "643fcefaa41f48a5a04312521a319012",
  "version": 1,
  "memory_type": "entities"
}
-->