# 房源核验记录编号误显蓝色链接修复
苏住房C小程序房源核验失败页记录编号被误识别为电话号码显示为蓝色可点击，已通过正则加数字边界修复。

## 问题根因
- 核验失败页通过 ZsRichText 渲染接口返回的错误信息
- formatRichTextContent 调用 linkifyPhoneNumbersInHtml 将文本数字自动转成蓝色可点击电话链接
- 原正则包含 \d{8}（任意 8 位连续数字），记录编号 202607220192 等长数字串会被误识别为电话号码

## 修复内容
- 在 zhi2-mobile-shimin/src/utils/index.js 的电话号码正则前后增加数字边界判断 (?<!\d) 和 (?!\d)
- 只匹配独立出现的电话号码，不再匹配更长数字串的一部分
- 记录编号 202607220192 恢复为普通灰色文本，真实手机号、固话仍可正常识别点击拨打

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：zhi2-mobile-shimin/src/utils/index.js、publishStatus.vue、verification.vue
- 来源会话ID：971ae865-b9cb-40f4-b093-4ddfce0be730；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "phone_linkify_fix",
  "source_extraction_id": "0842d2bc9d344262a3fdeea27c8b4603",
  "version": 1,
  "memory_type": "entities"
}
-->