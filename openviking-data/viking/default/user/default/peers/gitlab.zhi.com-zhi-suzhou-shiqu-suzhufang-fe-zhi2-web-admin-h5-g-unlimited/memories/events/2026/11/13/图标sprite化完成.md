# Summary
用户提出方案三：将 SVG 图标改为 public 目录静态 sprite 引用（<use href>），以解决 vite-plugin-svg-icons 内联 410 图标导致构建约150秒的问题。助手核实已提交 sprite.svg 过期（仅408 symbol、硬写 48x48 变形4个非标图标），重新生成完整410个正确 viewBox 的 sprite 并改造 SvgIcon/main.js/vite.config.js/build 脚本，移除 virtual:svg-icons-register。2026-11-13 真实构建验证：exit 0，42.4秒（原约150秒，-72%），module-main 2817KB→977KB，bundle 内 <symbol> 数=0。提交推送至 develop/v2.6.2-suzhufang（子模块 0e14875de、根仓 e6d5c70d）。
# 2026-11-13 (Friday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 方案三：把 sprite 文件放到 public 目录，用 <use href="/sprite.svg#icon-xxx"> 引用
原理：你提到 public/.../sprite.svg 已经存在（1.7MB）。Vite 的 public 目录资源不经过 Rollup 打包，构建时直接复制到 dist。如果 SvgIcon 组件直接渲染 <use href="/sprite.svg#icon-name">，构建时 JS bundle 里就完全没有图标内容。

风险：

浏览器兼容性：跨文件 <use> 引用同源 sprite 在现代浏览器中基本可用，但需要确认你的目标浏览器范围；

首次渲染时浏览器会额外请求 sprite.svg（可缓存），这是运行时成本，不是构建成本；

如果项目部署在子路径下，需要处理 base 路径。

这是最接近“运行时 fetch”但改动更小的方案：不需要改造 SvgIcon 的 props 或调用方式，只需要把 <use :xlink:href="symbolId"> 改成 <use :href="\/sprite.svg#${symbolId}`">，并移除import 'virtual:svg-icons-register'`。改动范围可能只有 SvgIcon 组件内部的一两行。
试一下这个方案
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 方案三实施完成并验证通过。

## 结果：构建 **150s → 42.4s**（-72%）

| 阶段 | 构建耗时 |
|---|---|
| 原始基线 | ~150s |
| 方案一（SVGO preset-default，纯压缩内联图标） | ~108s |
| **方案三（sprite 静态化）** | **42.4s** |

### 改了什么
把图标内容彻底移出 JS bundle，改由 `public/assets/images/sprite.svg` 静态提供（构建时直接复制到 dist）：

1. **`generate-sprite.js`**（仓库根）：改为 `__dirname` 定位、遍历全部 410 个源图标，**保留每个图标真实 viewBox**（修掉旧脚本硬写 `0 0 48 48` 导致 4 个非标图标变形的问题），输出到 `public/assets/images/sprite.svg`。
2. **`src/components/SvgIcon/index.vue`**：删除 `import 'virtual:svg-icons-register'`；`iconName` 改为 `${resolveServerAssetUrl('/assets/images/sprite.svg')}#icon-${name}`（复用现有基址感知工具，兼容子目录部署）；`<use>` 增加 `:href`。
3. **`src/main.js`**：移除 `import 'virtual:svg-icons-register'`。
4. **`vite.config.js`**：移除 `createSvgIconsPlugin` 及其 import。
5. **构建接入**：`vite-build.mjs` 在 spawn vite 前、`pm.mjs` 在 dev 前调用 `generate-sprite.js`（失败 fail-fast）。
6. **`.gitignore`**：`public/assets/images/sprite.svg` 列为构建产物（已 `git rm --cached` 停止跟踪，防再冲突）。

### 验证证据
- 真实 `npm run build`：**exit 0，42.4s**。
- `module-main` **2817KB → 977KB**，bundle 内 `<symbol>` 数 = **0**（图标完全不在 JS 里）；`dist/assets/images/sprite.svg`（1762KB）已生成。
- sprite 校验：**410 个 symbol 全有 viewBox**，4 个非 48 图标（路径/路径-2/el-icon-pref/el-icon-red）viewBox 与源一致。
- `SvgIcon/index.vue` eslint 通过（`main.js` 的报错是既有全文件双引号风格问题，与本次只删 1 行无关）。
- 产物引用正确：bundle 中 `assets/images/sprite.svg` 引用 1 处，无残留 `virtual:svg-icons`。

### 未验证 / 需注意
- **浏览器视觉未实测**：本环境无法开浏览器逐页确认。机制是同源外部 sprite `<use>`，现代浏览器支持；建议你本地跑一次 dev 抽检**动态菜单图标**与 4 个非 48 图标。发现异常可一键回滚（revert 上述文件）。
- 发现 `停车泊位.svg` 源文件本身是空 SVG（`<svg></svg>` 无内容），该图标在旧方案下也是空白——**预存数据问题**，非本次改动引入。
- 目标浏览器若含不支持外部 sprite `<use>` 的极老版本，需另行加 fallback。

计划文档：[build-perf-sprite-static.md](<.plan/build-perf-sprite-static.md>)。

改动涉及根仓（`generate-sprite.js`、`icons.js`、`scripts/pm.mjs`）和子模块 `zhi2-web-admin`。需要我如何处理提交？
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: Both local and remote SHAs match — push verified.

## 完成总结

**打包慢已排查并优化到位：构建 ~150s → 42.4s（-72%）。**...

<!-- MEMORY_FIELDS
{
  "event_name": "图标sprite化完成",
  "goal": "记录构建优化结果",
  "summary": "用户提出方案三：将 SVG 图标改为 public 目录静态 sprite 引用（<use href>），以解决 vite-plugin-svg-icons 内联 410 图标导致构建约150秒的问题。助手核实已提交 sprite.svg 过期（仅408 symbol、硬写 48x48 变形4个非标图标），重新生成完整410个正确 viewBox 的 sprite 并改造 SvgIcon/main.js/vite.config.js/build 脚本，移除 virtual:svg-icons-register。2026-11-13 真实构建验证：exit 0，42.4秒（原约150秒，-72%），module-main 2817KB→977KB，bundle 内 <symbol> 数=0。提交推送至 develop/v2.6.2-suzhufang（子模块 0e14875de、根仓 e6d5c70d）。",
  "ranges": "0-3,111,131",
  "source_extraction_id": "3dc738e3735e41f68bbc447d70d15590",
  "version": 1,
  "memory_type": "events"
}
-->