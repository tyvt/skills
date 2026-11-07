# 苏住房C 列表绑定后端 complexPhoto 字段三件套
苏住房C 列表展示后端相对路径图片字段 complexPhoto 需用 ZsImage 解析、rows.map 显式保留、无图回退占位图。

## 适用场景
- 决策列表等需显示小区照片时绑定后端实体 complexPhoto 字段
- 该字段为后端相对路径（如 /zhi2-pro/...），必须走统一 URL 解析而非直接塞给 image

## 修复做法
- 模板换项目内 ZsImage，:src="item.complexPhoto"、:local="false" 走 resolveMediaUrl 解析
- index.vue 与 elect/index.vue 的 rows.map 显式保留 complexPhoto，重新组装行对象逐字段列出
- 无图或加载失败统一回退分包内占位图 images/house_szf.png，避免破图

## 排查与验证
- 前端改完须到 Network 核对接的 rows[].complexPhoto 是否有值；null/空串则问题在后端 VO 未填充，需后端补数据
- 所属项目：苏住房C；来源会话：a33c6375-1500-460f-81a1-56831ba1739b；代码基线：8520c36
- 涉及文件：src/pages_owner/decision/components/DecisionList.vue、decision/index.vue、components/DetailTopCard.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufangc_list_photo",
  "source_extraction_id": "a59756a24d99485f998a670e9881d6cd",
  "version": 1,
  "memory_type": "entities"
}
-->
