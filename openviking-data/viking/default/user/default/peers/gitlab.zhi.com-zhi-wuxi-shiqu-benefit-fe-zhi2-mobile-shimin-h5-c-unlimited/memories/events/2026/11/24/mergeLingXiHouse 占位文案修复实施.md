# Summary
2026-11-24 修改 src/utils/portal.js:203 的 mergeLingXiHouse：命中已有房屋时保留接口返回的真实 complexName/address（仅当灵犀返回非空真实值时才覆盖），未命中时不再新增带占位文案的行，houseId 缺失时直接返回；改动后 node --check 语法检查通过。
# 2026-11-24 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: 用户已有一套房屋，点击我的，点击绑定，跳转第三方，选择完房屋之后跳回来首页。一开始还可以在首页显示具体的房屋，然后房屋添加成功提示之后，房屋不显示了，变成了“我的房屋”字样。
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Now I'll apply the fix to `mergeLingXiHouse`, implementing the approved plan plus the P1 edge-case hardening.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Now static syntax check on the changed file.
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Syntax check passed. Let me run the post-change build via the orchestrator to confirm no compile errors.

<!-- MEMORY_FIELDS
{
  "event_name": "mergeLingXiHouse 占位文案修复实施",
  "goal": "实施房屋标题占位修复",
  "summary": "2026-11-24 修改 src/utils/portal.js:203 的 mergeLingXiHouse：命中已有房屋时保留接口返回的真实 complexName/address（仅当灵犀返回非空真实值时才覆盖），未命中时不再新增带占位文案的行，houseId 缺失时直接返回；改动后 node --check 语法检查通过。",
  "ranges": "0,112-116",
  "source_extraction_id": "22496bd112ec489790000563131e3c2e",
  "version": 1,
  "memory_type": "events"
}
-->