# 公共收益编辑页行政区划为空报错
无锡市区G（公共收益/专户管理）中管理主体、开户申请/监管账户、开户变更三个编辑页保存时后端报"行政区划不能为空"，根因为前端编辑未回填 regionName。

## 根因
- 后端 PubManagementOrgSaveDto、PubRegulatoryAccountChangeSaveDto、PubRegulatoryAccountSaveDto 对 regionName 均有 @NotBlank(message="行政区划不能为空")
- 三个编辑页表单未渲染行政区划字段，getDetail 加载详情后从不回填 regionName
- 当记录本身 region_name 为空（如"同步数据"导入记录）时，提交体 regionName 缺省导致后端校验拒绝

## 修复方案
- 三个页面 getDetail 加载详情后统一调用 fillRegionName()
- 已有 regionName 则保留；否则用记录 regionCode 经 getFullRegionNameByRegionCode(allAreas, code) 拼全名（同步，覆盖绝大多数记录）
- 仍为空且存在 projectId 时拉 /property/complex/{projectId} 用其 region 补齐
- allAreas 来自 store state.common.allAreas，由 /system/region/list 初始化填充

## 涉及文件与归属
- pubManagementOrg/detail.vue（管理主体）、pubRegulatoryAccount/detail.vue（监管账户/开户申请）、pubRegAccountChange/detail.vue（开户变更）
- 修复分支 bugfix/region-name-edit，合入 develop/v2.6.1 提交 e4e4d0bd0
- 构建产物位于 D:epository\无锡市区G\dist，nginx 自测站点端口 8105，代理无锡网关 unlimited.g.h5.admin.web.v2.benefit.shiqu.wuxi.test.zhi.com
- 所属项目：无锡市区G（公共收益）；来源会话：2026-11-04

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_regionname_edit",
  "source_extraction_id": "24db1d3e1c48437f9b2c4b7a38eb93ad",
  "version": 1,
  "memory_type": "entities"
}
-->