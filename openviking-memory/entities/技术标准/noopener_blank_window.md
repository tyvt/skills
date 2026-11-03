# window.open 中 noopener 导致子窗口空白
在 `window.open` 中使用 `noopener,noreferrer` 会使父页面丢失对子窗口的引用，导致无法重定向并出现空白页。

## 根因
- `window.open` 使用 `noopener,noreferrer` 会消除父窗口对子窗口的引用。
- 父窗口无法重写子窗口的 `location`，导致空白页。

## 已应用解决方案
- 移除 `noopener,noreferrer` 并设置 `newWindow.opener = null` 以解除关联。
- 使用 `location.replace(url)` 进行重定向并显示等待状态。

## 涉及文件
- `src/views/sso/bTerminalRedirect/index.vue`
- `src/layout/components/Sidebar/RecursiveMenu.vue`
- `src/store/modules/permission.js`
- `src/api/security/oauth2.js`

## 验证与来源
- 项目：惠山二期G
- 证据：`src=惠山二期G/010.md`
- 来源会话：`7ffb3be2-f8de-4608-8768-cc04a3088249`
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术标准",
  "name": "noopener_blank_window",
  "source_extraction_id": "464c23bf42f948218393bef99c8b49b5",
  "version": 2,
  "memory_type": "entities"
}
-->