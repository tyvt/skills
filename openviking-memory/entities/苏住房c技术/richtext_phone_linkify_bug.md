# 富文本电话正则无边界染蓝长编号
苏住房C小程序ZsRichText渲染错误信息时，linkifyPhoneNumbersInHtml正则无数字边界，将长记录编号误识别为电话链接。
## 问题现象
- 房源核验失败页展示记录编号（如202607220192）被染成蓝色可点击
- 用户反馈编号不应显示蓝色可点样式
## 根因
- formatRichTextContent调用linkifyPhoneNumbersInHtml，正则含\d{8}无边界分支
- 任意8位连续数字命中，长数字串（编号、流水号、身份证片段）子串被链接化
## 解决方案
- 在utils/index.js电话正则首尾加(?<!\d)与(?!\d)数字边界，仅独立数字成链
- 改完长编号回落灰文本，真实手机号/固话仍可点击
- 排查同类高亮先定位富文本预处理层，勿用CSS覆盖蓝色；回归验证长编号不链+手机号仍链
## 验证与归属
- 会话971ae865（2026-07-22，基线62fd49e）截图指出记录编号蓝链，定位正则无边界，加前后边界
- 涉及文件：src/utils/index.js、components/ZsRichText/ZsRichText.vue、pages_transaction/publishHouse/verification.vue、榆林小程序/src/utils/index.js
- 所属项目：苏住房C；来源会话ID：971ae865-b9cb-40f4-b093-4ddfce0be730；代码基线：62fd49e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "richtext_phone_linkify_bug",
  "source_extraction_id": "a68f950bba1b44e9a14c8d4a241c865f",
  "version": 1,
  "memory_type": "entities"
}
-->