- 同一份数据在两页需呈现不同列结构时，在共享构造器加布尔选项分流（如 showUnitInName），不复制两套构造逻辑。
- 新增独立列时同步增加列宽函数宽度，避免新列把合计列挤变形。
- 单位列整列为空时不前端兜底猜单位，回后端确认接口 unitName 或模板配置是否维护。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "苏住房G-月报列结构分流",
  "source_extraction_id": "8bcd077e3b6849d5b8c4d44b4b5a633f",
  "version": 1,
  "memory_type": "preferences"
}
-->