# 禅道缺陷 6939
惠山二期G 产品2.0（zhi2-web-admin）停车泊位列表的缺陷：要求在审批业务逻辑完善前关闭外部「审批」按钮。

## 缺陷内容
- 需求原文为「在业务逻辑完善前关闭外面的审核按钮」，即暂时隐藏停车泊位列表行的「审批」按钮。
- 页面：`zhi2-web-admin/src/views/benefit/parkingSpace/index.vue`，按钮原定义在 :176-186（`label: '审批'`）。
- 回写地址：`http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6939`，用户要求改完后回写并附实机截图。
- 用户下达的任务仅为一句「列表上把审核按钮隐藏，做完回写禅道」。

## 修改内容
- 删除列表「审批」按钮定义，并删除因此变成孤儿的业务禁用函数 `isApproveDisabled`（原 :127-131）。
- 保留审批弹窗与处理方法（`handleApproval`），便于业务逻辑完善后恢复；核查确认无其他审批入口。
- 改前基线 build 与改后 build 均 exit 0（8 天前的缓存构建作废，重新跑了新基线）。

## 处理状态
- 2026-11-24 代码改动已完成，但实机 UI 未验证：改后 build 刚结束即触发 P0 成本硬交接，尚未导航到停车泊位页截图，非功能失败。
- 剩余待办：实机截图 → 用户确认 → 提交 → 回写禅道 6939（附图）→ 清理产物，已移交接续会话（hop1/10）。


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6939",
  "source_extraction_id": "a71d7dc63d8749c498469bcf355b2ab7",
  "version": 1,
  "memory_type": "entities"
}
-->