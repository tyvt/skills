# 门户房屋详情弹窗纯日期展示
publicPortal `PropertyDetailDialog` 的日期字段使用 `formatDateOnly` 归一为纯日期 `YYYY/M/D`，去掉时间后缀。

## 实现要点
- 建成日期、抵押起止等字段只展示日期、不带 `0:00:00`
- 增加 `formatDateOnly`，去掉字符串中空格后的时间或 ISO `T` 之后部分
- 接口仍返回 datetime 时前端展示统一为 `YYYY/M/D` 形式（如 2011/3/31）

## 场景区分
- 与后台表单「禁用 zs-date-picker 换只读 input」场景不同
- 此处为只读详情展示层归一

## 验证与归属
- 验证证据：会话实现增加 formatDateOnly，houseFacts 日期改为 2011/3/31 等形式
- 涉及文件：src/views/home/publicPortal/components/PropertyDetailDialog.vue
- 所属项目：门户；来源会话：7acc978e-4336-43bb-931b-dc7cea4c454a；代码基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_format_date",
  "source_extraction_id": "3f03ea727476499892bbe2ec8f798037",
  "version": 1,
  "memory_type": "entities"
}
-->