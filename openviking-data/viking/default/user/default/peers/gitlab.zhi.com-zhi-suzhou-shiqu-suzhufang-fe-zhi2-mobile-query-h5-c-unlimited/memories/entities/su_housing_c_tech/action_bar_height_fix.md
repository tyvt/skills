# 底栏高度未覆盖根因
苏住房防汛C端 H5 底栏因 theme.css 的 .action-bar 高度未被 ref8443 覆盖，固定为 72px（参考站 60px）。

## 问题原因
- `theme.css` 中 `.action-bar { height: calc(72px + …) }` 定义了 72px 高度
- 代码变更 ref8443 未能覆盖该样式，导致底栏保持 72px
- 参考站底栏高度为 60px，产生 12px 偏差

## 排查过程
- 排查 8095 是否加载最新 CSS
- 检查 `statusBarStyle` 是否将顶栏/底栏整体顶偏

## 验证与归属
- 根因确认于 2026-11-06 会话（消息索引 31）
- 涉及文件：theme.css、ref8443 相关组件
- 所属项目：苏住房防汛C端 H5

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "su_housing_c_tech",
  "name": "action_bar_height_fix",
  "source_extraction_id": "4bfa6a9b93514fa4a38634f272950b8d",
  "version": 1,
  "memory_type": "entities"
}
-->