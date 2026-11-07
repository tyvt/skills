# 禅道Bug 6099 银行名单筛选返回后列表暂无数据
房产管理系统zhi2-web-admin预售资金监管银行名单页，按银行名称筛选后进入详情返回，列表变暂无数据但筛选条件仍在。

## 根因
- AppMain 无 keep-alive，从详情返回会重建列表页
- superviseBank/index.vue 的 init() 立即调 getList()，而 CBYH_BANK_NAME 字典是异步加载的
- listMixins 缓存的 bankName 实际是下拉的 dictValue（银行代码）；字典未就绪时 getQueryParams() 转不成 dictLabel，接口按错误条件查返回空；getList 开头还会清空 tableData
- 与 docs/frontend/common-errors.md E-030 根因一致

## 修复方案
- superviseBank/index.vue 覆写 init()：字典加载完再 getList()，新增 resolveBankNameForQuery，筛选项 valueKey 改 dictValue
- cbyh/index.vue 同上修复（银行管理列表同类问题一并修）
- 分支 develop/v3.0.0（子模块）

## 验证与交付
- eslint 两文件通过；npm run build 通过（buildTime 2026/11/3 15:43:42），产物含 resolveBankNameForQuery（如 dist/assets/superviseBank-B2VzczK2.js）
- 未做：客测环境「筛选→查看→返回」真机联调（用户选择暂不回写禅道）
- 2026-11-03 本地联调：启动 common-framework(9211)、zhi3-prefund(9214)，编写 Playwright 用例验证「筛选→查看→返回」；银行名单详情入口为「银行名称」链接而非行内「查看」按钮；POST /code 返回明文验证码
- 子模块提交 afe108a02（修复）、739337329（version.json）推送 develop/v3.0.0
- 父仓库提交 7f501de（gitlink + E-030 文档）推送 develop/v3.0.0
- worktree D:/repository/zhi2-web-admin-wt-bug6099 已删除并 worktree prune；nginx -s reload 因配置路径未成功需手动 reload

## 禅道回写
- 联调通过后用户确认，再回写 status=resolved/resolution=fixed，resolvedBy=tiany，assignedTo=zhunan

<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6099",
  "source_extraction_id": "38eac9a37d954bfca6e3c6b80c3dec62",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->