# SSO新窗口跳转修复
惠山二期G 后台 SSO B端授权页通过新窗口打开跳转的缺陷修复。

## 问题根因
- 原代码 window.open('about:blank', '_blank', 'noopener,noreferrer')，加 noopener 后父页面拿不到新窗口引用（newWindow 为 null），空白页停在 about:blank；手动点击链接正常。

## 修复方案
- 去掉 noopener,noreferrer，保留对子窗口的跳转控制权
- 跳转前设置 newWindow.opener = null，断开与原页面关联
- 用 location.replace(url) 替代 location.href，避免多余历史记录
- 等待期间在新窗口显示「正在跳转，请稍候...」

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/sso/bTerminalRedirect/index.vue、src/views/sso、src/layout/components/Sidebar/RecursiveMenu.vue、src/store/modules/permission.js
- 所属项目：惠山二期G；来源会话：7ffb3be2-f8de-4608-8768-cc04a3088249；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "sso_window_fix",
  "source_extraction_id": "d00549ef770e4e9a930b1734bf53a230",
  "version": 1,
  "memory_type": "entities"
}
-->