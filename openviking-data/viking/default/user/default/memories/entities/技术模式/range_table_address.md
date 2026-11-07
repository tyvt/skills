# 房屋坐落拼接去重避免项目名重复
在产品2.0的rangeTable.vue中“房屋坐落”拼接逻辑增加去重，防止buildingNo包含projectName时重复展示。

## 修改内容
- address formatter先取projectName和buildingNo（空值兜底）
- 若buildingNo包含projectName，先replace掉该段
- 再拼接projectName + buildingNo + unitName + houseNo

## 验证与归属
- 验证：extracted source=cursor project=产品2.0
- 涉及文件：D:/repository/产品2.0/zhi2-web-admin/src/views/property/complex/components/rangeTable.vue
- 所属项目：产品2.0；来源会话：82637904-0381-4770-bd0e-d8b2748c371c；代码基线：none
- 文件原有11个类型提示lint错误，本次改动未新增报错

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "range_table_address",
  "source_extraction_id": "c5fda021628641648e01366542bde487",
  "version": 1,
  "memory_type": "entities"
}
-->