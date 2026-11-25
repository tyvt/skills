# 8171 浏览器内联登录
8171 站点的浏览器内验证码识别、填表登录和失败后远程 dev 验证调整。

## 内联登录
- 2026-11-25 8171 改为浏览器内联登录：取码→识图→提交在同一轮完成。
- 2026-11-25 改用视觉识码 + 浏览器内填表登录 8171，再走小区导入成功态截图。
- 验证码必须与页面一致；需在浏览器内对验证码截图并在同页登录。

## 验证调整
- 2026-11-25 8171 登录仍失败；改用截图同款远程 dev 站点验证。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-xiangcheng-wuguan-fe-zhi1-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "8171_inline_login",
  "source_extraction_id": "518c31b423ab4ec3b0236eabbead369d",
  "version": 1,
  "memory_type": "entities"
}
-->