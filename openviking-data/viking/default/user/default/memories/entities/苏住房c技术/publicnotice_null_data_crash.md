# 单对象接口返回 null 被强加列表致模板崩溃
苏住房C 市民端公告详情因接口 data:null 被包装成列表唯一行，子组件读字段崩。

## 问题现象
- 进入公告详情报 TypeError: Cannot read properties of null (reading 'companyName')
- 堆栈落在 ListContractIndex.vue 首行经 baseCard 插槽渲染时

## 根因
- 合同公告接口 getContractNoticeList 无合同时返回 data: null
- publicNotice.vue 无条件 res.rows = [res.data] 将 null 塞成列表唯一行
- 子组件模板访问 detailData.companyName 崩溃，属单对象接口硬塞分页列表形态

## 解决方案
- 数据侧：res.rows = res.data ? [res.data] : []; res.total = res.data ? 1 : 0
- 展示侧：ListContractIndex 根节点加 v-if="detailData"，prop 默认值从 {} 改工厂函数 () => ({})
- 无合同正常显示「暂无相关数据」；凡单对象包装列表处均需空值判定

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证会话 ddfa164f：堆栈 Vue2 renderSlot → baseCard.vue 插槽 → ListContractIndex.vue:4；修复 publicNotice.vue 赋值与 ListContractIndex.vue 防御
- 涉及文件：src/pages/publicNotice/publicNotice.vue、src/pages/publicNotice/components/ListContractIndex.vue、src/api/notice.js、src/components/commonNew/baseCard.vue
- 所属项目：苏住房C；来源会话ID：ddfa164f-7797-420b-afa6-c5e85e60b348；代码基线：83c4136

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "publicnotice_null_data_crash",
  "source_extraction_id": "d37fa3aa8383435db39d4c43bf59ba61",
  "version": 1,
  "memory_type": "entities"
}
-->