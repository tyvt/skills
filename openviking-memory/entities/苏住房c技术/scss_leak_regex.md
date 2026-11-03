# uni.scss末尾marker改动致LEAK_END正则失配
uni.scss 末尾 marker 规则增删属性会让 prune-component-wxss-leak.mjs 的 LEAK_END 正则失配，主包上传体积暴涨超限。

## 问题根因
- 在 uni.scss 给 `.page-wrapper` / `.page` / `.add-page` 等 marker 规则加 `min-height: 100%`，uni编译把这段全局样式注入每个组件wxss末尾并带marker注释用于裁剪
- 原末尾形如 `{width:100%;box-sizing:border-box}`，加属性后变成 `{width:100%;min-height:100%;box-sizing:border-box}`
- `scripts/prune-component-wxss-leak.mjs` 的 LEAK_END 正则按旧文本写死，匹配失败 → 裁剪空转，32个主包组件各重复注入约8KB，合计+258KB，主包从约1793KB顶到2094.8KB越过2048KB上传上限
- 磁盘体积（1790.5KB）ok，只有「上传预估/source size」超标，只看磁盘会误判正常

## 解决方案
- 正则里新增属性做成可选段：`{width:100%;(?:min-height:100%;)?box-sizing:border-box}`
- 修复后 components 421.1KB→163.1KB、MAIN磁盘1532.5KB、上传预估1793.1KB通过
- 长期约定：凡改动 uni.scss 末尾marker规则（增删任意属性），必须同步检查 LEAK_END 是否仍匹配，并同时看「磁盘」与「上传预估」两指标

## 验证与归属
- 验证证据：构建日志 MAIN磁盘1790.5KB ok / 上传预估2094.8KB OVER LIMIT / validate-dist失败；改可选段后构建完整通过
- 涉及文件：src/uni.scss、scripts/prune-component-wxss-leak.mjs、scripts/validate-dist.mjs、scripts/size-main-package.mjs、package.json
- 所属项目：苏住房C；来源会话ID：fc94b08c-d7f0-4ffe-9070-050d77fd5bb1；代码基线：9cdf7b8

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "scss_leak_regex",
  "source_extraction_id": "1e9d9fcc5d254f8bb6175bced3e8798b",
  "version": 1,
  "memory_type": "entities"
}
-->