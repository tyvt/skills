# 顶栏激活菜单文字发糊根因
顶栏激活菜单白字在蓝底上发糊，根因是仅引入 Regular 字体却用了 font-weight:600 触发浏览器合成假粗体。

## 问题根因
- 全局只引入 `SourceHanSansCN-Regular` 一个字重，无对应粗体文件
- 激活态设 `font-weight: 600`，浏览器用 faux bold 合成粗体，笔画变形边缘发虚
- 与字号、分辨率、渲染性能无关

## 修复方案
- 首选去掉激活态加粗，未激活与激活均保持 `font-weight: 400`
- 如需更醒目，引入 `SourceHanSansCN-Medium` 并补 `@font-face`，仅用 `font-weight: 500`
- 辅助手段：给 `.nav-item__text` 加 `-webkit-font-smoothing: antialiased` / `-moz-osx-font-smoothing: grayscale`
- 未激活态基准：`font-weight: 400; font-size: 16px; color: #C5DEFF`，改动需对齐

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/layout/components/Navbar.vue`、`TabBar.vue`、`src/styles`
- 来源会话：`session-5cd9c334-f122-4347-ad7a-53e297af0222`；代码基线：`d9a1380`

## 验证证据
- 会话结论写明原因与改动：去掉激活加粗，保持 400，加抗锯齿；提示可补 Medium 字重用 500

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_activation_blur",
  "source_extraction_id": "2f0285f8b19a47cf8f04cc41b8d6c128",
  "version": 1,
  "memory_type": "entities"
}
-->