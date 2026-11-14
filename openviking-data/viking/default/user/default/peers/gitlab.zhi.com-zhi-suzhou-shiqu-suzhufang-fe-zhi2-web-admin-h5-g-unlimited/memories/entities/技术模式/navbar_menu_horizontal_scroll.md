# Navbar 菜单横向全量展示与滚动
苏住房（zhi2-web-admin）任务 2468 把顶部 Navbar 菜单改为按账号权限全量横向展示，溢出时提供左右滚动箭头。

## 需求与实现
- 任务 2468：菜单按账号权限全量横向展示，溢出时提供左右滚动箭头。
- 改动文件：zhi2-web-admin/src/layout/components/Navbar.vue。
- 保留原有菜单跳转与激活状态；处理尺寸变化、激活项滚入视口、组件卸载时的监听清理。
- 另补卸载前仍在 `$nextTick` 队列中的防护，避免组件销毁后再排队动画帧。

## 提交与验证（2026-11-14）
- 子模块提交 `b48629cd4`，已推送至远端 `develop/v2.6.2-suzhufang`。
- 父仓提交 `73b9524`（`73b95241`）同步推送同分支；父仓原有工作区改动未纳入提交。
- Navbar 单文件 ESLint 通过；test 模式构建（含基线构建）通过；`public/version.json` 中 `gitHash=b48629cd4` 与子模块提交 SHA 一致。
- 本地 nginx 页面与登录态不可用，真实视口截图与交互验收未执行。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "navbar_menu_horizontal_scroll",
  "source_extraction_id": "59f9e8de80a34feb8db67d15bd1689e2",
  "version": 1,
  "memory_type": "entities"
}
-->