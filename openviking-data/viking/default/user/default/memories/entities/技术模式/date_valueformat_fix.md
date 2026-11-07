# el-date-picker 非Date对象导致 getHours 报错
昆山G 多个详情页用 Element UI el-date-picker 时，因 value-format 写错与接口时间格式不匹配，点日历格触发 modifyDate 内 TypeError: date.getHours is not a function。

## 问题根因
- value-format 写成 `yyyy-MM-dd `（末尾多空格），与接口常见的 `2025-05-12` 不一致，造成解析/回写异常。
- 详情接口 applyTime 常为 `yyyy-MM-dd HH:mm:ss` 或时间戳，而控件用 type="date" + value-format="yyyy-MM-dd"，不先统一成日期字符串时，点日历格内部仍可能拿到非 Date 对象。

## 修复内容
- 将 value-format 改为 `yyyy-MM-dd`（去掉末尾空格）。
- 在 getDetail 赋值 form 后，若有 applyTime，用项目已有 this.parseTime(..., '{y}-{m}-{d}') 转成与 value-format 一致的日期字符串，使 v-model 与 el-date-picker 内部解析一致。

## 验证与归属
- 验证证据：extracted source=cursor project=昆山G
- 涉及文件：d:/repository/昆山G/src/views/increment/useFund/insuranceApply/detail.vue、d:/repository/昆山G/src、d:/repository/昆山G/src/utils/ruoyi.js、d:/repository/昆山G/src/views/estate/accountApart/detail.vue
- 所属项目：昆山G；来源会话：6de5c545-0115-4b86-8a24-5c8a01bf9d1a；代码基线：none
- 验证证据：src=昆山G/003.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "date_valueformat_fix",
  "source_extraction_id": "5692a877f37b4b5fa1f2ab8ec61d6454",
  "version": 2,
  "memory_type": "entities"
}
-->