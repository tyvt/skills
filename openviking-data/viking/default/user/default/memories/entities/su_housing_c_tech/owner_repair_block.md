# 业主卡报事报修功能暂未开放拦截
苏住房C 业主卡「报事报修」改为「功能暂未开放」提示，不再跳转报修页。涉及路径：我的 → 电子业主卡 → 报事报修。

## 问题根因
- 源码已加拦截，但微信开发者工具运行的 `dist/dev/mp-weixin` 为旧包，`goToOther` 无「功能暂未开放」逻辑仍可跳进报修页

## 修复要点
- `pages_owner_extra/ownerCard/index.vue` 的 `goToOther` 方法，对「报事报修」（`value === "2"`）优先拦截并弹出「功能暂未开放」提示
- 拦截方式与项目中 `goMenu` / `menuNav` 的「暂未开放」处理方式一致
- `ownerCard/index.vue` 改用 `@tap.stop="handleNavClick(item)"`（小程序比 `@click` 更稳）
- 抽出 `isRepairNav`，在 `handleNavClick` 与 `goToOther` 双重拦截「报事报修」
- 其他入口（投票选举、投票表决、我要出售）不受影响
- 验证需重新编译并清缓存，导入新包 `zhi2-mobile-shimin/dist/build/mp-weixin`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`zhi2-mobile-shimin/src/pages_owner_extra/ownerCard/index.vue`
- 来源会话ID：eac9139c-3367-4784-8577-a513c71c95c0、76b4ec2e-0c31-43e8-b39a-197cc32de4fd
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "owner_repair_block",
  "source_extraction_id": "4b4211148dcb4ca980c39c04cc0e7fe5",
  "version": 2,
  "memory_type": "entities"
}
-->