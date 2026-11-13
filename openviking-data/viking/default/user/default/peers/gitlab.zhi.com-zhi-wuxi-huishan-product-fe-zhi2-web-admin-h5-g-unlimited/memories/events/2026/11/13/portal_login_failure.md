# Summary
On 2026-11-13, the 惠山 dev portal backend was confirmed to throw {"code":1300,"msg":"服务器异常"} on login even with a correct captcha and the verified-correct password ZS001Aa! for account zsbase. The zsbase account exists (status=0, not deleted, LOGIN_DATE 2023-04-06) and belongs to the 门户 system, not 禅道. 惠山 portal Dameng table ZHISHU_PREFUND.T_JG_ALLOT_NOTICE lacks contract fields present in 苏住房 test table ZHISHU_BENEFIT.PUB_ALLOT_NOTICE, suggesting the 惠山 backend did not implement task 2393 server-side.
# 2026-11-13 (Friday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: zsbase
ZS001Aa!
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: 密码 `ZS001Aa!` **确实正确**。所以 `1300` 是后端异常，而不是凭据问题。让我抓取真正的堆栈追踪。
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: 验证码正确、密码正确，但后端抛出 1300 异常——这是惠山 dev 后端自身的服务端错误，不是我的凭据问题。让我确认该后端是否正常。
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: `LOGIN_DATE` 是 2023 年——账号可用，但从未成功登录过这个环境。1300 错误是服务端问题。

由于接口探测被后端故障阻塞，我先把已完成的实质工作交付：**前端缺陷本身已确凿定位，修复方向明确且不依赖接口**。我先落地前端修复（这是可逆、低风险的），然后回写禅道时如实标注后端状态。
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: ...### 数据库层面的重要发现

| 环境 | 表 | 合同字段 |
|---|---|---|
| 惠山（门户 Dameng） | `ZHISHU_PREFUND.T_JG_ALLOT_NOTICE` | **无** `CONTRACT_FLAG`、`HAVE_WITHDRAW_AMOUNT`、`REMAIN_WITHDRAW_AMOUNT`、`REMAIN_EXCLUDE_SELF`，连 `EXPENDITURE_CONTRACT_CODE` 都没有 |
| 苏住房（测试） | `ZHISHU_BENEFIT.PUB_ALLOT_NOTICE` | **有** `CONTRACT_FLAG`、`HAVE_WITHDRAW_AMOUNT` |

→ 惠山后端**很可能未实现** task 2393 的服务端部分。这一点决定了：补上 `noticeAmount` 展示后能否真正显示 500，取决于后端是否返回该字段；而“累计/剩余可用金额”在没有后端字段时，前端**无法根治**。

### 未能完成的验证

1. **接口实测** — 惠山 dev 登录持续返回 `{"code":1300,"msg":"服务器异常"}`。...

<!-- MEMORY_FIELDS
{
  "event_name": "portal_login_failure",
  "goal": "Record backend error",
  "summary": "On 2026-11-13, the 惠山 dev portal backend was confirmed to throw {\"code\":1300,\"msg\":\"服务器异常\"} on login even with a correct captcha and the verified-correct password ZS001Aa! for account zsbase. The zsbase account exists (status=0, not deleted, LOGIN_DATE 2023-04-06) and belongs to the 门户 system, not 禅道. 惠山 portal Dameng table ZHISHU_PREFUND.T_JG_ALLOT_NOTICE lacks contract fields present in 苏住房 test table ZHISHU_BENEFIT.PUB_ALLOT_NOTICE, suggesting the 惠山 backend did not implement task 2393 server-side.",
  "ranges": "0,69,79,83,162-164",
  "source_extraction_id": "deacda6b2c4a4afbbcbafe7be3231424",
  "version": 1,
  "memory_type": "events"
}
-->