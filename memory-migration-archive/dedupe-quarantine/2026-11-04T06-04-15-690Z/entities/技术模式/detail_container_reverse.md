# 统计页标题按钮被反转至底部根因
苏住房G项目统计展示类页面套全局.detail-container后标题栏与操作按钮组出现在页面最底部，视觉完全颠倒。

## 问题根因
- 全局.detail-container为表单详情页设计，样式写flex-direction: column-reverse
- 目的是让模板最后面的操作按钮固定在视觉底部，代价是DOM第一个子元素（标题栏）被排到最底部
- 页面DOM顺序本身没错，查模板/v-if/CSS优先级都查不出，难联想到「容器把顺序反了」

## 解决方案
- 先判断页面性质：有表单提交语义、需操作按钮常驻底部才用.detail-container
- 纯统计/看板/多维汇总类页面（月报统计、信用申报统计）应换.list-container，标题与按钮组回到顶部
- 不要靠页面里写order或加flex-direction:column !important硬掰，会与容器底部按钮策略打架

## 验证与归属
- 验证：会话c63cd57e用户问「标题和按钮组怎么到页面最下面去了」，结论明确原因为column-reverse，已改外层容器为list-container
- 涉及文件：publicQuery/monthlyReportStat/detail.vue、publicQuery/monthlyReportStat/index.vue
- 所属项目：苏住房G；代码基线：320507d；来源会话：c63cd57e-5fe2-4369-a1ab-b24c51627de2

## 关联区分
- 已知detail-container经验多是滚动所有权、底部白条高度、间距叠加，本条补「方向本身被反转」这一独立根因

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_container_reverse",
  "source_extraction_id": "d2b47756a3ff4649b774baa576cac35f",
  "version": 1,
  "memory_type": "entities"
}
-->