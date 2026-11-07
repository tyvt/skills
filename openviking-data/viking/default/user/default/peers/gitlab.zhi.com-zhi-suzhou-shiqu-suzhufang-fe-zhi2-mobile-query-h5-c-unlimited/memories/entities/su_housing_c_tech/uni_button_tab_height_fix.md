# Tab高度因uni-button行高变矮
苏住房防汛C端 H5 中 uni-app 将 `<button>` 编译为 `uni-button`，`line-height: 1.2` 使 Tab 高度矮约 4px，正在加全局重置对齐参考站。

## 问题原因
- uni-app 把 `<button>` 编译成 `uni-button` 元素
- 默认 `line-height: 1.2` 导致 Tab 栏高度减少约 4px
- 参考站行高不同，产生视觉偏差

## 修复方案
- 增加全局 `uni-button` 样式重置
- 对齐参考站行高，恢复 Tab 预期高度

## 验证与归属
- 根因与修复启动于 2026-11-06 会话（消息索引 58）
- 所属项目：苏住房防汛C端 H5

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "su_housing_c_tech",
  "name": "uni_button_tab_height_fix",
  "source_extraction_id": "4bfa6a9b93514fa4a38634f272950b8d",
  "version": 1,
  "memory_type": "entities"
}
-->