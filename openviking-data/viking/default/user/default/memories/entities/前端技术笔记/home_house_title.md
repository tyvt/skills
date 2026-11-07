# 首页房屋标题改为houseList取值
i淮安公版首页房屋标题与副标题改为从 userStore.houseList[0] 取 complexName 和 address，并保留兜底文案。

## 修改内容
- displayHouseTitle 改为从 userStore.houseList[0].complexName 取值。
- displayHouseSubTitle 改为从 userStore.houseList[0].address 取值。
- 均保留原兜底文案：「我的房屋」、「请选择房屋」。

## 验证与归属
- 已检查 lint，无新增报错。
- 验证证据：extracted source=cursor project=i淮安公版
- 涉及文件：src/pages/index/home.vue、src/App.vue、src/store/user.js
- 所属项目：i淮安公版；来源会话 ID：888c04f6-7ea6-471f-a22f-fd6d92d637f3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "home_house_title",
  "source_extraction_id": "0c28d5f415194f44b604cfd2092ad894",
  "version": 1,
  "memory_type": "entities"
}
-->