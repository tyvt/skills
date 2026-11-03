# 决策记录列表只显示时间
苏住房C投票决策记录列表因enrich覆盖与CardList槽位错位，只显示时间看不到决策者和选项。

## 现象与根因
- pages_vote/decision/common/DecisionResult.vue「决策记录」列表只看到时间，看不到决策者姓名和决策选项
- 两层叠加：CardList固定渲染label/value/remark三槽位，旧代码value写createTime、label留空、选项没落位
- enrichRecordList额外请求getDecisionRecordDetail再...record展开合并，详情响应同名字段为null时覆盖列表已有值

## 解决方案
- 直接用接口完整列表decisionOptionResponseAllList构建记录
- 映射label=decisionPlayerName、value=decisionOptionName、remark=createTime（最终采用label=姓名/value=时间/remark=选项）
- 记录详情接口降级为姓名兜底，扩展resolvePlayerName候选字段匹配，不回冲权威字段
- 通用判据：enrich/合并式取数写成「只在目标字段为空时回填」，不能无条件展开覆盖

## 验证与归属
- 会话84a82111与6fda2373（2026-08-27，基线f1939b0）两次收敛同一问题
- 涉及文件：decision/common/DecisionResult.vue、elect/DecisionResult.vue、CardList.vue
- 所属项目：苏住房C；来源会话ID：84a82111-c481-4df3-bfc7-e5397b1d1fed, 6fda2373-f0d5-4e0d-87d7-0f8c4b8cbc61；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "decision_record_bug",
  "source_extraction_id": "0db4fd13cb304d78aa42f67a8963f614",
  "version": 1,
  "memory_type": "entities"
}
-->