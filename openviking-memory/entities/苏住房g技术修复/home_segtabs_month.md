# 首页SegTabs默认当月数据修复（苏住房G）
苏住房G 项目 G 端新版首页「公共收益」与「报事报修」卡片的 SegTabs 默认展示「当月数据」。

## 改动内容
- 将 PublicBenefit.vue 与 RepairPanel.vue 的 `mode` 初始值从 `'chart'` 改为 `'month'`
- 进入首页时两卡片默认高亮「当月数据」并展示当月统计内容
- 用户仍可手动切换到「图表趋势」，`watch: { mode }` 正常触发图表重绘
- API 无需改动，数据仍由 `index-v2.vue` 一次性加载

## 涉及文件
- zhi2-web-admin/src/views/home/v2/components/PublicBenefit.vue
- zhi2-web-admin/src/views/home/v2/components/RepairPanel.vue

## 验证与归属
- 所属项目：苏住房G；来源会话：afd5f7da-3a15-43a2-b937-b246564438ab
- 验证证据：extracted source=cursor project=苏住房G；代码基线：none
- 提交要求：先在 zhi2-web-admin 子仓库提交，再更新主仓库 submodule 引用

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "home_segtabs_month",
  "source_extraction_id": "844da6df7be1401ea9be629d26f82d85",
  "version": 1,
  "memory_type": "entities"
}
-->