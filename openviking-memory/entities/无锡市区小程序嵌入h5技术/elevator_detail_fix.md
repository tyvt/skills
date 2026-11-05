# 电梯公共收益明细页detail.vue修复
电梯公共收益明细页detail.vue存在数据不显示、tag切换无效、样式错乱、未用主题色等问题，已按列表页规范统一修复。

## 问题根因
- 使用@virtualListChange但未开启虚拟列表（use-virtual-list），list始终为空致数据不显示
- 切换tag逻辑正常但列表未正确绑定，切换后无变化
- div/view混用且z-paging未正确绑定数据致样式错乱
- Tab激活态、汇总区背景写死绿色#007A39，未用var(--primary-color)（#2065DF）

## 解决方案
- 改用v-model="list"绑定z-paging，与报修列表等列表页一致
- 统一使用view标签，布局对齐列表页卡片风格（#f5f6f8背景+白色卡片）
- Tab激活态、汇总区背景改用var(--primary-color)和rgba(var(--primary-color-rgb),0.1)
- 收入/支出金额保留语义色（红/绿），与index.vue一致
- 增加空状态展示，移除未使用的getDict相关代码，列表项key改为revEx...

## 验证与归属
- 涉及文件：src/pages_benefit/elevatorPubEngCons/detail.vue、src/pages_benefit/elevatorPubEngCons/index.vue、src/api/benefit.js
- 来源会话：518350aa-c9b8-4693-b776-97fb2bd8ddb3
- 所属项目：无锡市区小程序嵌入H5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "elevator_detail_fix",
  "source_extraction_id": "63dce1141adb41349106ccb0a7746519",
  "version": 1,
  "memory_type": "entities"
}
-->