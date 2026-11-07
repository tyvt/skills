# 微信分包体积超限排查方法
苏住房C项目 pages_transaction 分包约2115KB 超限，需调整主包/分包体积上限并查看编译面板。

## 关键事实
- `wx.onLazyLoadError` 返回 undefined 为正常现象——仅在基础库 ≥ 2.24.3 且错误属于「分包异步加载」时才有值
- 模拟器启动失败时错误往往发生在更早阶段，Console 仅显示工具包装后的 `[object Object]`，并非完整错误信息

## 排查步骤
- 详情→本地设置 勾选「预览及真机调试时主包、分包体积上限调整为 4M」
- `project.config.json` 的 `bigPackageSizeSupport` 仅写进配置文件不够，必须在开发者工具 UI 里勾选
- 未勾选时 pages_transaction 分包（约2115KB）超限可能导致模拟器直接起不来
- 顶部点「编译」，看下方「编译/代码依赖分析」是否有红色报错（如 source size exceed、Component is not found、json 文件内容错误），而非「调试器→Console」

## 构建结果
- 主包上传预估 1962.7KB（合规）
- 重新构建命令：`cd zhi2-mobile-shimin && npm run build`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：project.config.js、src/pages.json、src/pages_owner、src/pages_owner/house/automaticAdd.vue、src、package.js
- 来源会话ID：672f088f-9a28-4d5f-8510-9425d8259a76

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "wechat_size_debug",
  "source_extraction_id": "dff9607c77784b1e9cb66c804fd5e57e",
  "version": 1,
  "memory_type": "entities"
}
-->