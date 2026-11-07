# 苏住房C双执行环境
苏住房C主业务仓库 zhi2-mobile-shimin 同时存在小程序与 H5 两条构建/运行链，共用同一套 src 源码与工具函数。

## 小程序链
- uni-app + Vue3，`npm run build` 产出 `dist/`，用微信开发者工具导入 `D:/repository/苏住房C/dist` 验证
- 构建末尾有 `[validate-dist]` 门禁，存在分包（pages_main、pages_benefit、pages_transaction 等）与主包体积限制

## H5链
- 同一 src 另有 H5 分支（如 suzhou-shiqu-suzhufang-main-v2.1），整站嵌入 APP 中使用
- 不能调用小程序专有 API（navigateTo、原生拨号、rich-text 组件），必须走 APP 注入能力（如 app.js 的 toService 拨号）
- H5 分支「点击没反应」类问题先查 APP 桥（toService 等）是否被调用

## 共用与验证
- `src/utils/index.js` 是两端共用，改跳转/拨号/H5 URL 归一化函数须评估小程序端是否回归
- 验证口径不同：小程序重新构建核对 dist 产物；H5 至少跑通对应分支构建并确认改动在目标分支（子模块提交 + 父仓库更新指针）
- 两仓库结构要求「子模块先行提交，父仓库只更新指针」
- 来源会话：1ee54692、d9082516；代码基线：9a3c8db / a8c9568

<!-- MEMORY_FIELDS
{
  "category": "苏住房C项目拓扑",
  "name": "dual_exec_env",
  "source_extraction_id": "4edd2b91cca8449093310dc478e50406",
  "version": 1,
  "memory_type": "entities"
}
-->