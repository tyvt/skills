# 未认证空路径触发 goMenu 不可用
在项目 zhi2-mobile-shimin 中，当用户未验证（realname）时，将空路径 '' 传递给 goMenu 会触发 "功能暂未开放" 消息（功能不可用）。

## 问题
- 文件 `src/pages_my/setting/userInfo.vue` 如果用户未进行实名验证，则向 `goMenu` 传递 ''。
- 这会导致 `goMenu` 显示 "功能暂未开放"（功能暂时不可用）。

## 解决方案
- 添加了 `handleRealNameClick`，根据实名验证状态进行导航并更新内联文本。
- 涉及文件: userInfo.vue, utils/index.js, realInfo.vue, UnauthorizedPage.vue, TypeChoose.vue, store/user.js, aty_renzheng.xml, setting/index.vue.

## 验证
- 验证证据: src=苏住房C/029.md (内部文档).
- 源会话: 04bd980d-60cb-4228-859f-9dca707763e9; 代码库: none.

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia SuzhouC",
  "name": "unregistered_gomenu_empty",
  "source_extraction_id": "195ef044b5d84cc697c2bf15d158b46d",
  "version": 1,
  "memory_type": "entities"
}
-->