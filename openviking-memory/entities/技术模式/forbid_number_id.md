# 主键禁止 Number(id) 避免长 ID 精度丢失
防汛模块详情页对主键做 Number(id) 转换会静默丢精度，必须原样透传长整型字符串。

## 问题现象
- JavaScript Number 为 IEEE-754 双精度，仅能精确表示 2^53 以内整数（9007199254740991）
- 后端雪花/序列 ID 超界后 Number(id) 静默改写末几位，后续请求打到不存在记录，详情空白且难排查

## 解决方案
- 主键、编码类字段一律原样透传，不做 Number()/parseInt()/+ 等数值化
- 数值比较或排序用字符串比较（localeCompare/BigInt），不转 Number
- 前端路由参数、表格 row-key、this.$set 回写均保留字符串形态
- 审查全局搜 Number( 与 parseInt(，确认作用对象是否为 ID；后端 JSON 已返字符串则前端不转

## 验证与归属
- 验证：会话 session-9126d917-b8a3-4db0-b250-80e5b6c5d189 交付记录「移除主键 Number(id)，保留长 ID；接入 feedbackRescue 反馈接口」
- 涉及文件：zhi2-web-admin/src/views/flood/components/CheckPage.vue、zhi2-web-admin/src/mixins/listMixins.js
- 所属项目：zhi2-web-admin（防汛）；来源会话：session-9126d917-b8a3-4db0-b250-80e5b6c5d189；代码基线：c35a24a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "forbid_number_id",
  "source_extraction_id": "930bccb7cb144d8c9eea94018298599d",
  "version": 1,
  "memory_type": "entities"
}
-->