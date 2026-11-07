# 侧栏收起表格列宽重算均分
左侧菜单收起后列表页表格右侧留白、列宽不均，需重新触发宽度计算并均分剩余列。

## 问题现象
- 侧栏收起后表格右侧出现空白、列宽不跟随容器变化，多菜单复现
- 在 Chrome 141 上改 :fit 反复无效，用户两轮「还是不行」

## 根因分析
- 表格列宽首次渲染时按当时容器宽度算好并写死，侧栏收起只改外层宽度不一定触发内部重算
- :fit 只影响列宽策略，不负责重新测量容器

## 解决方案
- 容器尺寸变化（侧栏折叠、resize、Tab切换）显式触发「重置基准列宽+重新测量+剩余宽度均分」重算，做防抖合并
- 重算不要挂 mounted 与 data watch 重复执行，首次布局交给 data 的 immediate watch
- 用户认可方案为「重新触发宽度计算，平均分给每一列」，而非调 fit/min-width

## 验证与归属
- 来源会话 ed54ca3b 诉求6：重新触发宽度的计算，平均分给每一列
- 涉及文件：zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/index.vue、zs-table.vue、table.js、layout/index.vue
- 所属项目：产品2.0；代码基线：414029f

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "sidebar_table_width",
  "source_extraction_id": "8f12761b41b14e02875c9d92abba45c0",
  "version": 1,
  "memory_type": "entities"
}
-->