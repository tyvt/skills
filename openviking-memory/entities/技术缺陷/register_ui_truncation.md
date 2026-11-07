# 机构注册第二步页面UI截断：定高+内层滚动双重锁死
苏住房G 机构注册第 2 步「完善机构信息」在「法定代表人/负责人」附近被裁切，下方按钮区留大片空白，根因是 .content-wrap 固定高度与 .form-wrap1 内层 overflow-y:auto 叠加。

## 现象与根因
- 机构注册第 2 步在「法定代表人/负责人」附近被裁切，下方按钮区却留大片空白；用户确认「可以点了 但是页面 UI 截断了」
- .content-wrap 写固定高度 height: calc(100% - 180px) 锁死整块内容区；.form-wrap1 又写 overflow-y: auto 在定高父容器内形成内部滚动区
- 表单超出部分不可见，外层仍按 100% 占位，故底部空白与中部裁切同时出现；两层叠加只改一层无效

## 解法
- .register-wrap 改 min-height: 100vh 让页面随内容自然撑开
- 删掉 .content-wrap 固定 height；删掉 .form-wrap1 的 overflow-y: auto，改由整页滚动
- 给 .content-wrap 补 padding-bottom: 100px，避免底部 fixed 按钮栏压住最后几个字段

## 与已知区分及验证
- 397/644/693/670 是详情页 detail-container/detail-from-container 的滚动所有权与 calc(100vh - Npx) 口径问题；本条是注册独立页（不在 app-main 布局内），根因是「定高父 + 内层滚动」而非 vh 常量算错，裁切伴底部空白且必须补 padding-bottom 让开固定提交栏
- 验证证据：会话 c7ab501f「可以点击了 但是页面UI截断了」→ content-wrap 的 height: calc(100% - 180px) 与 .form-wrap1 的 overflow-y:auto 叠加导致裁切；改为 min-height:100vh + 去定高 + 去内层滚动 + padding-bottom:100px
- 涉及文件：d:\repository\苏住房G\zhi2-web-admin\src\views\register\companyRegister.vue；register\components\companyInfo.vue；register\components\accountInfo.vue
- 所属项目：苏住房G；来源会话ID：c7ab501f-d841-4b86-85f5-4abc8de685fc；代码基线：805ea8c

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "register_ui_truncation",
  "source_extraction_id": "397984d9306b4d00ab495e7e01753845",
  "version": 1,
  "memory_type": "entities"
}
-->
