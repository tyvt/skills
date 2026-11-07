# 详情页模式标志用 detailMixins 的 formMode
走 detailMixins 的整页详情页统一用 mixin 提供的 formMode（add/edit/view），不能用弹窗子组件的 dialogMode。

## 问题现象
- 详情页（detailMixins 驱动）内嵌弹窗复制了独立弹窗子组件写法，模板引用 dialogMode，控制台报 Vue warn「Property or method dialogMode is not defined」且查看/编辑判断失效

## 根因
- dialogMode 是弹窗子组件通过 props 接收的模式标志
- 走 detailMixins 的整页详情页统一用 formMode，页面自身没定义 dialogMode，渲染期读取 undefined

## 解决方案
- 详情页内弹窗/区块按查看态分流一律用 formMode == 'view' 走只读（DetailTemplate/contentInfo），新增/编辑走可编辑表单，与页面其他区块保持同一判定字段
- 复刻弹窗子组件代码到详情页时必须做「模式标志名对齐」检查（dialogMode→formMode），同模块兄弟详情页（如 facilityChange）有相同写法要一并修

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 46f27f37，Vue warn dialogMode not defined；结论改为 v-if="formMode == 'view'"，facilityChange 同步修改
- 涉及文件：zhi2-web-admin/src/views/maintenance/facility/detail.vue；zhi2-web-admin/src/views/maintenance/facilityChange/detail.vue；zhi2-web-admin/src/mixins/detailMixins.js
- 所属项目：产品2.0；来源会话ID：46f27f37-13c0-41e5-8c63-7986f337f5da；代码基线：0161609

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_formmode",
  "source_extraction_id": "c8b52637b66a4cfba2ab5391cdb691f9",
  "version": 1,
  "memory_type": "entities"
}
-->