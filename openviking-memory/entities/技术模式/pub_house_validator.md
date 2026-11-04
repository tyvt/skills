# 公共收益经营用房弹窗校验修复
淮安物管 pubHouseDialog.vue 校验问题已修复，避免动态 required 规则下空值提交后端。

## 问题根因
- 「经营用房类别」使用动态 required 规则时，Element UI 有时拦不住空值，未选择仍提交后端触发「经营用房不能为空」。

## 修复方案
- 为「经营用房类别」「是否允许出租」增加自定义 validator。
- 在 submitForm 中增加提交前二次检查。
- houseCategory 支持数字 0 与字符串 '0'。

## 验证与归属
- 验证：新增时不选「经营用房类别」点确定，应见表单项下红色提示「经营用房类别不能为空」，不弹后端错误。
- 涉及文件：pubHouseDialog.vue、benefit/pubHouse/detail.vue、api/benefit/pubHouseDetail.js、benefit/pubHouse/components/pubHouseDialog.vue。
- 所属项目：淮安物管；来源会话：f1ee611c-8cd6-4f31-969d-934eec1bceb2；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pub_house_validator",
  "source_extraction_id": "497161ffec374c01b7ea3b1bbc9a358c",
  "version": 1,
  "memory_type": "entities"
}
-->