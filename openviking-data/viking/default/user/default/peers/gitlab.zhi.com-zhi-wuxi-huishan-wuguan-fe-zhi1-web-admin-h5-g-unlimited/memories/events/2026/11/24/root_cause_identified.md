# Summary
On 2026-11-24 the diagnosis of ZenTao task 2768 (惠山维修资金 表决 url problem) traced the empty voting list to `index.vue:304`, which sets `decisionType` from the second segment of the route name (`maintain` → `MAINTAIN`, otherwise `OWNERS`); because the 维修资金表决 menu's route name does not contain `maintain`, the page requested `/estate/ownerDecision/list` with `OWNERS` while the dictionary maps 维修资金表决 to `MAINTAIN`, and the table header showing 「关联业务编号」 confirmed the wrong branch.
# 2026-11-24 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: http://zentao-biz.zhi.com/index.php?m=task&f=view&id=2768
https://180.101.184.99:8280/index
admin Zs@2026Aa!@#
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: Hook 提示首探需派子代理，但这是已知精确路径的 skill 参考文件读取（属豁免类）。重试一次：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 改用 grep 定位关键行：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 查询禅道任务详情与备注（合并一条多语句）：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 任务已查到（type=affair，刚创建 20 分钟，无备注）。读 steps 长文本（UNION ALL 分段）：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 分段过 200 字符被截断，改小分段拿全：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 任务内容已还原：**task 2768【惠山维修资金】维修资金表决url问题** —— 表决列表 `/estate/ownerDecision/list` 请求传了 `decisionType=OWNERS`，但字典配置「维修资金表决」对应 `MAINTAIN`，怀疑参数值错误导致无数据。附两张图：24052（接口返回）、24057（字典配置）。

先取附件并定位前端代码：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 附件已下载。grep 被拦是因为仓库根，缩窄到子模块目录：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 字典配置确认：维修资金表决=MAINTAIN、业委会选举=OWNERS。而页面在「维修资金表决」菜单下却传了 OWNERS——这是按路由名映射 decisionType 的逻辑出错。继续读 script 部分：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 命中根因嫌疑行 304。读上下文：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 前端逻辑已明确：`index.vue:304` 按路由名第二段决定 `decisionType`（`maintain`→MAINTAIN，否则 OWNERS）。截图表头显示「关联业务编号」（非 maintain 分支的文案），证实该菜单的路由名第二段不是 `maintain`。查菜单配置取证：

<!-- MEMORY_FIELDS
{
  "event_name": "root_cause_identified",
  "goal": "Locate voting URL root cause",
  "summary": "On 2026-11-24 the diagnosis of ZenTao task 2768 (惠山维修资金 表决 url problem) traced the empty voting list to `index.vue:304`, which sets `decisionType` from the second segment of the route name (`maintain` → `MAINTAIN`, otherwise `OWNERS`); because the 维修资金表决 menu's route name does not contain `maintain`, the page requested `/estate/ownerDecision/list` with `OWNERS` while the dictionary maps 维修资金表决 to `MAINTAIN`, and the table header showing 「关联业务编号」 confirmed the wrong branch.",
  "ranges": "0-40",
  "source_extraction_id": "34843479341349bdb6b1873a2fb5df7e",
  "version": 1,
  "memory_type": "events"
}
-->