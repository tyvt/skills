# 首页待办面板与关键数据区域解耦
在苏住房G项目(zhi2-web-admin)首页v2，待办面板接口被区域切换耦合请求，需解耦为按用户维度不带regionCode。
## 规则
- 待办是「当前登录用户」维度，与浏览哪个关键数据区域无关
- onKeyRegionChange只刷随区域变化的面板(关键数据/公共收益/报修/学习园地)，删掉loadTodoPanel()
- loadTaskCount改getTaskCount({})、loadTodoPanelList只传{pageNum:1,pageSize:4}，彻底去regionCode
## 防护与验证
- 两处加注释「待办按用户维度、不随关键数据区域变化」防后人接回
- 触发路径：首次loadAll发taskCount+todoTaskList；区域切换0个待办请求；待办Tab切换只发列表
- 验证：会话9baedf91，切区域Tab时Network不应再出现taskCount/todoTaskList
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：src/views/home/index-v2.vue、src/views/home/v2/components/KeyDataNav.vue、src/api/portal/home.js
- 所属项目：苏住房G；来源会话：9baedf91-d8d6-40c2-8e79-314e529e757a；代码基线：15e201a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_panel_decouple",
  "source_extraction_id": "3c7e2243800241628db95ed98f7b1f96",
  "version": 1,
  "memory_type": "entities"
}
-->