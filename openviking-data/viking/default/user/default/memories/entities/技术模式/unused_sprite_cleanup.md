# 未消费 sprite 生成链路整链清理
园区物管2.0 构建自动生成 sprite.svg 反复出现在 git diff 的排查与清理套路。

## 问题根因
- sprite.svg 由自研 generateSpritePlugin / generate-sprite.cjs 每次构建自动重新生成，而项目图标链路已由 vite-plugin-svg-icons（public/assets/images/svg/ + virtual:svg-icons-register）承担，sprite 链路完全未被消费。

## 解决方案
- 确认无消费方后整链清理：移除 vite.config.js 的 generateSpritePlugin、删除 scripts/generate-sprite.cjs 与 public/assets/images/sprite.svg（约 1.8MB）、删除父仓库根 generate-sprite.js / svg.sh / icons.js；保留 .gitattributes（源图标行尾 LF 仍有用）。
- 清理后若本地 dev server 仍在跑，必须先停掉再启动，否则旧进程继续生成 sprite.svg 让人误判清理无效。

## 通用套路
- 构建插件自动生成的产物反复出现在 git diff 时，先判断产物是否仍被消费，未被消费就整链删除而非加 .gitignore。
- 涉及文件：vite.config.js、generate-sprite.cjs、sprite.svg、generate-sprite.js；所属项目：园区物管2.0。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unused_sprite_cleanup",
  "source_extraction_id": "dcd23ce75bc845459e6f23b743f4afe2",
  "version": 1,
  "memory_type": "entities"
}
-->