# 顶栏侧栏E2E登录与默认激活
navbar-sidebar-accessibility.spec.js 遍历顶栏与侧栏所有叶子路由前，须确认登录态与 navbar-root，并注意系统默认激活第一个顶栏。

## 现象
- 登录未成功时 getByTestId('navbar-root') 一直不可见，视频停在登录页。
- 默认进入后激活第一个顶栏菜单，若未先切换顶栏就遍历侧栏，会出现第一个顶栏目录重复点击或误判 navbar 切换失败（如「项目楼盘」与「物业管理」混在一起）。

## 根因
- 产品默认进入后激活第一个顶栏菜单，侧栏仍是上一顶栏的菜单。
- 登录态未校验导致后续断言全部失败。

## 解决方案
- 登录后 `expect(page).not.toHaveURL(/#\/login/)` 并等待 navbar-root、sidebar-root。
- 遍历每个顶栏前先点击对应 navbar 项并等待侧栏树更新；对「更多」里的顶栏目录单独处理。
- 单叶子失败记入 uiErrorRecords 继续跑；用户要求叶子/目录点击间隔约 1s 便于录屏排查。

## 涉及信息
- 涉及文件：zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js
- 所属项目：2-0；来源会话：fe1c5dc1-f6ad-4637-84a8-bda2ca44dffb, 5af92aab-06ab-48cb-be81-b133e170a41b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "e2e_navbar_login",
  "source_extraction_id": "1001facf978947c0afeaf5611beb1e05",
  "version": 1,
  "memory_type": "entities"
}
-->