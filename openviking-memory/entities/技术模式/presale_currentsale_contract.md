# 预售与现售合同正文差异
苏州市房地产监测V3 中预售合同与现售合同正文条款因房屋状态不同而有差异，签订页源码本地缺失。
## 差异要点
- 预售合同针对在建房屋，凭预售许可证签订
- 现售合同针对已建成且竣工验收房屋
- 正文条款差异主要在标的性质、交付与权属等维度
## 代码现状
- 本地仓库缺签订页 Vue 源码
- 页面引用于 `commercialHousingSales/presale/contractView` 等路由
- 路由信息见 `d:/repository/苏州市房地产监测V3/路由信息.json`
## 验证与归属
- 验证证据：来源会话 d1778753-1044-48f0-a6e3-b3b3124bd28e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_currentsale_contract",
  "source_extraction_id": "5f5198d2b46443abad5d1a01cf1edbb4",
  "version": 1,
  "memory_type": "entities"
}
-->