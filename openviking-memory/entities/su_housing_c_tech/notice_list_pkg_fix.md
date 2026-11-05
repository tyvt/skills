# 分包组件跨包引用限制修复（NoticeList）
苏住房C 小程序因分包组件跨包引用限制导致 NoticeList 组件找不到，已将组件移至主包公共目录。

## 问题根因
- `Home_Jiayuanqu` 位于分包 `pages_tab`，`NoticeList` 原在分包 `pages_main/announcement/components/`
- 分包 A 组件不能直接引用分包 B 组件，报错需配置 `componentPlaceholder`
- 主包页面 `pages/index/temp` 已对 `home-jiayuanqu` 占位，但内部 `NoticeList` 仍跨分包引用失败

## 修复要点
- 将 `NoticeList` 移到主包公共组件目录 `src/components/NoticeList/NoticeList.vue`
- 更新所有引用，导入路径统一为 `@/components/NoticeList/NoticeList.vue`
- 涉及 `pages_tab/components/Home_Jiayuanqu.vue`、`pages_main/announcement/index.vue`、`pages_owner` 下 5 个公告相关页面

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：454c97fd-ca5c-4c7f-a2dd-54da7553d258
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "notice_list_pkg_fix",
  "source_extraction_id": "8c968f7c69c54016b77e3b6eff8de193",
  "version": 1,
  "memory_type": "entities"
}
-->