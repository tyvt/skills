# 学习园地新增页签同步改四处
苏住房G首页v2学习园地新增「业务通知」页签并置顶，最终顺序：业务通知、政策法规、流程指南、在线课堂、常见问题、经典案例，需同步改 tab 常量 / api 分流 / 跳转映射 / 数据字段映射。

## 背景与动机
- 学习园地页签是纯前端 tab 索引驱动的一整套映射链，改一处必然漏：tab 值决定请求哪个接口、跳哪个路由、列表项取哪些标题字段

## 解法
- StudyPanel.vue 里 tab 值 '0' 给业务通知放第一个，但默认选中仍保持政策法规（1），不要顺手把默认改成新页签
- api/portal/home.js 里 tab === '0' 分流转到 GET /msg/businessNotice/page（pageNum/pageSize 同其他页签）
- studyNav.js 增加业务通知跳转路由；studyDataMap.js 增加字段映射（noticeId / noticeTitle），否则列表出数据但标题空白、点击无跳转
- E2E 的 mock（home-v2-mocks.js / home-v2.spec.mjs）补 businessNotice/page 桩，否则首页 e2e 因新接口 404 红掉

## 验证与归属
- 来源会话3716ba06（基线315702f）最终结论第3、5条：StudyPanel Tab0置顶默认Tab仍1；api分流；studyNav/studyDataMap支持；mock补充
- 涉及文件：zhi2-web-admin/src/views/home/v2/components/StudyPanel.vue、api/portal/home.js、v2/studyNav.js、v2/studyDataMap.js、tests/e2e/home-v2-mocks.js、home-v2.spec.mjs
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "study_tab_sync",
  "source_extraction_id": "945bb1e362c547b283081240c4923464",
  "version": 1,
  "memory_type": "entities"
}
-->