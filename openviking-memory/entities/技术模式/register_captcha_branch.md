# 机构注册验证码分支区分
苏住房G(zhi2-web-admin)机构注册页修复验证码失败提示，区分超时与输错两种场景文案。

## 问题根因
- 上一轮实现中 `isCaptchaError(msg)` 命中后不论输错还是超时，统一弹「图形验证码已超时…」

## 解决方案
- 仅改 `zhi2-web-admin/src/views/register/components/accountInfo.vue` 的 `goNextStep()` 验证码失败分支
- msg 含「超时/过期/失效」→ 弹「图形验证码已超时，已自动刷新，请重新输入」
- 其余（输错等）→ 弹「验证码错误，请重新输入」
- 两种场景均保留：自动刷新验证码图片、清空输入、清除校验红字
- 判定用正向关键词匹配已知超时场景，不依赖后端对"输错"场景措辞

## 验证与归属
- eslint 检查通过，0 错误
- 待真机验证：①过期提交→超时文案 ②输错提交→错误文案(图片自动刷新) ③已注册手机号→原异常提示弹窗且图片不刷新
- 涉及文件：accountInfo.vue、src/utils/request.js、src/api/index.js、package.js
- 所属项目：苏住房G；来源会话：937828b7-6805-47c5-9130-1fe04124d458；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_captcha_branch",
  "source_extraction_id": "fc267760b60448b0969348d7d12b352f",
  "version": 1,
  "memory_type": "entities"
}
-->