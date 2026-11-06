# 区块展开按钮缺失修复（Headline showAction）
产品2.0 的 zhi2-web-admin 中多个信息区块因 Headline 组件被设 :showAction="false" 而缺失展开/收起按钮，已统一移除该属性修复。

## 现象
- 业委会/物管会、管理主体、开户申请、经营资产信息（资产管理）等区块标题旁不显示「展开/收起」操作
- 与「(前期)物业服务合同」「物业服务合同」等正常区块表现不一致

## 根因
- Headline 组件默认 showAction: true 才显示展开/收起按钮
- 上述 4 处区块均显式设置了 :showAction="false"，关闭了操作按钮

## 修复方案
- 移除 committeeTable.vue、managementOrgPanel.vue、regulatoryAccountPanel.vue、detail.vue 共 4 处 :showAction="false"
- 经营资产信息区块保留 v-model="showBenefitTable"，默认仍为展开状态

## 验证与归属
- 所属项目：产品2.0；来源会话：282e21d0-00c8-49c2-89a3-940f0f8e05be；代码基线：none
- 涉及文件：committeeTable.vue、managementOrgPanel.vue、regulatoryAccountPanel.vue、detail.vue

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "headline_showaction_expand",
  "source_extraction_id": "78adc053f19543b39c7c4949d8e76fa2",
  "version": 1,
  "memory_type": "entities"
}
-->