# Vite下vue-compat绝对路径禁止
zhi2-web-admin 的 vue-compat.js 在 Vite/esbuild 下禁止写绝对 node_modules 路径，需统一从 'vue' 导入。
## 问题现象
- Vite/esbuild 解析 import ... from '/node_modules/vue/dist/vue.runtime.esm-bundler.js' 或不稳定深路径会报 Could not resolve / Failed to resolve import。
- 尤其在父仓 hoist 的 monorepo 下更易出现。
## 解决方案
- 兼容层统一 import * as Vue from 'vue' 与 export * from 'vue'，不要手写磁盘绝对路径。
## 验证与归属
- 验证：会话 72a7e928 终端报错指向 src/vue-compat.js 第 1 行绝对路径与深路径解析失败。
- 涉及文件：zhi2-web-admin/src/vue-compat.js；所属项目：2-0；来源会话：72a7e928-6b11-466d-9ae8-7b29b1bfc969

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_compat_vite_bug",
  "source_extraction_id": "c6ae4da4185a4eb4914ba232a41c4536",
  "version": 1,
  "memory_type": "entities"
}
-->