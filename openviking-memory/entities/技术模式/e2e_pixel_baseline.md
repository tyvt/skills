# E2E 像素对比失败先判基线过期
E2E 像素对比失败时，先分清是基线过期（页面演进）还是本次改动引入，不盲目换 baseline。

## 判断要点
- 像素基线是历史快照，页面正常演进后基线天然过期
- 尺寸/结构差能对上「页面最近新增 UI」即为基线过期；局部内容/位置偏移更像本次改动引入
- 直接换 baseline 会掩盖真回归

## 做法
- 先量尺寸差并与页面新增 UI 对账，能对上就是基线过期
- 换 baseline 作为独立动作单独提出，不用来掩盖问题
- DOM 断言排在像素对比之前执行，像素卡住仍能拿功能验证结论
- 像素之外跑 npm run build 与 ESLint 兜底
- 基线确认过期时改请用户在真实环境手工点验（1920 宽、已登录、有菜单权限）

## 验证证据
- 会话 session-8f03a474-c1ad-4a51-ab3e-9f85f59280fb（基线 f36e340）像素对比 size_mismatch：baseline 1919×1246、actual 1919×1258
- 差异因 actual 多「区域 Tab + 当前数据统计周期」等 UI，与本次热区 CSS 无直接关系
- 热区 DOM 断言（3 个 .kd__value 在 .kd__metric-main--clickable 内）在像素对比前通过

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_pixel_baseline",
  "source_extraction_id": "155efbc385c642a1986bf21689227a2b",
  "version": 1,
  "memory_type": "entities"
}
-->