# 003 候选（去重后）

## 1
title: Playwright 别在接口已返回后再 waitForResponse 等同一请求：白等满超时才被 catch 吞掉
type: bug
content: 详情页"进入后长时间空等"的实测根因——详情接口已 resolve 并渲染完成后，用例仍去 `page.waitForResponse(证书列表接口)` 等一个**已经发完**的请求，Playwright 只能等满默认 30s 超时，随后被 `.catch(()=>{})` 静默吞掉，表现为"能用但慢 30s"，不报错。
为什么难发现：超时异常被 catch 吞了，日志里只有耗时异常，没有失败态。
怎么做：① 一个用例里每个请求只监听一次，监听必须写在触发动作**之前**；② 后续就绪判断一律改 UI 状态驱动 —— `expect.poll` 等 `.el-loading-mask` 消失、等区块标题/表格可见；③ 把"接口 200 → loading 消失 → 关键字段可见 → 子区块就绪"合并成一个 gotoXxxDetail 就绪函数。
效果：证书 CRUD 用例 39s→8s，全流程 53s→21s，且全程无 waitForTimeout。
files: e2e/*certificate*.spec.js, e2e/fixtures
baseline: 62d5fb9

## 2
title: 注册类全流程 E2E 的三处必改：唯一手机号、验证码从 Vue 状态读、附件配置缺失要显式报阻塞
type: workflow
content: 用真实接口跑注册全链路（saveCompanyRegister → saveLegalPersonInfo → 附件配置 → 上传 → 提交）时，三条固定要处理：
1) 手机号必须每次唯一（用时间戳/序号拼接），写死 `13800000000` 第二次就撞"该手机号已注册"，用例变成假失败；
2) 图形验证码要等页面加载完后从 Vue 实例/页面状态里读 `/code` 的答案再填，不要在提交前再 waitForResponse 等 /code —— 请求早已完成，只会在超时后才 catch；
3) 附件区依赖后端「附件分类配置」(fjflpz) 按 busCode 下发的配置，`listByBusCode` 返回空数组时页面显示"暂无附件配置"、"下一步"永远不可点。这是**数据阻塞不是代码 bug**，正确做法是新增一条"接口探测"用例单独断言返回非空，并把缺失的 busCode + 需要的配置编码清单明确报给用户，而不是改前端去绕。
配套：白名单要按链路顺次补齐（本链路 saveDraft / editAndSubmit / /file/appendix/upload）。
files: src/views/register/companyRegister.vue, e2e/real-api.spec.js, src/components/AnnexUpload/index.vue
baseline: 39e3114

## 3
title: 同一份 E2E 用 PLAYWRIGHT_LOGIN_TYPE 切管理端/企业端，做不到的用例 test.skip 并写明原因
type: pattern
content: 一套 ToB 用例要同时覆盖"管理端(zsbase)"和"企业端真实账号"时，不要在用例里写 if 分支，而是用 e2e/.env.e2e 里的 `PLAYWRIGHT_LOGIN_TYPE`（account / company）切换登录夹具，同一份 spec 出两套结果。
账号权限差异导致的用例（企业端才有的变更保存、审核流程、新增成功后的编辑/删除）在管理端模式下 `test.skip`，并在报告里单列"跳过原因"，把 passed 与 skipped 分开报，不能算进"通过"。
好处：一套脚本两种用途（冒烟/全流程），不会因为切账号就整批红。
files: e2e/.env.e2e, e2e/fixtures
baseline: 5169909
