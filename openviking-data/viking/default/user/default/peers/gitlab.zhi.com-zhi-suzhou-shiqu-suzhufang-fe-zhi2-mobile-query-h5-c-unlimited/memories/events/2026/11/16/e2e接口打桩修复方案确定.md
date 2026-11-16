# Summary
2026-11-16，确定最小修法：在 e2e spec 内用 Playwright route mock 按设计稿值打桩 4 个数据接口加 region/list 共 5 个接口，不修改生产代码与 .env.test；同时把 chips 首项文案与高亮改为「全市数据」并补上「更多」纯图标按钮，满意度占比回填时补「%」。
# 2026-11-16 (Monday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 对照HTML完善数智页面，UI用e2e测试，需要100%还原
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 核心结论成型：`.env.test` 已在 dd46bd3 切为 remote 真实接口 → 无登录态 401 → 页面数值全「—」（该失败先于本次改动已存在）。最小修法是在 e2e spec 内用 Playwright route mock 把 4 个数据接口 + region/list 按设计稿值打桩（不动生产代码、不动 .env.test）。先取证请求封装格式与 RegionItem 结构：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 数据链路事实齐了。最后两个小事实：request 响应封装格式 + index.html 是否声明 Material Symbols 字体：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 字体已确认无风险（index.html:2 已声明两套 gfonts）。现在修两处差异根因。先从参考稿提取「更多」按钮精确 HTML 与「满意度占比」值节点结构：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 修复方案落地：① chips 首项与高亮改「全市数据」并补「更多」钮；② e2e 内 route mock 5 个接口按设计稿值返回（不动 .env.test 生产配置）；③ 满意度占比回填补 %。先取「更多」钮完整 HTML：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 区段越界（sec0 总长 2122）。修正长度后重取：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 「更多」钮 HTML 已拿到。现在补齐最后的接口语义事实（satisfactionRate 格式），然后一次性实施：

<!-- MEMORY_FIELDS
{
  "event_name": "e2e接口打桩修复方案确定",
  "goal": "确定最小修复方案",
  "summary": "2026-11-16，确定最小修法：在 e2e spec 内用 Playwright route mock 按设计稿值打桩 4 个数据接口加 region/list 共 5 个接口，不修改生产代码与 .env.test；同时把 chips 首项文案与高亮改为「全市数据」并补上「更多」纯图标按钮，满意度占比回填时补「%」。",
  "ranges": "0,140-158",
  "source_extraction_id": "6138828c21f343448d40413458bbf858",
  "version": 1,
  "memory_type": "events"
}
-->