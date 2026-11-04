# 管理员首页区块标题高度联动丝带
首页新版（index-new）区块标题栏增高时，须同步改 --section-tab-height 并依赖该变量拉高左侧丝带背景。

## 联动规则
- 只改 line-height 或 padding 会导致丝带与文字区错位
- 须同时改 card-header 的 --section-tab-height 并依赖该变量拉高左侧 section_tab_ribbon.svg 背景
- 典型从 36px 调到 44px 约增加上下各 4px 留白（24px 字号不变）

## 验证与归属
- 验证证据：会话 d49bceb7 用户要求标题文字区上下边距加大；结论将高度 36px→44px 并通过 --section-tab-height 同步丝带背景
- 涉及文件：index-new.vue、section_tab_ribbon.svg（zhi2-web-admin/src/views/home 与 public/assets/images/homeNew 下）
- 所属项目：门户；来源会话ID：d49bceb7-a0ad-4279-ae3e-9701e4912d1d；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "index_new_section_tab",
  "source_extraction_id": "0325262565af4ddfa2e8ba7da5315c34",
  "version": 1,
  "memory_type": "entities"
}
-->