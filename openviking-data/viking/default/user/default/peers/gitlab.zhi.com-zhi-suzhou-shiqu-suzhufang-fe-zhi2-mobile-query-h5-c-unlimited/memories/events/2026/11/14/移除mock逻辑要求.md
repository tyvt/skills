# Summary
2026-11-14，用户反馈苏住房防汛C端移动查询H5更新后401拦截未生效，要求移除所有mock逻辑。助理排查发现环境变量未定义时默认进入demo可跳过登录请求、门户数据层吞掉含401的异常、App.vue将部分401文案当成有效登录，且防汛seed、物业自查seed、门户demo seed三类路径继续产出假数据。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 为什么我更新了还是没有401拦截的生效，把所有mock逻辑都移除。
http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.test.zhi.com/

<!-- MEMORY_FIELDS
{
  "event_name": "移除mock逻辑要求",
  "goal": "响应移除mock诉求",
  "summary": "2026-11-14，用户反馈苏住房防汛C端移动查询H5更新后401拦截未生效，要求移除所有mock逻辑。助理排查发现环境变量未定义时默认进入demo可跳过登录请求、门户数据层吞掉含401的异常、App.vue将部分401文案当成有效登录，且防汛seed、物业自查seed、门户demo seed三类路径继续产出假数据。",
  "ranges": "0",
  "source_extraction_id": "2b189ef1ff8f403d8155af59e2fd2cf2",
  "version": 1,
  "memory_type": "events"
}
-->