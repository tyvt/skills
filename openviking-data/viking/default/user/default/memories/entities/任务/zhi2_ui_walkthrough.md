# zhi2 UI 走查修复
zhi2-mobile-query-h5-c 的 UI 走查共 9 项，修复首页与项目检查等界面问题并补充用户协议页。

## 修复内容
- 修首页/项目检查字号、间距、箭头（`theme.css`/home/records）。
- 按钮蓝改为 `--c-brand:#075ed1`（非 `#004fd0`）。
- 用户协议/隐私协议改品牌蓝链接并加静态协议页（`agreementContent.ts` 占位文本，登录前配置接口 401 取不到线上文本），`pages.json` 加路由，`docs/release-checklist.md` 标上线前需法务给正式全文。
- 2026-11-14 按参考图对齐两处图片区域：缩略图改为方形容器，截图夹具改取学习卡与首条新闻卡的真实图片区域，随后重建并复查最终截图。
- 2026-11-14 最终截图新闻缩略图已对应参考图，学习卡与新闻图片均为方形。

## 交付与验证
- 提交 `412ccd5 style(ui)`、`c112896 feat(agreement)` 推 `origin/dev`。
- vue-tsc 26 错误为预存在、本次零新增，H5 DevTools 未执行。
- 2026-11-14 首页数据已完整渲染（五张文章卡片+导航齐全、浏览器无运行时错误），截图比对仅新闻首卡缩略图裁切异常，按参考图校正后收尾。

<!-- MEMORY_FIELDS
{
  "category": "任务",
  "name": "zhi2_ui_walkthrough",
  "source_extraction_id": "8909e1f447074a7c9633ac7ce6b9aa3c",
  "version": 4,
  "memory_type": "entities"
}
-->