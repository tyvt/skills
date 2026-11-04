# UnifiedLogin骨架屏与公告请求解耦
园区物管2.0(zhi2-web-admin)中UnifiedLogin.vue的骨架屏揭开原被非关键公告接口请求硬绑定，修复后改为最长等待2500ms旁路任务。

## 问题根因
- `pageSkeletonVisible` 置 false 原需在 `loadNoticeList()` 中 `await getPublicNotices(...)` 完成（成功/失败均走finally）
- 该请求走 axios 默认 100s 超时；本地 dev 8081 代理后端慢/不可达时请求挂起，整页骨架屏卡住最高100s

## 解决方案
- 引入常量 `SKELETON_MAX_WAIT = 2500`（毫秒）
- 用 `Promise.race([noticeTask, sleep(SKELETON_MAX_WAIT)])` 兜底，到点先揭开骨架屏
- 公告接口真正返回后照常补列表与启动轮播（`startNewsRotation`）
- 保留原「最短展示600ms」防闪屏逻辑

## 验证与归属
- 涉及文件：src/views/home/UnifiedLogin.vue
- 验证：eslint通过；npm run build通过；Playwright模拟接口挂起时骨架~3.4s揭开（修复前会挂到100s）
- 所属项目：zhi2-web-admin（园区物管2.0）；来源会话：2026-11-04调试会话；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_login_skeleton_decouple",
  "source_extraction_id": "4fa7d966907b47b9a7eab84eca0fe1e0",
  "version": 1,
  "memory_type": "entities"
}
-->