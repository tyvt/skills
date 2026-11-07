# 同页多弹窗街道社区编码未统一转中文
同一详情页内多个选择类弹窗各自内联维护表格列定义，修复 formatter 时容易只改一半，导致部分弹窗仍显示区划编码。

## 问题根因
- 共有资金→开户申请详情页 benefit/pubRegulatoryAccount/detail 含两个选择弹窗：showPropertyProjectDialog 与 showCompanyDialog
- 两个弹窗各自写死 label/prop/formatter 列定义，并非同一份配置
- 2.6.2 通过 bug42256 仅给 showPropertyProjectDialog 的街道、社区列补 subdistrictFormatter/communityFormatter
- showCompanyDialog 仍直接绑 prop:'subdistrict'/'community'，弹窗显示 320505002 这类编码而非「双塔街道」

## 解决方案
- 修复时将同页所有弹窗的街道/社区列对齐，统一 formatter: this.subdistrictFormatter / this.communityFormatter
- area 格式化能力由 detailMixins 引入的 area mixin 提供，弹窗可直接 this.subdistrictFormatter 使用，无需新增依赖
- 排查同类问题按「本文件内 grep prop:'subdistrict' 次数」做全量核对，确保同页所有弹窗口径一致
- 新建弹窗若需展示区划，直接照抄这一对 formatter

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 63c29103 确认 showPropertyProjectDialog 已在 2.6.2 加 formatter，showCompanyDialog 漏改仍显示编码，随后补齐
- 涉及文件：zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/detail.vue、src/mixins/area.js、src/mixins/detailMixins.js
- 所属项目：苏住房G；来源会话ID：63c29103-0eb8-4867-986d-5ca6a0993ecb；代码基线：92ce738

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "multi_popup_formatter",
  "source_extraction_id": "d232d627a6c741e59b90b3a2003fb294",
  "version": 1,
  "memory_type": "entities"
}
-->