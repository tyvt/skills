# 房地产监管后台前端模块

zhi3-web-admin-h5-g 中的房地产监管模块，包含监管机构管理、主账户管理、监督开户确认、监管账户四个子模块。

## 模块结构
- 监管机构管理：列表含机构编码、机构名称、统一社会信用代码、行政区划编码、机构类型、负责人。
- 监督开户确认：列表数据含 ZHKH260910002、苏州绿地、云来客栈、福福客栈 等。
- 主账户管理、监管账户为另两个子模块，菜单树中并列展示。

## 路由结构
- 监管机构管理：列表 /regulatorOrg，详情 /regulatorOrg/:tableid，新增跳转 /regulatorOrg/add?formMode=add，正常。
- 主账户管理：列表 /mainAccount，详情 /mainAccount/:tableid（动态段匹配 add），新增正常。
- 监管账户：列表 /regulatoryAccountNew，详情 /regulatoryAccountNew/:tableid，2026-11-03 因 SYS_PROJECT_MENU 缺失关联记录导致路由未注册，已补录修复。
- 监督开户确认（监管协议）：列表 /superviseAgreementNew，详情 /superviseAgreementNew/:tableid，同上修复。

## E2E 测试配置
- 管理员账号（zsbase）密码：`ZS001Aa!`（.env.e2e.example 中的值；初始化 SQL 常量 ZS0001Aa! 已过期）。
- 登录辅助：auth-helpers.js 提供 loginAsAdmin、fetchLoginCaptcha、resolveRoutePath、gotoPageByFilePath。
- E2E 框架：Playwright 1.62.1，含 form-helpers.js 的 pickSelectOption 封装。

## 验证与归属
- 2026-11-02 浏览器 UI 实测四个子模块菜单注册与列表渲染 9/9 通过，新增机构落库成功；2026-11-03 修复 DETAIL_COL_FULL 导入缺失及监管账户与监管协议详情路由未注册问题（SYS_PROJECT_MENU 补录），4 个模块新增流程全部跑通。
- 所属项目：zhi3-web-admin-h5-g。

## 已知缺陷与修复
- 详见独立实体 bug_6084：监管账户开户页「选择开户网点」弹窗分页被滚动遮挡，已记录根因与修复方案。

<!-- MEMORY_FIELDS
{
  "category": "前端项目",
  "name": "zhi3_regulatory_module",
  "source_extraction_id": "03b5685527b446d0aff44fd95352beb5",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 4,
  "memory_type": "entities"
}
-->