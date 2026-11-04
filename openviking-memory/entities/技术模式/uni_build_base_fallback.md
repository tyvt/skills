# 非 npm 脚本调用 uni build 导致 base 回退
当执行 `npx uni build` 或 CI 直接调用 `uni build` 时，`npm_lifecycle_event` 为空并被当作 `development` 处理，导致 `loadEnv` 读取 `.env.development` 并生成错误的 Vite base。

## 问题
- `npm_lifecycle_event` 为空被解释为 `development`
- `loadEnv` 读取 `.env.development`，使 `VITE_APP_H5_PUBLIC_BASE` 为空
- Vite `base` 回退到 `/`，打包资源丢失 `/h5/` 前缀

## 解决方案
- `vite.config.ts` 改为使用从 Vite 接收的 `mode` 调用 `loadEnv(mode)`
- 对于以 `mp-` 开头的 `UNI_PLATFORM`，base 固定为 `/`
- 对于 H5，`base` 通过环境变量定义

## 验证与文件
- 验证证据: src=i淮安公版/001.md
- 涉及文件: src/api/index.js, README.md, vite.config.ts, src/manifest.json, src/pages.json, src/utils/index.js, package.json, src/pages/components/HonorList.vue
- 所属项目: i淮安公版/zhi2-mobile-admin-h5-c-unlimited

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uni_build_base_fallback",
  "source_extraction_id": "11ae8be425bf4675afd3f62a0549acbb",
  "version": 1,
  "memory_type": "entities"
}
-->