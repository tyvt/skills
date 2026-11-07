# 贷款银行详情页区块缺失修复
苏住房C 小程序 `fddydetail.vue`（贷款银行详情页）缺失 5 个区块且联系方式显示异常，已修复。

## 问题原因
- `sections` 只配置「申请材料」「无法贷款」「联系方式」三项
- 贷款额度、贷款期限、贷款利率、其他费用、特色服务从未加入渲染列表
- 联系方式只读取 `contact` 字段，接口返回 `phone`/`mobile`/`businessHours` 时显示为 `-`

## 修复内容
- 补全 5 个缺失区块：贷款额度、贷款期限、贷款利率、其他费用、特色服务
- 优化联系方式：优先显示 `phone`、`mobile`、`businessHours`，支持点击拨号，无则回退 `contact` 字段

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`fddydetail.vue`、`ZsRichText.vue`、`bankDetail.vue`、`pages.js`
- 来源会话ID：32625b00-1426-42c0-b698-3bad3d6cb027
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "loan_bank_detail_fix",
  "source_extraction_id": "9e1222fc5f614dea9c5ae5cd01eb602c",
  "version": 1,
  "memory_type": "entities"
}
-->