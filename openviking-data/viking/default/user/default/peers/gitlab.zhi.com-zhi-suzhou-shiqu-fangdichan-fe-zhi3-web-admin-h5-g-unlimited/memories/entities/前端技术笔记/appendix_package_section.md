# AppendixPackageSection 附件标准封装组件
园区房产 zhi3-web-admin-h5-g 中用于附件上传与查看的标准封装组件，统一处理查看态与编辑态切换。

## 功能与定位
- 内部已处理查看态（DetailTemplate 或 AppendixEmpty）与编辑态（AnnexUpload）切换，业务页无需写条件分支
- 按目录名全局注册，可直接在页面使用，无需手动 import 组件本体
- 采用 `:bus-code` + `:bus-id` 命名接收业务码与业务ID

## Props 与渲染行为
- 正确 prop 为 `:bus-code` 与 `:bus-id`（对应 AnnexUpload 内部 `bus` 与 `id`），错误写法 title-text/bus-code 不会生效
- 初始化调用后端拉取要件包；若无配置则返回空数组，内部落到 AppendixEmpty 渲染 el-empty（大块"暂无附件"空白）
- 查看态出现附件需满足 requirementGrid 存在且 busId 已回填，否则抓到空状态

## 关联改造
- 机构页将附件放入 Headline title-text="要件上传" 且在 zs-form 内部，作为表单一部分自然撑高
- 主账户、监管账户、监管机构、监管协议四页已统一改用此组件并移入表单内

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "前端技术笔记",
  "name": "appendix_package_section",
  "source_extraction_id": "0e5f3eab3f2546d9a26a5791b0689651",
  "version": 1,
  "memory_type": "entities"
}
-->