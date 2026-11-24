# 8101 手写算式验证码登录
苏住房 zhi2-web-admin 本地 8101 站点登录需破解手写算式验证码（如「0|6=?」），并需把 token 注入浏览器 sessionStorage 才能进业务页。

## 验证码识别
- 8101 登录页为手写算式图片验证码（例：`0|6=?`），需放大后逐字识别再算结果
- 交接的本地 OCR solver 脚本 exit 0 却无任何输出：脚本内 `readFileSync(fd)` 从 stdin 读取的逻辑吞掉回显；改为 stdin 传 base64 同样异常
- 可用替代：直连内网 vision 网关识别图片；网关常只回首字符（如「0」），需放大图 + 简洁 prompt，并配置 4 次重试
- 成功链路：取码→存图→OCR/vision→登录→取 token，失败自动重试

## Token 注入
- CLI 与 MCP 浏览器会话不互通，CLI 拿到的 token 无法直接写进 MCP 浏览器会话
- 改由 MCP eval 在页面上下文写 sessionStorage，再刷新页面让应用读取，即可进入首页
- token 属本地测试环境短期会话凭据，从文件读取并避免回显到会话

## 业务入口
- 业务路由由后端菜单注入，需先 eval 枚举路由再导航；改动文件 `checkRecord/detail.vue` 对应物业自查/街镇/区县/市级检查记录
- 列表记录多为「已备案」只有「查看」；「录入分值」弹窗仅在详情页 `formMode=edit` 的考评项行「编辑」按钮可打开，查看态无入口
- 弹窗内容区可滚动，一次只见一个考评项，需滚动逐项截图取证

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suan_shi_captcha_login",
  "source_extraction_id": "817b2d7dbbbd4063b818e60c463e2046",
  "version": 1,
  "memory_type": "entities"
}
-->