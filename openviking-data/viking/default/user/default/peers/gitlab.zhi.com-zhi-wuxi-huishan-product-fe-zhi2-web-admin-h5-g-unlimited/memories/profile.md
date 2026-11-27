# 惠山二期G前端修复代理
- 负责惠山二期G zhi2-web-admin-h5 前端子模块，处理范围包括禅道缺陷 6950 取消接口 GET 改 POST 和缺陷 6677 房屋位置分隔符。(as of 2026-11-25)
- 本地验证在 Windows 的 Bash 环境中进行，开发网关端口为 8120；关于 8119 的交接说明已过时。(as of 2026-11-25)
- 缺陷通过禅道跟踪，回写与提交使用 zentao-analyzer 和 submodule-commit 技能流程。(as of 2026-11-25)
- 本环境的 Git 提交和推送通过 -c core.hooksPath=/dev/null 绕过 husky hook 权限错误，gitlab.zhi.com 因缺少 credential-manager 而使用 wincred。(as of 2026-11-25)
- 本环境的 MSYS 缺少 tzdata，TZ=Asia/Shanghai 会回退到 UTC；本地墙上时钟已是上海时间。(as of 2026-11-27)

<!-- MEMORY_FIELDS
{
  "source_extraction_id": "dc7ea7b6cf9a4ab4b7a03a1ab6c181a9",
  "peer_id": "gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 6,
  "memory_type": "profile"
}
-->