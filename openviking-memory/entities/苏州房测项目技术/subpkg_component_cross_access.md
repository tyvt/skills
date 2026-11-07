# 子包组件无法在子包之间引用
在小程序 SuzhouFangC (zhi2-mobile-shimin) 中，子包组件不能在不同的子包之间被引用；Home_Jiayuanqu（子包 pages_tab）引用了子包 pages_main 中的 NoticeList 导致错误，需要将组件移动到主包并统一导入路径。

## 问题根因
- WeChat 小程序不允许在子包之间引用组件
- Home_Jiayuanqu（子包 pages_tab）引用了子包 pages_main 中的 NoticeList，导致加载失败

## 解决方案
- 将 NoticeList 移动到主包中的 src/components/NoticeList/NoticeList.vue
- 将 pages_tab/components/Home_Jiayuanqu.vue 等文件中的导入路径统一为 @/components/NoticeList/NoticeList.vue
- 移除子包中的原始路径

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：454c97fd-ca5c-4c7f-a2dd-54da7553d258
- 验证：会话 454c97fd 用户报告了子包之间的引用错误；NoticeList 已移动到主包且路径已统一
- 涉及文件: src/pages/index/components/Home_Jiayuanqu.vue, src/pages.json, src/components/PageBg/PageBg.vue, src/components/NoticeList/NoticeList.vue, pages_tab/components/Home_Jiayuanqu.vue
- 验证证据: src=苏住房C/052.md; 会话 ID: 454c97fd-ca5c-4c7f-a2dd-54da7553d258; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subpkg_component_cross_access",
  "source_extraction_id": "0e29cc68446e451f8607eb6f35513056",
  "version": 1,
  "memory_type": "entities"
}
-->