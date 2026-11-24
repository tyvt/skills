# zhi3 管理端 H5（8098）验证码登录要点
苏州房产管理端 H5 在 8098 用区县账号实机登录时的接口、验证码流程与反复踩到的坑。

## 登录链路
- 登录接口 `POST /api/v3.0/security/auth/userLogin`，验证码接口 `POST /api/v3.0/code`；HTTP 200 但 body code=500「验证码错误」即验证码不对。
- 提交体携带前端加密后的密码（如 `NE3Cqwy3nFw3Nna6VXxScQ==`）；直接调接口须用前端已加密值，传明文会报「密码格式错误」。
- 验证码为算术式图片（如 `6*9=?`），图片与 uuid 同轮绑定且短时效，识别过久会过期失败。
- 登录成功跳 `http://localhost:8098/#/home/todo`；登录态存于 sessionStorage 的 `Admin-Token`。

## 关键坑
- 手动 `fetch('/code')` 会让后端生成新验证码（uuid=B），页面 img 与前端 uuid 仍是 A，提交 code(X)+uuid(A) 必然失败；禁止手动请求 `/code`，只刷新页面走原生流程。
- 跳 8101 不是链路故障，只是登录失败后的错误跳转；8098 的 `/code` 与 `userLogin` 都正常。
- 填验证码与账号密码须用 MCP fill（触发 Vue 事件），原生 setter 会被忽略。
- 视觉模型多次误读：`6*0=0` 被读成 10，`6*9=?` 中间波浪线实为手写等号；应自己用 read_image 放大判读并不重新请求验证码。
- 本轮实测算式与答案：`6*0=0`、`3+2=5`、`6*9=54`、`3*8=24`、`6+7=13`、`3+3=6`、`8×7=56`。
- 登录态失效时页面会被重定向到登录页，需重新走算术验证码登录；验证码随页面刷新立即更换，旧答案随即失效。
- 截图识别脚本无输出或裁切只切到验证码上沿时，改按页面中验证码图片的实际位置重新截图再识别，不要重新请求验证码。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi3_h5_captcha_login",
  "source_extraction_id": "26ec69cd8b614a4c8ea1e96576b5a8c9",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->