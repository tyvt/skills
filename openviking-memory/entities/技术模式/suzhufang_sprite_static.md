# 苏住房图标Sprite静态化
苏住房前端（zhi2-web-admin）把 SVG 图标移出 JS bundle、改为 public 目录静态 sprite 引用，构建耗时从约150秒降至42.4秒。

## 背景
- 原构建约150秒，根因是 410 个 SVG 图标被 vite-plugin-svg-icons 经 virtual:svg-icons-register 内联进 module-main（约1.8MB 字符串），占约64%构建时间。
- 原 svgoOptions 漏配 preset-default，图标几乎未压缩；方案一（SVGO preset-default）曾将构建降至约108秒，后被方案三取代。

## 实施方案
- 改造 generate-sprite.js：用 __dirname 定位、遍历全部 410 个源图标，保留每个图标真实 viewBox（修掉旧脚本硬写 0 0 48 48 导致 4 个非标图标变形的问题），输出到 public/assets/images/sprite.svg。
- SvgIcon/index.vue：删除 import 'virtual:svg-icons-register'，iconName 改为 resolveServerAssetUrl('/assets/images/sprite.svg')#icon-${name}（基址感知，兼容子目录部署），<use> 增加 :href。
- main.js 移除 virtual:svg-icons-register 引用；vite.config.js 移除 createSvgIconsPlugin。
- vite-build.mjs 与 pm.mjs 在构建/dev 前调用 generate-sprite.js（失败 fail-fast）。
- .gitignore 增加 public/assets/images/sprite.svg，并 git rm --cached 停止跟踪，转为构建产物。

## 验证结果
- 真实 npm run build：exit 0，42.4秒（原约150秒，-72%）；module-main 2817KB→977KB，bundle 内 <symbol> 数=0。
- dist/assets/images/sprite.svg（1762KB）已生成；sprite 校验 410 个 symbol 均含正确 viewBox，4 个非48图标（路径/路径-2/el-icon-pref/el-icon-red）viewBox 与源一致。
- SvgIcon/index.vue eslint 通过；bundle 无残留 virtual:svg-icons。

## 注意事项
- 与园区物管2.0 的 unused_sprite_cleanup 不同，苏住房分支重新启用并修正了 sprite 生成链路（generate-sprite.js 保留并改造）。
- 停车泊位.svg 源文件本身为空 SVG（<svg></svg> 无内容），该图标旧方案下也是空白，属预存数据问题。
- 浏览器逐页视觉未实测，建议本地 dev 抽检动态菜单图标与4个非48图标。
- 提交：子模块 0e14875de、根仓 e6d5c70d，分支 develop/v2.6.2-suzhufang。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_sprite_static",
  "source_extraction_id": "3dc738e3735e41f68bbc447d70d15590",
  "version": 1,
  "memory_type": "entities"
}
-->