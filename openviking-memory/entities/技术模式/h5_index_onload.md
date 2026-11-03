# H5 index.html onload 被 Vite 注入覆盖
uni-app 构建后 Vite 重新注入入口脚本且不带原 onload，导致生产环境加载动画永不隐藏。

## 问题根因
- index.html 里给入口 module 脚本绑 onload 隐藏 loading
- uni build 后 Vite 重新注入 /assets/index.xxx.js 且不带原 onload，生产环境 __hidePageLoading 永不执行，一直显示加载中（本地 dev 正常）

## 修复方案
- 在 App.vue onLaunch 开头调用 window.__hidePageLoading()（仅 window 存在时）
- 不依赖构建保留 onload；隐藏时机改为应用启动而非仅 main.js 下载完

## 验证与归属
- 验证：会话 0c26f1bc/128b09bc 生产一直 loading，根因 Vite 注入覆盖 onload，移到 onLaunch（证据 012.md）
- 涉及文件：index.html、src/App.vue
- 来源会话ID：0c26f1bc-7368-462a-ba7f-eae1213f73a1, 128b09bc-4bce-4355-8562-746d9dba13c3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "h5_index_onload",
  "source_extraction_id": "5275a4e5dacb42f1bcfc39133d795b60",
  "version": 1,
  "memory_type": "entities"
}
-->