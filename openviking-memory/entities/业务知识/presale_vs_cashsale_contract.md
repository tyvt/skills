# 商品房网签预售与现售合同签订
苏州市房地产监测V3 中「预售合同签订 / 现售合同签订」是商品房网签里两种合同类型的入口，前端页面主要在 commercialHousingSales/presale/contractView 等路由引用。

## 主体内容差异
- 指合同正文条款差异，非单纯甲方乙方结构；买卖双方结构两边类似
- 法律依据：预售依《商品房预售管理办法》+ 预售示范文本；现售依《商品房销售管理办法》+ 现售示范文本
- 房屋状态：预售为在建或未竣工、按图售房；现售为已建成、满足现售条件后销售
- 资质依据：预售以商品房预售许可证（证号、批准预售范围）为核心；现售以竣工验收、交付/现售备案等为核心
- 差异章节集中在标的性质、交付与权属、付款与监管、风险与违约责任

## 归属信息
- 本地检出无签订页 Vue 源码，按行业示范文本 + 本系统业务前置条件说明
- 所属项目：苏州市房地产监测V3；来源会话：d1778753-1044-48f0-a6e3-b3b3124bd28e
- 涉及文件：PresaleSelectBuildingDialog.vue、CashsaleSelectBuildingDialog.vue、路由信息.js

<!-- MEMORY_FIELDS
{
  "category": "业务知识",
  "name": "presale_vs_cashsale_contract",
  "source_extraction_id": "062bfd8103c04866b9a3c11ac95d1557",
  "version": 1,
  "memory_type": "entities"
}
-->