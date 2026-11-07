# H5 index.html onload 被 Vite 注入覆盖
uni-app 构建后 Vite 重新注入入口脚本且不带原 onload，导致生产环境加载动画永不隐藏。

## 问题根因
- index.html 里给入口 module 脚本绑 onload 隐藏 loading
- uni build 后 Vite 重新注入 /assets/index.xxx.js 且不带原 onload，生产环境 __hidePageLoading 永不执行，一直显示加载中（本地 dev 正常）

## 修复方案
- 在 App.vue onLaunch 开头调用 window.__hidePageLoading()（仅 window 存在时）
- 不依赖构建保留 onload；隐藏时机改为应用启动而非仅 main.js 下载完

## 原始加载实现
- index.html 默认全屏显示"页面加载中"遮罩
- 入口脚本 `onload` 调用 `window.__hidePageLoading()` 隐藏；`onerror` 调用 `window.__showPageLoadingError()` 显示"资源加载失败，请刷新重试"
- 入口脚本代码示例：`<script type="module" src="/src/main.js" onload="window.__hidePageLoading && window.__hidePageLoading()" onerror="window.__showPageLoadingError && window.__showPageLoadingError()"></script>`
- 可选方案：将隐藏动作挪到 main.js 的 `createApp().mount()` 完成后（仅等 main.js 下载完而非挂载完），未实施

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 验证：会话 0c26f1bc/128b09bc 生产一直 loading，根因 Vite 注入覆盖 onload，移到 onLaunch（证据 012.md）
- 涉及文件：index.html、src/App.vue
- 来源会话ID：0c26f1bc-7368-462a-ba7f-eae1213f73a1, 128b09bc-4bce-4355-8562-746d9dba13c3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "h5_index_onload",
  "source_extraction_id": "e275caefd6534543abec67c4bd8c49d9",
  "version": 2,
  "memory_type": "entities"
}
-->