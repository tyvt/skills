# 菜单图标 E2E 覆盖率阻塞
苏住房G 前端在把 E2E 覆盖率从 92.491% 追到 99.5% 的过程中，因 mock 数据缺少 `SYS_MENU.PICTURE` 字段而无法验证 `meta.icon` 优先级调整。

## 当前状态
- 2026-11-15 记录的最终 E2E 覆盖率为 92.491%
- 2026-11-15 正式 E2E 确认 105% 背景候选总分 92.707%，滚动箭头与空权限检查通过，仍低于 99.5%；将汇报总体与排除图标区域分数供下一步决策
- 1366×768 视口溢出检查已通过
- 空权限检查已通过
- 调整 `meta.icon` 优先级后 mock 截图未发生变化

## 根因
- mock 数据中没有 `SYS_MENU.PICTURE` 字段，图标相关逻辑在 mock 环境下不生效
- 要验证图标优先级需能读取真实 `SYS_MENU.PICTURE` 的图片地址或图片文件

## 后续处理
- 决定恢复基线配置，避免无效改动影响覆盖率
- 继续冲刺 99.5% 覆盖率的前置条件：提供真实菜单图片地址或文件
- 该问题属于前端 E2E 覆盖率优化的已知阻塞点

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "menu_icon_e2e",
  "source_extraction_id": "0b5ad0f130734f70beb74e1a84e1b03a",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->