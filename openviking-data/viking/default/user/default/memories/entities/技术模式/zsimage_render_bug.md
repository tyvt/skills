# ZsImage高度为0及宽度无法穿透shadow-root
苏住房C移动端ZsImage在SuccessCard中渲染失败(渲染层网络层错误)，根因是高度0与宽度样式无法进入shadow-root两点叠加。

## 问题根因
- 高度0(主因)：ZsImage默认aspectFill+height:100%，父级无高度时图片区域高度为0，请求成功但看不见
- 宽度样式进不了shadow-root：SuccessCard里width:180px无法穿透到ZsImage内部

## 修复要点
- ZsImage.vue补全缺失的imageStyle；新增width prop通过inline style在组件内部设宽
- mode="widthFix"时高度随宽度自适应；设置styleIsolation:'shared'合并外部class
- SuccessCard.vue所有插图改为mode="widthFix" width="180px"

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 需清缓存重新编译；图片正常显示后Network里仍是/pages_my/static/images/authorized.png即可
- 涉及ZsImage.vue、SuccessCard.vue、AuthorizedSuccess.vue；来源会话ID：a875a3cf-aa63-4197-994e-ac8f0d49cb8c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsimage_render_bug",
  "source_extraction_id": "96ccac645cc742a1b882af762db6e9aa",
  "version": 1,
  "memory_type": "entities"
}
-->