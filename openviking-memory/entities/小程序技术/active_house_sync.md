# 跨Tab小区选择同步方案
首页与「我的」Tab 切换时小区选择须保持一致，通过独立存储用户选择避免被刷新覆盖。

## 不同步根因
- Tab 切页时「我的」onShow 跑 refreshFromServer 拉 profile、可能清空/重写房屋，再拉 ctUserIdentity；houseId 被清掉会默认选列表第一套，覆盖另一页选的小区
- 首页 onShow 跑完整 initializePage 异步拉 profile、灵犀、房屋列表，和 Tab 切换抢状态，冲掉刚选中的房屋
- 仅靠门户快照不够，部分流程会清 houseId，用户 picker 选择无单独可靠存储

## 本次改动
- 独立存储用户选择 __ew_portal_active_house__：picker 切换时写入 houseId / project，读快照、拉房屋列表后优先恢复
- 调整 Tab 切换刷新：首页 onShow 只恢复本地快照 + 轻量同步房屋列表，不再跑完整 initializePage
- 「我的」onShow 只恢复快照，不再完整跑刷新逻辑覆盖用户选择
- 普通绑房入口在合适时机清残留避免重复触发

## 验证与归属
- 验证证据：extracted source=cursor project=小程序
- 验证证据：会话 7ebdef37 两边切换小区未同步第二轮修复
- 涉及文件：pages/webview、utils、pages/webview/home.vue、pages/webview/externalWebview.vue、utils/portal-user.js
- 所属项目：小程序；来源会话ID：7ebdef37-14ee-44a0-8372-b1a08283e34e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "active_house_sync",
  "source_extraction_id": "7265b7fedf1548a680e2fa560dd69120",
  "version": 1,
  "memory_type": "entities"
}
-->