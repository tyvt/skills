# 单页机构注册表单Word上传被硬编码拦截
zhi3-web-admin-h5-g 机构注册单页表单上传委托授权书 Word 时提示「格式不允许」，根因为前端校验硬编码扩展名白名单。

## 问题根因
- 要件卡片顶部提示按配置推导，正确显示 `.doc,.docx,.png,.jpg,.pdf`（来自 acceptTypeHint）
- 上传前校验走 `handleRequirementBeforeUpload` → `validateAppendixFile`，使用硬编码 `APPENDIX_ACCEPT_EXTENSIONS = ['png','jpg','pdf']`
- 展示按配置、校验走全局，口径错位导致 .doc/.docx 被前端拦下
- 后端字典 `file_type`（`1→doc,docx / 3→pdf / 0→.png,.jpg`）与配置（委托授权书 `fileType=1,0,3`）本就支持 word

## 解决方案
- `institutionRegisterAppendix.js`：新增 `resolveAllowedExtensions(fileType, fileTypeOptions)`，按要件 `fileType` 命中字典 `remark` 推导允许扩展名
- `validateAppendixFile` 支持传入按配置推导清单，未命中回落默认常量
- `InstitutionRegisterSingleForm.vue`：`handleRequirementBeforeUpload(file, item)` 按当前要件 `fileType` 校验
- `uploadTip` 汇总可见要件配置类型展示，避免顶部与卡片提示再错位

## 验证与归属
- `npm run build`（vite 8.3.5）通过，`npx eslint` 两文件 0 error
- 逻辑复刻：`fileType="1,0,3"` 时 doc/docx/png/jpg/pdf 放行，xls/txt 拦截
- 多步向导 `Step3Appendix`/`InstitutionUploadItem` 本就按配置校验，无需改动
- 子模块 `zhi2-web-admin` 提交 `8b116ae8c`，父仓库 `7f560d0`，均推 `origin/develop/v3.0.0`；错误台账新增 E-027

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "前端技术笔记",
  "name": "institution_register_docx_blocked",
  "source_extraction_id": "9a5b065b09254f498477778bb4f88265",
  "version": 1,
  "memory_type": "entities"
}
-->