# 决策提交人姓名统一用实名
i淮安公版提交决策时 decisionPlayerName 统一改为用户实名 realName，展示页保持接口返回值。

## 修改内容
- src/store/user.js 新增 getter realName，对应实名姓名字段（username / data.realName）。
- 以下 3 处提交逻辑全部改为 userStore.realName：src/pages_owner/decision/form.vue、src/pages_owner/elect/form.vue、src/pages_owner/decision/components/multiple/ViewOptionsList.vue。

## 未改动范围
- 展示页面（DecisionRecord.vue、DecisionResult.vue、ResultRecord.vue 等）仍使用接口返回的 detailInfo.decisionPlayerName / el.decisionPlayerName，展示已保存决策记录，不改为当前登录用户 store 值。
- 配合此前 getUserInfo 修复（realName: data.realName），提交时 decisionPlayerName 会正确带上用户实名。

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安公版
- 涉及文件：src/store/user.js、src/pages_owner/decision/form.vue、src/pages_owner/elect/form.vue、src/pages_owner/decision/components/multiple/ViewOptionsList.vue
- 所属项目：i淮安公版；来源会话 ID：b9a67129-a3c8-45ef-a049-365dbe342883；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_player_realname",
  "source_extraction_id": "0c28d5f415194f44b604cfd2092ad894",
  "version": 1,
  "memory_type": "entities"
}
-->