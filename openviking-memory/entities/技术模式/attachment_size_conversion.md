# 附件大小字节与MB换算约定
园区公共收益项目附件大小字段后端API始终为字节（B），仅 fjflpz 配置弹窗做 MB 展示与提交换算。

## 背景与约定
- 与后端约定附件大小字段 API 始终返回字节（B），消费侧直接用它做上传校验，禁止二次换算
- 仅「工具 → 附件配置」编辑弹窗（FjDialog）做边界换算，避免与接口已是最终单位的其它字段规则混用

## 解决方案
- getDetail 用 bytesToMb 回显，保留 2 位小数
- submitForm 用 mbToBytes 四舍五入为整数再提交
- 页面单位文案改为 MB，校验去掉原 18 位长度限制，改为非负数且最大值 ≥ 最小值
- AnnexUpload / AnnexUploadDialog / 业务详情上传校验仍直接消费接口返回的字节阈值，本次不改消费侧

## 验证与归属
- 新增 utils bytesToMb/mbToBytes；FjDialog 改单位与双向换算；消费侧未改动仍直接使用后端字节值做上传校验
- 涉及文件：zhi2-web-admin/src/utils/index.js、zhi2-web-admin/src/views/tool/fjflpz/components/FjDialog.vue、zhi2-web-admin/src/components/AnnexUpload/index.vue
- 所属项目：园区公共收益；来源会话ID：03c9bc97-26cb-4c25-b7ab-4bb2bb9c3a3a；代码基线：7458acc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "attachment_size_conversion",
  "source_extraction_id": "6118528a4b464171955db25f75310ed3",
  "version": 1,
  "memory_type": "entities"
}
-->