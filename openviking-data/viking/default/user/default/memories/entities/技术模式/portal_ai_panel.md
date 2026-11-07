# 门户首页AI面板 HomeAiPanel
门户 B 端首页 AI 面板组件，含两个快捷问法胶囊按钮。

## 组件结构
- 文件：zhi2-web-admin/src/views/home/components/HomeAiPanel.vue
- 样式类 .home-ai-panel__link 控制胶囊按钮外观
- 两个胶囊按钮文案：「商品房买卖流程」「住房租赁备案要求」，为 AI 快捷问法入口

## 本地部署
- 门户站点经 nginx 部署，root D:/repository/门户/dist，监听端口 8092（因 8099 与残留「苏州市房地产监测V3-bug6073.conf」冲突、8095 被 flood-c-h5.conf 占用，2026-11-03 改定）
- 访问 http://127.0.0.1:8092/index.html 返回 200

## Git 结构
- 子模块 zhi2-web-admin（分支 develop/v2.6.2-portal），父仓库 门户（分支 develop/v2.6.2-portal）
- public/version.json 为构建自动生成时间戳文件，非逻辑改动，提交时排除

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_ai_panel",
  "source_extraction_id": "0c54dc54c1ac40e98457cb384df0105f",
  "version": 1,
  "memory_type": "entities"
}
-->