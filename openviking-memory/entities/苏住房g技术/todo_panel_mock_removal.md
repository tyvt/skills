# 待办面板移除Mock与补齐逻辑坑
苏住房G首页V2的TodoPanel.vue移除mock数据时，仅删DEMO_ROW常量不够，还需拆除while补齐循环并按Tab拆分空态文案。
## 问题根因
- 原实现用while循环把list补齐到固定4行，删DEMO_ROW保留循环仍会补出undefined空壳行。
- 待办与消息两Tab共用面板，空态文案原同写"暂无数据"，移除mock后必须按active tab分流为"暂无待办"/"暂无消息"。
- 风险方向与"0是有效值"归一化相反：此处是视觉凑满而凭空构造行。
## 解决方案
- 删除DEMO_ROW常量，rows简化为this.list.slice(0,4).map(字段映射)单向尾部截断，不补齐不补位。
- 空态按active tab分支渲染各自文案；父组件index-v2.vue不动，数据仍由getTaskCount/getTodoTaskList/消息接口提供。
## 验证与归属
- 验证：会话9f5320c6删除DEMO_ROW、简化rows计算属性、两Tab空态分流；父组件未改。
- 涉及文件：src/views/home/v2/components/TodoPanel.vue、StudyPanel.vue、src/views/home/index-v2.vue
- 所属项目：苏住房G；来源会话：9f5320c6-ed38-4a0c-a9b9-1f824c967666；代码基线：cb37a39

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "todo_panel_mock_removal",
  "source_extraction_id": "53dcdef5796c422395b4454bfc7226df",
  "version": 1,
  "memory_type": "entities"
}
-->