# 求购搜索小区跳转修复
苏住房C 小程序「我的求购」添加页搜索小区时因重复跳转事件导致页面栈异常，已修复。

## 问题原因
- 添加求购信息页（add.vue）搜索框同时绑定 div 的 @tap 与 ZsSearch 的 @focus，点击时连续触发两次 navigateTo
- 页面栈变成：我的求购 → 添加求购信息 → 搜索小区 → 搜索小区（重复）
- 搜索小区页选中小区后 navigateBack({delta:1}) 只退一层，仍停留搜索页，需再选 2~4 次才能回到添加页

## 修复内容
- add.vue 去掉重复 @tap 和 @focus，改为与其他页面一致的 @click.native 单次跳转
- search.vue 选中小区后在页面栈查找「添加求购信息」页并一次性回退到该页
- 验证路径：我的求购 → 添加 → 点击搜索框 → 搜索并选择小区 → 第一次选择后直接回到添加页并显示已选小区

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_transaction/intention/my.vue、add.vue、search.vue
- 来源会话ID：9e111257-31c8-47e5-b4c2-c258dbd7cb93
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "intention_search_nav_fix",
  "source_extraction_id": "87e33cf0079f4bbcb47a8d1b6a3d7a99",
  "version": 1,
  "memory_type": "entities"
}
-->