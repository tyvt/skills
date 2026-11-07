
# 公共收益专户页行政区划为空修复
无锡市区G（公共收益/专户管理）下管理主体、开户申请、开户变更三个编辑页保存报"行政区划不能为空"，前端未补全 regionCode 与 regionName 所致。

## 根因
- 后端 PubManagementOrgSaveDto、PubRegulatoryAccountChangeSaveDto、PubRegulatoryAccountSaveDto 对 regionCode、regionName 均有必填校验
- 三页表单未渲染行政区划字段，加载详情后未补全；原始记录 regionCode 为空时提交体缺编码
- 开户变更新增态（formMode=add 带入 accountId）走 getOldDetail() 而非 getDetail()，原未调用补齐函数

## 修复方案
- 三页 getDetail（编辑态）与 getOldDetail（新增态）均调用 fillProjectInfo()
- isMissing() 增加 !this.form.regionCode 判断，缺编码也触发查小区详情
- 用 projectId 查 /property/complex/{projectId} 取返回 region 字段赋给 form.regionCode（缺才补）
- regionName 用全局 allAreas 经 getFullRegionNameByRegionCode 反查补齐
- 管理主体、开户申请两页表单 data 补声明 regionCode 字段（开户变更原本已有）

## 涉及文件与提交
- pubManagementOrg/detail.vue（管理主体）、pubRegulatoryAccount/detail.vue（开户申请/监管账户）、pubRegAccountChange/detail.vue（开户变更）
- 提交：e4e4d0bd0（初版 regionName 补齐）、f950bb0c7（开户变更新增态补 fillProjectInfo）、7f214174b（补 regionCode 赋值+isMissing 含 regionCode，含回滚误改 complexChange）
- 构建产物 D:\repository\无锡市区G\dist，nginx 自测端口 8105；所属项目无锡市区G（公共收益）


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_regionname_edit",
  "source_extraction_id": "d436605849024a1fac58829ad825af9d",
  "version": 2,
  "memory_type": "entities"
}
-->