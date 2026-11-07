# img与ZsImage标签混写导致无效结束标签
在苏住房C小程序批量替换图片组件时，将`<img />`与`</ZsImage>`/`</ImageUploader>`混写，导致开始/结束标签不匹配。

## 问题根因
- 批量替换图片组件时，把`<img />`和`</ZsImage>`/`</ImageUploader>`混写在一起，导致标签不匹配
- 同批替换还留下了错误静态资源路径（如`..../../`、`.././../../../`）

## 修复方式
- 将`<img /></ZsImage>`改为`<ZsImage />`
- 将混写结构拆分为正确的`<img />` + `</ImageUploader>`
- 修正畸形静态资源路径

## 涉及文件
- `pages_main/publicNotice/index.vue`
- `pages_guard/index/index.vue`
- `pages_owner/project/info/index.vue`
- `pages_guard/emergencyContact/index.vue`
- `pages_guard/guardApply/components/step1.vue`
- `pages_owner/committee/application/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：e6b2c88e-db79-4d03-ada4-c17e191d6830

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "img_zsimage_tag_mismatch",
  "source_extraction_id": "9b70ab6d8b214640a33a8865f462425d",
  "version": 1,
  "memory_type": "entities"
}
-->