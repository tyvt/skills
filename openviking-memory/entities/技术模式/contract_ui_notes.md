# 2016版合同UI参考设计图修改已知问题
苏州市房地产监测V3 中参考设计图修改 2016 版合同 UI（买卖双方版式维持现状）时的两点注意事项。

## 已知问题
- 页面「数据解密失败」弹窗是当前后端接口的既有问题，与本次 UI 改动无关
- git status 里的 companyChangeManage、projectManagement/buildingTable 等改动在开始时就已存在，未触碰

## 涉及文件
- 页面结构：contract/index.vue、SzNav.vue
- 正文版式：sz-contract.scss
- 第一章：chapter1.vue
- 封面：cover.vue
- 合同附件：annex.vue、SzAnnexImage.vue、SzClauseTitle.vue

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：session_eda8b0c0c8753c0212f0d6d6ec1bc983；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_ui_notes",
  "source_extraction_id": "b18177727e884bf08b33fa82839cc86b",
  "version": 1,
  "memory_type": "entities"
}
-->