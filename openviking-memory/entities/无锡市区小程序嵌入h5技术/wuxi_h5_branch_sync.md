# 无锡H5主仓与子模块成对同步
无锡市区小程序嵌入 H5 采用 superproject + 子模块 zhi2-mobile-admin-h5-c-unlimited 结构，功能改动需主仓与子模块成对同步并提交打 tag。

## 分支对应关系
- 子模块 dev_wuxi-sfb 与主仓 main-sfb 成对关联，子模块 dev_shiqu 与主仓 main 成对关联
- dev-shiqu/main 与 dev_wuxi-sfb/main-sfb 成对关联，功能改动需两边同步
- 示例改动：移除 appStore 字典缓存（common.js getDict 直请求、app.js 删 dictList/hasDict/setDict）需两边同步

## 提交与打 tag 流程
- 子模块分别在 dev_wuxi-sfb、dev_shiqu 提交并 push
- 主仓分别在 main-sfb、main 更新子模块指针并 push
- 子模块 tag 格式 `YYYYMMDDHHmm`（如 202608130950）
- 主仓 main 同号、main-sfb 加后缀 `-sfb`（如 202608130950-sfb）

## 收尾与验证
- 改完确认工作区干净、当前分支回到日常开发分支（如 main-sfb/dev_wuxi-sfb）
- 移除字典缓存后若文案仍旧，提示清浏览器缓存
- 验证证据：会话 378a4abe 确认主子模块关联、-sfb 结尾、同步修改移除字典缓存逻辑并打 tag

## 归属
- 涉及文件：src/api/common.js、src/store/app.js、.gitmodules
- 所属项目：无锡市区小程序嵌入H5；来源会话：378a4abe-e108-4e8b-bf35-150005792150；代码基线：86395e1

## 具体实例（会话 73e008e0）
- 子模块 dev_wuxi-sfb 提交 fb8019a 须 cherry-pick 至 dev_shiqu 生成 725d15f
- 主仓库 main-sfb 与 main 分别指向对应子模块提交并打 tag 202608131440-sfb 与 202608131440，main-sfb 子模块指向须修正为 fb8019a
- 验证证据：src=无锡市区小程序嵌入H5/007.md；来源会话：73e008e0-9dd9-46de-b9f7-c3c8d2356bbe
- 涉及文件：src/api/repair.js、src/pages_benefit/fundPublicity、src/store/repair.js、src/pages/index/newHome.vue 等

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5


<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "wuxi_h5_branch_sync",
  "source_extraction_id": "b80256ade33b49b08266da7f93d995da",
  "version": 2,
  "memory_type": "entities"
}
-->
