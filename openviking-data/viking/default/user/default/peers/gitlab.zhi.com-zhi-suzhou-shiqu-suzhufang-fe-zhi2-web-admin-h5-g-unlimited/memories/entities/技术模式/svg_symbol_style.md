# SVG 转 symbol 后线框样式继承丢失
样式写在源 SVG 根节点的 fill="none" / stroke="currentColor" 上时，生成 <symbol> 后样式继承会丢失，导致图标显示为黑色实心形状。

## 现象
- 裁片处的 sprite 候选图标全部显示为黑色实心形状，线框（描边）效果完全消失。
- 源 SVG 中已明确声明 `fill="none"` 与 `stroke="currentColor"`，说明问题不在源图本身。

## 根因判断
- 图标被打包成 `<symbol>` 后，原本依赖 CSS 继承的 fill/stroke 样式链路断开，`currentColor` 未解析成实际颜色。
- 因此素材看起来像"实心色块"，会被误判为图标素材本身有问题。

## 处理方案
- 先把线框样式（stroke、fill）显式设置到使用处的 `<use>` 元素上，再重新评估这批素材是否可用。
- 排查顺序：先确认源 SVG 的 fill/stroke 声明，再验证生成 `<symbol>` 后样式是否被继承，最后在使用处显式覆盖。

## 验证结果（2026-11-15）
- 显式补齐线框 stroke 后，sprite 版本相似度升至 87.881%，仍低于当前图标版 91.572%。
- 结论：这批 sprite 候选图标不进入生产；随后恢复基线站点，改用裁片继续核对字体与现有图标的剩余误差。

## 关联
- 适用场景：Vite/vite-plugin-svg-icons 一类 sprite 图标方案下的线框图标（stroke 型图标）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "svg_symbol_style",
  "source_extraction_id": "b6e0d89ca1e24aaa9bf93ea4533045c6",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->