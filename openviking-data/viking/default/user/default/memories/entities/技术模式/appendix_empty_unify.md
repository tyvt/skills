# 要件上传缺省图统一
苏州市房地产监测V3 已完成「要件上传」缺省图统一，查看态与编辑态均为 56px、文案「暂无附件」。

## 核心改动
- utils/appendix.js 新增常量 APPENDIX_EMPTY_IMAGE_SIZE = 56、APPENDIX_EMPTY_DESCRIPTION = '暂无附件'
- components/AppendixEmpty/index.vue 封装统一缺省图规格，随 main.js 全局注册
- 修复根因组件 AnnexUpload（未设 image-size 默认 200px）、AppendixPackageSection、AnnexUploadDialog
- 收敛 13 个页面级散落实现（经纪机构基准页、预售许可、委托销售、机构人员/分支机构等）
- 补齐遗漏 Step3Appendix（注册/经纪机构注册）、FileListDialog

## 涉及文件与归属
- 涉及文件：utils/appendix.js、components/AppendixEmpty/index.vue、main.js 及多页面
- 所属项目：苏州市房地产监测V3
- 来源会话：985954c0-6f17-4a84-9d42-b659253fed36
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_empty_unify",
  "source_extraction_id": "fd68f442701b43a49b6d854439887c52",
  "version": 1,
  "memory_type": "entities"
}
-->