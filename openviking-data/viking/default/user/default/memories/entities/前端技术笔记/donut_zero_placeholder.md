# 环形图接口数据全 0 时的渲染策略
园区物管2.0 统计看板多列环形图在接口返回全 0 时，需占位值画环且展示真实 0 值，而非显示「暂无数据」。

## 现象
- 资产分类/车位分类/资源分类/合同分类环形图在接口全 0（count=0、ratio=0）时图表显示「暂无数据」，用户认为分类结构仍应可见。

## 根因
- 通用取数函数 getDonutSeriesData 过滤 value<=0 的项，全 0 被过滤成空数组触发空态分支。
- 「全 0」与「无分类数据」是两种业务语义，前者仍有分类结构需要展示。

## 修复方案
- 空态判定收窄为「分类数组本身为空」才显示「暂无数据」。
- 全 0 时保留全部分类项，用等分占位值（value:1）绘制环形图保证各色块与图例可见，标签与 tooltip 仍绑定真实 count/ratio（显示 0 和 0.0%）。
- 分类较多时隐藏扇区标签避免重叠，底部图例保留全部分类；策略对同页所有环形图统一生效。

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue。
- 所属项目：园区物管2.0；来源会话：26ce6808-4e6b-41fc-88d2-b31cbed282bf；代码基线：同源未提炼过此图表层解法。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "donut_zero_placeholder",
  "source_extraction_id": "9147c18620be4462a8dc49a228e2758c",
  "version": 1,
  "memory_type": "entities"
}
-->
