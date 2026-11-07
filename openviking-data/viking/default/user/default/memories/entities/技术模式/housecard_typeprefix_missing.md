# HouseCard 未实现类型前缀致标识缺失
Project_Suzhufang.vue 传入 show-type-prefix，houseCard.vue 未实现该属性致新房/二手房标识缺失。

## 问题根因
- Project_Suzhufang.vue 向 houseCard.vue 传入 show-type-prefix 属性
- houseCard.vue 未实现该属性，导致新房/二手房标识缺失

## 解决方案
- 新增 showTypePrefix 属性与 addressText 计算属性
- 合并 data() 修复图标覆盖问题

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：3c2a5b09-905e-403b-807e-7f2d390cd0a7
- 验证证据：cursor 会话 3c2a5b09-905e-403b-807e-7f2d390cd0a7
- 涉及文件：Project_Suzhufang.vue、houseCard.vue（多路径）、newHouse/indexMore.vue、project.json
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "housecard_typeprefix_missing",
  "source_extraction_id": "c66174cae1ae4980af55b9f34536beff",
  "version": 1,
  "memory_type": "entities"
}
-->