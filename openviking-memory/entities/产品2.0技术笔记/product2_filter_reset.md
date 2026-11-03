# 产品2.0 筛选条件被默认值重置
[苏房] 产品2.0 列表页「业务状态」筛选项能选却查不动，因 getQueryParams 硬写默认值每次查询重置。

## 问题现象
- 下拉显示可选，选中其他状态点查询后结果仍是「已备案」。
- UI 回显用户选择，但查询 payload 被静默改写。

## 根因
- 2026-05-07 新建页面时筛选项写入 formItems；2026-05-19 在 getQueryParams 补「无值时默认已备案」且写在校验外，无条件覆盖选中值。
- 查询参数构造器把默认值写成无条件赋值，而非空值兜底。

## 解决方案
- 默认值必须写成空值兜底（if (!query.bizState) query.bizState = DEFAULT），不在构造器直接赋值。
- 遇筛选不生效先打 log 看 getQueryParams/handleQuery 产出 payload。
- 同一筛选条件不要两处来源（组件初值+构造器初值）。
- 考古用 git log -S '字段名' -- 文件 定位引入提交（本例 717e0e6f1 / cll）。

## 验证与归属
- 验证会话 7fcdcc25：用户反馈默认已备案选不了其他，排查为 5-19 改动导致。
- 涉及文件：resourcesLeaseContractFiling/index.vue、listMixins.js。
- 所属项目：产品2.0；代码基线：5029af0。

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术笔记",
  "name": "product2_filter_reset",
  "source_extraction_id": "ebabd8f7ad774dafbc19579a0e860e5b",
  "version": 1,
  "memory_type": "entities"
}
-->