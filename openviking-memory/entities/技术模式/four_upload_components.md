# 四个上传组件别混用：值类型与契约各异
本项目四个上传附件组件（zs-file-upload / FileUpload / AnnexUpload / AppendixPackageSection）的 props 契约、绑定方式与值类型均不同，写错一个不报错但数据为空。

## 组件差异
- zs-file-upload：回填字段是 url，适用于普通单文件上传
- FileUpload：回填字段是 fileSite，与 zs-file-upload 的 url 不能互换，写错字段名回显即空
- AnnexUpload：非 v-model 绑定，传 bus+id 让组件自行按业务编码拉附件列表；查看态须切只读要件组件，不能复用 AnnexUpload
- AppendixPackageSection：要件包组件，值类型与前几者不同，新增态与编辑态校验时机不同源

## 选型检查项
- 改造前先确认：① 组件是哪个 ② 回填字段叫什么 ③ 要件 busCode 来源（路由 meta 优先，不依赖路由时按主体给固定值，不能全站回退同一值）④ 请求是否需进加解密白名单
- 接口加解密是全局链路，某上传组件请求未进白名单时文件传不上去

## 加密改造原则
- 加密改造按接口逐个核查（docs/加密改造-非JSON接口核查清单.md 只引结论），不要整体开关式替换
- 验签与加解密是两套独立链路，需分别确认

## 涉及文件与归属
- 涉及文件：zs-file-upload.vue、FileUpload/index.vue、AnnexUpload/index.vue、AppendixPackageSection/index.vue、docs/frontend/page-recipes.md、docs/加密改造-非JSON接口核查清单.md
- 来源会话：session-dd2640d3-2200-4bc4-8109-659264d6ff88、9c09226d-8b25-4c30-a875-1a0f0848acda；代码基线：a86bf95

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "four_upload_components",
  "source_extraction_id": "fbafd4fd1605421ead8749279bdeff62",
  "version": 1,
  "memory_type": "entities"
}
-->