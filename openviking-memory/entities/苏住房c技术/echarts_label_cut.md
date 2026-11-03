# 小程序柱状图数值标签右侧裁断
苏住房C 小程序横向条形图金额标签被 canvas 裁断，根因为 grid.right 写死值不随最长标签动态留白。

## 问题现象
- 横向条形图金额标签显示不全，截图看像字体问题而非裁切
- 表现为「数值缺尾巴/少一位」，易被误判成数据类型或 toFixed 问题

## 根因
- ECharts label.position:'right' 挂在柱子末端向容器外延伸，不参与 grid 计算
- grid.right 写死小值（本项目原 12）时超宽标签直接被 canvas 裁断；containLabel:true 只补偿坐标轴管不到 series.label
- 金额带千分位+两位小数+¥，标签宽度随数值增长，写死 right 必崩

## 解决方案
- grid.right 由常量改为按当前数据最长标签宽度计算：遍历 list 用同一 label 格式化函数生成文本取最长，按 字符数×字号 估算并给下限兜底（本项目 Math.max(88, maxLen*8)）
- label.formatter 与估算必须共用同一函数（如 getChartAmountLabel），否则估算与实际渲染漂移

## 验证与归属
- 验证：会话 9f66fd77 用户诉求图表金额显示不全并附截图；结论提交 f4939ee4「fix(balancePublicity): 修复经营性收支公示图表金额显示不全」合入 mainv2.1
- 仓库现行代码 pages_benefit/balancePublicity/index.vue 中 grid.right: getChartRightPadding(list)，getChartRightPadding 遍历标签取最长并按 Math.max(88, maxLabel.length*8) 兜底，label.formatter 与估算共用 getChartAmountLabel
- 涉及文件：src/pages_benefit/balancePublicity/index.vue、components/echarts-uniapp/echarts-uniapp.vue、src/utils/index.js、src/utils/formatter.js
- 所属项目：苏住房C；来源会话ID：9f66fd77-28bc-4259-95fb-94906c451e54；代码基线：c7d6817

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "echarts_label_cut",
  "source_extraction_id": "d03b04d8de7b4dfa8319ee812c43be64",
  "version": 1,
  "memory_type": "entities"
}
-->