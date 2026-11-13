# 图标静态 sprite 引用构建提速方案
将前端图标从 vite-plugin-svg-icons 运行时内联改为构建期生成静态 sprite.svg，并由 SvgIcon 以 base 路径引用，使图标完全移出 JS bundle。

## 参考与适用
- 参考落地：苏住房G（子模块 0e14875de「图标改静态 sprite 引用」+ 根仓 e6d5c70「图标生成 sprite 并接入构建/开发脚本」）
- 适用对象：使用 zhi2-web-admin 子模块且含 SvgIcon + vite.config 的前端项目
- zhi2-web-admin 是跨多父项目的共享子模块远程，各项目子模块可能在同一分支共享提交

## 核心改动
- 根仓新增 generate-sprite.js（__dirname 基路径）；子模块 SvgIcon 改 resolveServerAssetUrl 拼基址 + iconName 加前缀 + 加 :href
- vite.config.js 删除 createSvgIconsPlugin；main.js 删 virtual:svg-icons-register 导入
- 标准项目：.gitignore 忽略 sprite.svg 并 git rm --cached 取消跟踪；prebuild 钩子 node ../generate-sprite.js

## 关键坑位
- svgo 版本差异（3.x/2.8.x）：剥离 XML/DOCTYPE、修畸形闭合标签、svgo 失败回退原始 svg，保 symbol 数=文件数、非48图标 viewBox 保真
- 缺 resolveServerAssetUrl 的项目（保障房G/淮安存量房/省协会G）需补齐该 util
- 已有 generate-sprite.cjs+插件的 3 项目（无锡市区G/园区公共收益/园区物管2.0）最小改动：修 cjs viewBox、补 SvgIcon、删插件
- 苏州市房地产监测V3 的 Navbar.vue 依赖 virtual:svg-icons-names，需改从 icons.js 引入

## 推广范围
- 2026-11-13 推广至 D:\repository 全部 17 个同类型项目：产品2.0、惠山二期G、门户、苏州市房地产监测V3、泰兴G、无锡锡山V2、榆林G、园区物管2.0、淮安物管、无锡市区G、园区公共收益、宜兴公共收益-wt-5845、宜兴公共收益、保障房G、淮安存量房、省协会G、江阴公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sprite_build_optimization",
  "source_extraction_id": "89556024a98c4257ab20b66a71f68dc0",
  "version": 1,
  "memory_type": "entities"
}
-->