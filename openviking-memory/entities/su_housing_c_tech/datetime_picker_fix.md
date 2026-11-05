# uni-datetime-picker 主包副本删除致 ENOENT 修复
苏住房C 构建后处理脚本遗漏 JS lazy-load 路径修正，致分包页面加载 `uni-datetime-picker` 报 ENOENT。

## 问题根因
- 脚本 `relocate-datetime-picker.mjs` 把 `uni-datetime-picker` 从主包复制到各分包并删主包副本以减体积
- 脚本只修正 `.json` 组件路径，未修正 `.js` 里的 lazy-load 路径
- 受影响分包 `pages_owner_extra`：`tenant/index`、`committee/application/index` 的 JS 仍指向主包 `node-modules`
- 微信工具按 JS 路径去主包找 `time-picker.wxss`，主包副本已删，报 ENOENT

## 修复要点
- 更新 `scripts/relocate-datetime-picker.mjs`，同步修正 `.js` 内 lazy-load 路径到分包

## 涉及文件
- `scripts/relocate-datetime-picker.mjs`
- `time-picker.wxss`
- `pages_owner_extra/tenant/index.js`
- `pages_owner_extra/committee/application/index.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：8f42167b-70b4-4ea9-85ad-c66840f5a3ba
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "datetime_picker_fix",
  "source_extraction_id": "ac50ecf9f90845419e67ae4bb989c614",
  "version": 1,
  "memory_type": "entities"
}
-->