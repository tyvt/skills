# 验证码失败提示分流策略
机构注册页创建账号时，后端图形验证码失败有超时与输错两种语义，需按正向关键词二分分流提示。

## 问题背景
- register/components/accountInfo.vue 的 goNextStep() 中 isCaptchaError(msg) 命中即无条件弹「图形验证码已超时，已自动刷新，请重新输入」
- 用户仅输错一位也被提示超时，误导其反复等待而非重新输入

## 解决方案
- 不按「是否验证码类错误」二分，改按「是否属于已知超时场景」二分
- msg 含「超时/过期/失效」走超时文案（已由截图证实），其余全部落到「验证码错误，请重新输入」
- 两条分支都保留原副作用：自动刷新验证码图片、清空输入、清除校验红字
- 必须验证第三类失败（如手机号已注册）仍走原异常弹窗且不刷新图片，避免误卷进验证码分支

## 验证与归属
- 验证用例：过期→超时文案、输错→错误文案（两者图片都刷新）、已注册→异常提示且图片不动
- 涉及文件：zhi2-web-admin/src/views/register/components/accountInfo.vue、zhi2-web-admin/src/utils/request.js、zhi2-web-admin/src/api/index.js
- 所属项目：苏住房G；来源会话ID：937828b7-6805-47c5-9130-1fe04124d458；代码基线：b0f2039

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "captcha_fail_branch",
  "source_extraction_id": "32afe4ffa6a047739d10dfebe51c072a",
  "version": 1,
  "memory_type": "entities"
}
-->