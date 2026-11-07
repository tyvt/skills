# 叶子菜单等待改用网络空闲加最短停留
E2E 中将固定 waitForTimeout 改为网络空闲加最短停留的辅助函数，兼顾测试速度与稳定。
## 问题现象
- 原固定 waitForTimeout(LEAF_STAY_DURATION) 等待叶子菜单页面，长轮询场景易死等或等待不足。
## 解决方案
- 改用辅助函数 waitForLeafPageReady(page)：page.waitForLoadState('networkidle', {timeout: 2000}) 超时即继续，空闲后补足 LEAF_MIN_STAY_MS(300ms)。
- 避免长轮询死等，兼顾测试速度与稳定。
## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 来源会话：8bbe895d-24e5-4f01-b744-724914d60196
- 验证证据：会话 8bbe895d-24e5-4f01-b744-724914d60196 改叶子菜单等待策略。
- 涉及文件：navbar-sidebar-accessibility.spec.js、@zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "leaf_menu_wait_idle",
  "source_extraction_id": "e2f835fecd3341d79c672dd1cc9b7a31",
  "version": 1,
  "memory_type": "entities"
}
-->