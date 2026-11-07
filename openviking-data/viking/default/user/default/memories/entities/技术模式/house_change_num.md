# 房屋变更可选字段 houseNum 对接套路
后端新增可选字符串字段（如不动产房屋编码 houseNum）时，前端需双表单加项、变更对比并靠 rules 白名单控制必填。

## 交付清单
- form/formOld（变更页）/contentInfo 只读区同步加项；变更详情用与 unitCode 一致的 v-tooltip 对比；列表补列 prop:'houseNum'。

## 校验注意
- 勿假设「没写 required 就是非必填」：在 houseChange/detail.vue 的 rules 显式核对，仅保留业务必填项（项目/楼幢/单元/房号/物理层/名义层/用途/实测面积等）。
- 起始层/终止层/结构/规划用途/房屋性质/交付类型/houseNum 等勿误加 required。

## 附加建议
- 变更页可对绑房风险加 form-tip 文案（灵锡通等），详情编辑态是否同款提示单独确认。

## 验证与归属
- 验证：新增字段全部可选不传不报错；form/formOld 增加 houseNum 带变更对比 v-tooltip；已核对 rules 未对 floorStart、houseNum 等加 required；方案 B 灰色 form-tip 灵锡通绑房风险提示。
- 涉及文件：zhi2-web-admin/src/views/building/house/detail.vue、zhi2-web-admin/src/views/building/houseChange/detail.vue、zhi2-web-admin/src/views/building/houseChange/index.vue
- 所属项目：惠山二期G；来源会话：529b867b-1637-4025-9de4-fa798457ace6；代码基线：adccd7e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_change_num",
  "source_extraction_id": "66a2e2029661484ebfefac8efb7a3328",
  "version": 1,
  "memory_type": "entities"
}
-->