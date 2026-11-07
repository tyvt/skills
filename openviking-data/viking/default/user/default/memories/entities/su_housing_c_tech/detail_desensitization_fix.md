# 申请页姓名证件号脱敏修复
苏住房C(zhi2-mobile-shimin)申请页`detail.vue`修复姓名、证件号未脱敏问题，改用`formatter.js`脱敏方法。

## 问题根因
- 申请页`detail.vue`直接展示`userStore`原始数据，未做脱敏导致姓名、身份证号明文显示

## 修复要点
- 姓名使用`blurName`：保留首字，其余用`*`替代（如：张三→张*）
- 证件号使用`blurIdNumber`：保留前2位和后2位，中间用`*`替代
- 页面仅展示脱敏内容，`form`内仍保存完整信息，提交不受影响
- 写法对齐项目中其他页面（二手房签约、发布房源核验）

## 涉及文件
- `src/pages_transaction/newHouseCertification/index.vue`
- `src/utils/formatter.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：ec2c21f5-1d1e-4abb-a5d4-f34c93d6919a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "detail_desensitization_fix",
  "source_extraction_id": "1dc4c2f4b8f548ee871a78669e257e68",
  "version": 1,
  "memory_type": "entities"
}
-->