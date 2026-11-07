# 主包scss组件注入uni.scss致上传超限
苏住房C小程序因未加scoped的scss组件把整份uni.scss注入组件wxss，导致主包上传预估超2048KB。

## 问题现象
- 构建在 size:main 校验失败，主包磁盘1766.6KB未超2048KB，上传预估1766.6×1.17≈2066.9KB超限额约19KB
- 33个scss组件每个wxss多约7.5KB重复样式，累计约246KB，ZsButton为压垮临界线的最后一根稻草

## 根因
- 新增ZsButton用`<style lang="scss">`且未scoped，uni-app把整份uni.scss（含@import的zs-button.scss）注入组件wxss，与app.wxss重复
- 仅看磁盘体积会误判为未超限，实际应按上传预估口径

## 解决方案
- 新增组件一律写`<style scoped>`且纯CSS，不用scss变量语法，从源头避免注入全局样式
- 存量项目加 scripts/prune-component-wxss-leak.mjs，构建后裁剪主包components/与uni-icons里泄漏的uni.scss块，接在validate-dist之前
- 校验收敛到 scripts/size-main-package.mjs 的上传预估口径（×1.17），勿用磁盘体积
- 修复后主包磁盘1515.5KB、上传预估1773.1KB，余量约275KB，样式仍由app.wxss提供

## 验证与归属
- 会话 fbb1fcdd 用户贴构建失败 terminals/8.txt:159-176；结论主包磁盘未超、上传预估超约19KB
- 涉及文件：zhi2-mobile-shimin/src/components/ZsButton/ZsButton.vue、src/styles/zs-button.scss、scripts/size-main-package.mjs、scripts/prune-component-wxss-leak.mjs、scripts/merge-main-leaks.mjs、scripts/relocate-uni-icons.mjs、package.json
- 所属项目：苏住房C；来源会话ID：fbb1fcdd-721a-4559-b7a4-6771d348fd61；代码基线：4d6dba9

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "scss_wxss_leak",
  "source_extraction_id": "789f39094ad64ddc97500806c533c5b4",
  "version": 1,
  "memory_type": "entities"
}
-->