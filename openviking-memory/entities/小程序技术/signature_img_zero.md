# 签字图因ZsImage内部width:100%无参照容器高度塌成0须套固定尺寸wrap
苏住房C选举/决策记录详情签字图不显示，接口有值但页面空白，根因是ZsImage内部.img写死width:100%所在行无确定尺寸致高度塌0。

## 问题现象
- 选举记录详情与决策记录详情签字图不显示，接口signature字段有值页面空白
- 改成CardCell行布局后还引发整块区块不渲染次生问题
- 用户贴完整接口JSON证明数据正常

## 根因
- 签字图放进CardCell行布局后，ZsImage内部.img width:100%所在行无确定宽高约束
- 百分比宽度无法解析成具体尺寸，高度随之塌成0，图片视觉不存在
- 改成CardCell还引发整块不渲染

## 解决方案
- 给签字图单独套固定尺寸容器（sign-picture-wrap，153×68）让百分比宽高有参照
- 通过:deep(.img)覆盖ZsImage内部width:100%，改由容器决定尺寸
- 字段区恢复已可用cell-item布局，不整体换CardCell
- 仍不显示用vConsole看图片请求是否404区分尺寸塌陷与资源加载失败

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话e7007608用户报选举/决策记录签字不显示+JSON；后续空白不展示；结论固定尺寸wrap+ :deep覆盖
- 涉及文件：src/pages_vote/decision/common/DecisionRecord.vue、src/pages_vote/elect/ResultRecord.vue、src/components/ZsImage/ZsImage.vue
- 所属项目：苏住房C；来源会话ID：e7007608-941f-47f8-a082-3768ad6aa6e3；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "signature_img_zero",
  "source_extraction_id": "0bc9c97c36d946eeb27dc957b0e08455",
  "version": 1,
  "memory_type": "entities"
}
-->