# 同站门户跳转缺陷（返回首页）
顶栏「返回首页」跳同站点门户时，因使用 window.location.href 导致浏览器视为同页导航，表现为后退/无反应，需改用 replace 并同址时 reload。

## 现象
- 用户点击「返回首页」后仅浏览器后退，未重定向到配置的门户地址
- 门户地址与当前访问地址同站点（如 unlimited.g.h5.admin.web）时必现

## 根因
- 原实现 `window.location.href = url` 在同站同址时被浏览器当作同页导航，地址栏不变、历史被压掉
- 配置地址与当前地址相同（去 hash 后）时再次 assign 同样 URL 不会重新初始化

## 修复方案
- 改用 `window.location.replace(target)` 强制整页重定向且不留历史记录
- 先去掉 hash 再比较目标与当前地址，避免同页不同锚点误判
- 去 hash 后地址相同则直接 `location.reload()` 强制刷新
- 取不到配置值回退管理端 `/index`，按钮不无响应
- 门户地址配在系统参数设置，由后台库维护，前端只读；dev 即刻生效，dev/test 服务器需重新构建发布

## 涉及文件与验证
- 文件：Navbar.vue、src/api/system/config.js、detail.vue、env/.env.production
- 来源会话：session-2e06934c-aa3c-4834-aec0-4710dafa1929（基线 c5d74f4）
- 用户诉求：参数设置加门户地址、点击无效、需直接重定向

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "home_samesite_bug",
  "source_extraction_id": "12244aba6c2143ed925def5f8c54b8d0",
  "version": 1,
  "memory_type": "entities"
}
-->