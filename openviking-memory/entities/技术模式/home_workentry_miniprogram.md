# 首页工作端小程序跳转
home.vue 的 handleWorkEntry 通过 weixin-js-sdk 跳转至工作端小程序，含环境校验。

## 实现方式
- 引入 `weixin-js-sdk`：`import wx from "weixin-js-sdk"`
- 新增常量 `WORK_MINI_PROGRAM_PATH = "pages/home/index/index"` 与 `WORK_MINI_PROGRAM_APP_ID = import.meta.env.VITE_WORK_MINI_PROGRAM_APP_ID || ""`
- `handleWorkEntry` 由原 toast 改为实际跳转：仅 H5 下执行，先判微信环境（MicroMessenger），再判是否配置工作端小程序 appId，通过 `wx.miniProgram.getEnv` 判断可跳转环境，调用 `wx.miniProgram.navigateTo({ url: "/pages/home/index/index" })`
- 失败场景补充错误提示与日志；非 H5 端给出“不支持”提示
- 已检查该文件 lint，无新增报错

## 涉及文件
- `zhi2-mobile-admin-h5-c-unlimited/src/pages/index/home.vue`
- `package.json`（环境变量 `VITE_WORK_MINI_PROGRAM_APP_ID` 需补充配置）

## 验证与归属
- 所属项目：i淮安公版（zhi2-mobile-admin-h5-c-unlimited）
- 验证证据：extracted source=cursor
- 来源会话ID：64986899-a25f-4e59-87dc-d9adc4405920
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_workentry_miniprogram",
  "source_extraction_id": "fa56ecd6fed44c1abcdb9a9d83b3c2de",
  "version": 2,
  "memory_type": "entities"
}
-->