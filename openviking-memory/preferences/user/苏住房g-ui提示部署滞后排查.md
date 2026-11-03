- 遇到共用列表组件里的静态说明提示线上仍在、本地源码已删时，先全仓（含共用 components 目录）搜索文案片段，再按业务关键词搜。
- 源码没有就用 `git log -S '文案片段' -- 路径` 定位删除提交，用提交时间与部署时间对账，判定为部署滞后。
- 结论明确区分「代码已改、未部署」与「代码未改」，不因为看不到就回「没有这个提示」，也不顺手加环境变量开关回来。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "苏住房G-UI提示部署滞后排查",
  "source_extraction_id": "8bcd077e3b6849d5b8c4d44b4b5a633f",
  "version": 1,
  "memory_type": "preferences"
}
-->