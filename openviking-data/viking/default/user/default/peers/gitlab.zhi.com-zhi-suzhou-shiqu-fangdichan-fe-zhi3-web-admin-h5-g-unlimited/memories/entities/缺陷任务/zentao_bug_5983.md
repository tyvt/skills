# 禅道Bug 5983 Navbar返回首页
Navbar「返回首页」按钮点击落回本系统待办而非门户首页的缺陷任务。

## 根因
- 9002 测试服务器部署旧构建 282f1ce（早于修复提交 01861fe87），其 goHome 仅 pushDefaultIndex()
- 源码 HEAD(ad2319ce4) 已正确读取 sys.portal.index.url 整页跳转门户（9002 后端返回 http://58.210.252.230:9001/#/index），须重新发布 9002 生效

## 修复方案
- 源码已修复：读取 sys.portal.index.url 整页跳转门户

## 验证与交付
- 2026-11-03 助手本地构建 nginx 8098 验证新 bundle 含修复
- 用户自行发布 9002 生效

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_5983",
  "source_extraction_id": "38eac9a37d954bfca6e3c6b80c3dec62",
  "version": 1,
  "memory_type": "entities"
}
-->