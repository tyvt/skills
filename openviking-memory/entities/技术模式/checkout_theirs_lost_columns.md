# 合并冲突 git checkout --theirs 静默丢失列表列配置
经营资源租赁合同列表曾因合并冲突整文件执行 `git checkout --theirs` 导致「位置」列定义被覆盖丢失，非编译或接口问题。

## 问题根因
- `resourcesLeaseContractFiling/index.vue` 曾加「位置」列（`prop: 'addr'`，夹在「资源类型」与「合同金额(元)」之间），联调正常
- 回归不显示因处理合并冲突对整文件执行 `git checkout --theirs`，列定义被覆盖

## 修复方案
- 重新补列并与详情子表 `subVenueTable` / `subAdvertiseTable` 的 `addr` 对齐
- 列空值需核对 `/benefit/pubRevenueContract/page` 列表 VO 是否返回 `addr`
- 该 index 同时服务公共场地、广告位及租赁管理下经营资源合同列表

## 验证与归属
- 验证证据：用户反馈「位置」列曾显示后消失；结论写明合并时 `git checkout --theirs` 覆盖导致列丢失，已补回 addr 列
- 涉及文件：zhi2-web-admin/src/views/benefit/resourcesLeaseContractFiling/index.vue、assetLeaseApply/components/subVenueTable.vue、assetLeaseApply/components/subAdvertiseTable.vue
- 所属项目：园区公共收益；来源会话：4180a40a-e54f-4dce-81bf-474dc67eda03；代码基线：08d3255

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "checkout_theirs_lost_columns",
  "source_extraction_id": "05eb26b7a0194582af009060b1946206",
  "version": 1,
  "memory_type": "entities"
}
-->