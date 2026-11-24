# Summary
2026-11-24 回答用户三个问题后确认：该接口仅用于 `detail.vue:429`「推送业主在线表决」单选框的防重复推送禁用，惠山侧 404 使 `voteDiasbled` 恒为 false、逻辑从未生效，完全移除调用行为不变且可消除报错；并查明两处 watch 仅调用 `isDisabled()`，一并删除。
# 2026-11-24 (Tuesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 用户问了三个问题，先取证再答：① 该调用的真实引入时间（跨重命名前历史）；② 按钮 disabled 绑定的上下文：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 太仓提交对象不在惠山当前分支。逐个验证三个候选提交谁在当前分支内：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 三个问题都已查实，逐一回答：

## ① 何时引入

- **2023-10-23**，提交 `7493fb17c`「任务24438 增加在线决策小区清单功能」，前后端同日配套开发（后端太仓 task#2215 同日引入该 Controller 接口）。
- 太仓侧 2026-07 的 task563 提交不在惠山当前分支（wuxi-huishan-wuguan-main-v1.26），与本工单无关。

## ② 是干嘛用的

- `detail.vue:429` 的「**推送业主在线表决**」单选框（onlineVote 字段）：发起表决时选择是否把表决推送到业主手机端在线表决。
- `hasOnlineDecisionPush(propertyProjectId)` 查「该物业小区是否已推送过在线表决选项」，已推送（返回1）则把单选框禁用（:435），**防止重复推送**。

## ③ 能否移除——可以，且不影响

关键事实：**惠山生产后端根本没有这个接口**（DevTools 实测 404，estate-manage 全历史也无此接口，唯一实现在太仓后端仓）。这意味着该调用在惠山**所有场景都必然 404**，`voteDiasbled` 从上线至今始终是初始值 `false`（未禁用）——防重复推送逻辑**从未生效过**，它现在唯一的作用就是每次打开表决详情弹一个 404 错误。移除调用 = 行为完全不变 + 消除报错。
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 按规范走计划审批。先看计划目录与模板约定：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 写入极简计划并送审：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 计划审核通过（78 分），有三个 P1 建议需补充证据。先跑两条验证性 grep 回填计划：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 太仓隔离实锤（同仓不同分支发布，`origin/suzhou-taicang-wuguan-main-v1.26` 保留自己的实现，惠山分支删除互不影响）；当前分支引用全集 7 处，`voteDiasbled` 无其他赋值点。还发现 watch 有第二个调用点 :840，读上下文：
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 两个 watch 的唯一内容就是调 `isDisabled()`，删除调用后两块 watch 全空 → 一并删除（在已批准的「完全移除」范围内）。更新计划并请用户确认：

<!-- MEMORY_FIELDS
{
  "event_name": "确认移除hasOnlineDecisionPush调用",
  "goal": "确定修复方案",
  "summary": "2026-11-24 回答用户三个问题后确认：该接口仅用于 `detail.vue:429`「推送业主在线表决」单选框的防重复推送禁用，惠山侧 404 使 `voteDiasbled` 恒为 false、逻辑从未生效，完全移除调用行为不变且可消除报错；并查明两处 watch 仅调用 `isDisabled()`，一并删除。",
  "ranges": "84-111",
  "source_extraction_id": "5733bad6d224402c950dcec8010d393f",
  "version": 1,
  "memory_type": "events"
}
-->