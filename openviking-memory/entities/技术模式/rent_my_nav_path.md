# rent我的页导航改用显式path跳转
在 @src/pages/rent/my/index.vue 将菜单列表跳转由 pageUrlList 数字下标改为显式 path 字段。

## 问题背景
- 原列表用 `@tap="item.tap"`，部分项（语言切换、关爱模式）无 tap，点击执行 undefined 易异常
- 跳转依赖 pageUrlList[16]、pageUrlList[18] 闭包，维护易错

## 实现做法
- 为可跳转项增加 path 字段，如我的票据 `/pages-rent/invoice/index`、我的银行账户 `/pages-rent/bankAccount/index`
- 其它项（我的合同、我的账单等）亦改用 path，不再依赖 pageUrlList 数字下标
- 模板由 `@tap="item.tap"` 改为 `@tap="onNavItemTap(item)"`
- 新增 onNavItemTap，在 item.path 存在时调用 handleLocation(item.path)

## 验证与归属
- 涉及文件：@src/pages/rent/my/index.vue
- 来源会话：c0c95cb0-30f5-40de-ab39-160aaecbf11b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rent_my_nav_path",
  "source_extraction_id": "a8cb5c6f003a4f60938b19021b4f9a9c",
  "version": 1,
  "memory_type": "entities"
}
-->