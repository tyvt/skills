# dev server端口占用切换致后台进程漏检
苏州市房地产监测V3 中 dev server 启动遇 8081 占用自动切 8082，仅查 8081 漏检遗留后台任务，失败通知为进程终止假象。

## 问题根因
- dev server 启动遇 8081 占用时自动切换至 8082
- 仅检查 8081 端口导致漏检遗留后台任务
- 失败通知表现为进程终止假象而非真实错误

## 修复方案
- 核实 8081/8082 均无监听后再清理
- 后续仅改代码与 ESLint 静态检查，不启动服务

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/008.md
- 涉及文件：预售许可申请与审批-前端联调接口文档.md、前端技术信息.md、package.json、playwright.config.js、entrustSale/index.vue、listMixins.js、table.js、entrustSale/detail.vue
- 来源会话：71671db1-512d-4d06-a04b-0ee4f5005999；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "port_switch_leak",
  "source_extraction_id": "c7f6eb576e6d4f86af40444cea8581f7",
  "version": 1,
  "memory_type": "entities"
}
-->