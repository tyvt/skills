# vite-plugin-vconsole 构建期注入致启动弹面板
vite-plugin-vconsole 在 test 模式构建期向 src/main.ts 静态注入 vConsole，使 app 启动即出现调试面板，并将 vconsole 内联进主包导致无法按需拆包。

## 问题根因
- `vite.config.ts:82` 配置 `enabled: VITE_DELETE_CONSOLE == 'false'`，而 `env/.env.test` 中 `VITE_DELETE_CONSOLE=false` 触发注入
- dev 与 production 该值为 `true` 不注入；仅 test 模式会注入（启动即出现面板）
- 插件直接向 `src/main.ts` 头部塞入 `import VConsole from 'vconsole'` 与 `new VConsole()`
- vconsole 被静态内联进主包（858KB），导致动态 `import()` 无法拆包

## 修复方案
- 移除 `vite.config.ts:76-80` 的构建期注入配置，并删除已无用的 import 与 `path` 用法
- 改为注释说明后续如何恢复；唯一入口改为客服中心头像十连击动态加载
- 保留 `vite-plugin-vconsole` 依赖（package.json 与 vite.config.ts 均不再引用，其他分支或未来可能需要）

## 验证证据
- 新增独立异步 chunk `vconsole.min.Naiyrulc.js`（282KB），主包 858KB→472KB
- `dist/index.html` 中 vconsole 引用数 0
- 运行时实测（Playwright）：启动 `instance:false, panel:false`；连点10下 `instance:true, panel:true` 唤起；再点10下关闭；页面 0 报错

## 归属与上下文
- 涉及文件：vite.config.ts、src/main.ts、env/.env.test
- 所属项目：zhi2-mobile-shimin-h5-zhishu；改动已提交并推送

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vconsole_build_injection",
  "source_extraction_id": "7fbf2887a9bf489b880027f0dc8a5241",
  "version": 1,
  "memory_type": "entities"
}
-->