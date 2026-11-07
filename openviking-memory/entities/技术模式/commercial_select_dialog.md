# 商品房详情页开发项目选择统一为zs-select-dialog
苏州市房地产监测V3 项目将商品房相关详情页的「开发项目选择」统一为 `zs-select-dialog`（SelectDialog 组件）。

## 修改文件
- 合同撤销 `commercialHousingSales/presale/contractRevoke/detail.vue`：`ProjectDialog`→`SelectDialog`（`POST /building/project/page`，列：项目名称/项目编号/项目所在地）；`RegulatoryAccountDialog`→`SelectDialog`；合同编号仍用 `NoticeContractDialog`
- 价格备案 `recordPriceMngSuzhou/detail.vue`、`changeDetail.vue`：同上项目选择弹窗
- 合同范本 `presale/template/detail.vue`：同上项目选择弹窗

## 交互说明
- 单选：点击项目名称链接即选中并关闭（show-checkbox、show-confirm 为 false）；价格备案苏州详情页「项目名称」弹窗曾因该配置缺「确定」按钮，已修复去除该配置并恢复勾选列与「确定」

## 涉及文件与归属
- 涉及 `commercialHousingSales`、`detail-template.vue` 等
- 所属项目：苏州市房地产监测V3；来源会话ID：ac17953e-1beb-4d4e-ac1b-41b3f305fb31

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "commercial_select_dialog",
  "source_extraction_id": "f8016802bbdc45ea86428e1387fbac2b",
  "version": 2,
  "memory_type": "entities"
}
-->
