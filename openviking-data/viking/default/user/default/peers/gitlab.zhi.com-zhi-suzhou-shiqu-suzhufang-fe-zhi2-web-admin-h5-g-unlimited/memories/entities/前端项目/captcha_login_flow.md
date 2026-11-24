# 苏住房G 登录验证码流程
苏住房G 后台（localhost:8101）登录需账号、密码与算术题图形验证码，以下是实机自动化的可靠做法。

## Captcha Handling
- Captcha is an arithmetic-question image (e.g. "9+6=?"), returned by the API and the DOM as a base64 data URL; actual bytes may be JPEG (ff d8 ff) rather than the declared GIF/PNG.
- Dedicated OCR/arithmetic scripts misread it several times; the reliable way is to take the data URL from the DOM, decode it to an image, and read it with the vision model.
- Failing login or clicking refresh issues a new captcha, so capture the image again before filling; do not trigger a refresh after filling.

## Login Troubleshooting
- In PowerShell, unquoted `@eN` selectors are treated as splats and nothing gets filled; selectors must be quoted.
- After login the token lives in sessionStorage, and the navigation menu is driven by the backend SYS_MENU, so account permissions decide whether a target route exists.

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "前端项目",
  "name": "captcha_login_flow",
  "source_extraction_id": "b264f29f13c442be959a7c52d1304e4d",
  "version": 1,
  "memory_type": "entities"
}
-->