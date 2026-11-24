# 苏住房防汛C端H5 验证码登录与实机登录要点
苏住房防汛C端H5（zhi2-mobile-query-h5-c-unlimited）在真实接口下的短信与图形验证码登录流程，以及用 agent-browser 实机登录反复踩到的坑。

## 登录流程（verify 模式）
- 需图形验证码：`portal/appLogin/captcha` 返回 uuid + 图片（4 位），页面挂载即拉取且强制
- 再传 phone + 证件号后几位（idNumberSuffix），最后 SMS 验证码
- 用户曾提供 SMS 码 `123456`，但缺 phone 与 idNumberSuffix 无法登录
- 登录为短信三重校验，无头环境无法拿 token，故无法由助手直接拉真实数据

## 实机登录（agent-browser）要点
- 新浏览器会话 localStorage 无 token，列表页只显示空态「暂无求援记录」，需按交接文档第 7 节重新登录
- 图形验证码仍强制：2026-11-24 实机出现算式「9-0=?」（答案 9）、「7+6=?」（答案 13）、「4+5=?」（答案 9）；图片常较小模糊，需裁剪放大精读
- 验证码输入框必须用 type 键入，不能用 fill（uni-app v-model 不响应 fill）
- 标签页若被替换为浏览器新标签页（如 MSN），会话与 refs 全失效、token 丢失，需重新导航到站点页再登录
- 登录失败时会停留在登录页、token 未写入，且验证码会刷新、输入框被清空
- 密码框报「位数不能多于16位」时先核对输入框实际值长度；密码框须先清空再 type，避免重复追加
- 登录成功即跳首页（TOKEN_OK）
- 浏览器易被其他自动化任务抢占：2026-11-24 先后出现无锡市惠山住建局维修基金管理系统（zhaiwu.vip）与 ST苏住房智慧物业管理平台 PC 端登录页；localhost 的 token 按 origin 存储不会因此丢失，导航回求援工单页即可
- 反复被外部站点抢占时改用独立命名 session 隔离验证环境
- 列表空态「暂无求援记录」即未登录，需重新完整登录；登录后求援工单列表首条为 QYGD20261123000006

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_h5_captcha_login",
  "source_extraction_id": "f30aaf58dbd94f4bb90809f2ddbfb567",
  "version": 1,
  "memory_type": "entities"
}
-->