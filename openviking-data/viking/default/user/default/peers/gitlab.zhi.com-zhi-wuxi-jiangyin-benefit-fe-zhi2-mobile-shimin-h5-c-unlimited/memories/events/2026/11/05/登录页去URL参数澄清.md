# Summary
2026-11-05，用户指出代码已不再从 URL 读取参数、之前写死了 Option 值，纠正了助手关于登录页读参的假设；助手核实登录页 src/pages/login/index.vue 已改为账号密码+图形验证码表单，但 src/main.ts 第26行与 src/http/interceptor.ts 第52行仍残留对 token 的 URL 读取。
# 2026-11-05 (Thursday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-wuxi-jiangyin-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: 我记得代码里面已经没有从url读参数的逻辑，之前写死了一个Option的值
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-jiangyin-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: 你说得对，我上轮的判断需要修正。核对代码后的事实：

## 代码现状（已核实）

1. **登录页 [src/pages/login/index.vue](src/pages/login/index.vue) 完全不读任何 URL 参数**
   - 它已是**账号密码 + 图形验证码**表单（`phone / password / imageCode`），`onLoad` 只调 `refreshCaptcha()`
   - 全文无 `getQueryParam`、无 `option`、无 `decodeURIComponent`
   - 仓库最新提交 `0b1614c fix(login): 替换密码登录接口并接入图形验证码`、`047d98f/21eaa63 ...` 也印证了登录页已改成密码登录

2. **但 URL 参数读取逻辑并没有被删干净，还留在两处**
   - [src/main.ts](src/main.ts) 第 26 行：`const initToken = getQueryParam('token')`
   - [src/http/interceptor.ts](src/http/interceptor.ts) 第 52 行：`token = getQueryParam('token') || ''`
   - 二者都走到 [src/utils/url.ts](src/utils/url.ts) 第 12 行的 `decodeURIComponent(value)`

所以“登录页不读参数”成立，但“代码里已经没有从 URL 读参数”不完全成立——**全局层面还残留对 `token` 的 URL 读取**。这也是为什么我上轮会往 `URIError` 方向猜。

## 这对当前报错意味着什么（修正结论）

- 栈里那段 `replace`（换算命中 vue-router `encodeParam`/`decode`）属于 **uni-app 内部/H5 路由**，不一定是业务代码在 `decodeURIComponent`
- 更可能的触发链变成了：**登录页 `onLoad` → `refreshCaptcha()` → `getPicture()` 请求**，请求经过 [src/http/interceptor.ts](src/http/interceptor.ts) 装 token/拼 URL，然后在 H5 环境里走到 URL 编解码那段
- 也就是说：**你截图里那条红错误，很可能是验证码接口 `getPicture()` 请求失败/抛错**，而不是登录页解码参数抛错

## 请确认一个关键点，好把方向定死

现在有两条互斥的路径，取决于你这次打开的是哪个环境/入口，直接决定我往哪查：

<!-- MEMORY_FIELDS
{
  "event_name": "登录页去URL参数澄清",
  "goal": "澄清代码逻辑",
  "summary": "2026-11-05，用户指出代码已不再从 URL 读取参数、之前写死了 Option 值，纠正了助手关于登录页读参的假设；助手核实登录页 src/pages/login/index.vue 已改为账号密码+图形验证码表单，但 src/main.ts 第26行与 src/http/interceptor.ts 第52行仍残留对 token 的 URL 读取。",
  "ranges": "12,22",
  "source_extraction_id": "27d572e1d43a4544826efeb0c0711395",
  "version": 1,
  "memory_type": "events"
}
-->