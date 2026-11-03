# 首页keep-alive缓存致tab与统计数字错位
[苏房]产品2.0首页「办件量分析」切到当日后进待办详情再返回，tab回默认本周但数字仍当日，出现选中与数据错乱。

## 问题根因
- 页面被keep-alive缓存，activated时组件未重建，tab索引与数字区为两套独立状态
- DOM复用致数字未及时刷新
- 多次统计请求并发返回时旧响应覆盖新响应
- 重新激活后未重新取数

## 解决方案
- 数字区加:key="'task-stats-'+currentTab"强制重渲染，杜绝DOM复用串数据
- 用currentTaskStats计算属性统一安全读取当前tab对应数据，不在模板按索引散取
- 抽refreshStatsData()，刷新前先清空todoCount/bubbleList/lineData避免短暂显示旧值
- 加statsFetchSeq自增序号，响应回来比对序号丢弃过期响应（并发防御通用写法）
- 补activated钩子，从详情返回时重置tab为本周并重新拉数

## 验证与归属
- 验证证据：会话d23cbaf7用户反馈首页办件量分析切换数量紊乱且不能稳定复现，给出复现路径（点当日→点待办进详情→返回首页停本周显示当日数）
- 涉及文件：zhi2-web-admin/src/views/home/index.vue、zhi2-web-admin/src/views/home/index-wrapper.vue、zhi2-web-admin/src/router/index.js
- 可复用结论：用户报数字与选中项不一致/偶发不稳定复现时，优先按keep-alive缓存+tab索引独立状态+并发响应乱序三项排查
- 所属项目：产品2.0；来源会话：d23cbaf7-ad9b-42a8-baa6-7897239ffefe；代码基线：c98afb0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "keepalive_tab_stats",
  "source_extraction_id": "fb402dbbd77a4c29a09d2ea0a800eb3b",
  "version": 1,
  "memory_type": "entities"
}
-->