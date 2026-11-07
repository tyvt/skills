# el-upload before-upload 异步返回 false 拦截失效
禅道 Bug 5798 揭示 el-upload 的 before-upload 写成 async 返回 Promise<false> 无法拦截上传，且前端白名单须与后端字典对齐。

## 问题根因
- 测试环境未部署：测试环境构建时间 2026-10-27 11:46 早于首次修复提交 5424755ae（19:56），线上产物仍是旧白名单 ["png","jpg","jpeg","pdf"]
- 代码未修到位：before-upload 写成 async 并返回 Promise<false>
- Element UI 的 before-upload 支持 Promise，但仅在 resolve 出 File/Blob 时才采用返回值，返回 Promise<false> 走 reject/其他分支，文件照样提交
- 异步函数返回假值在 JS 语义上是 Promise<false> 而非 false，正是踩坑点

## 修复方案
- before-upload 的同步校验分支必须 return false
- 若校验本身异步，应让 Promise reject 而非 resolve 成 false，否则拦截无效
- 白名单与后端一致：后端按字典 sys_dict_data(file_type) 的 remark 判定（img = .png, .jpg），前端不能另写更大名单
- 接收 .jpeg 时先维护字典 img 的 remark 再放开前端白名单，顺序不能反

## 验证与排查
- 标准排查顺序：先比对测试环境构建时间 vs 修复提交时间，再核对代码是否真的修到位，两原因可能同时存在
- 修复上线客观判据：写产物校验脚本 node e2e/scripts/check-testenv-appendix-build.mjs 返回 0 表示修复已上线
- 回归覆盖新增 8 条用例 + 相关既有链路回归（公司注册要件 3 条），再回写禅道

## 涉及文件与归属
- 涉及：zhi2-web-admin/src/components/AnnexUpload/components/AppendixRequirementGrid.vue 等（AnnexUpload、institutionRegister 相关）
- 来源会话 session-eeaa919a-8892-4f7c-b26b-70f4ed5ab48f；代码基线 a86bf95；禅道 Bug 5798

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_upload_promise_false",
  "source_extraction_id": "e30ec998055842cf9bca08f4e7758748",
  "version": 1,
  "memory_type": "entities"
}
-->