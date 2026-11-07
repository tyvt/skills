# 签字图不显示+大片空白：图片容器须固定尺寸并兼容sign字段
苏住房C（uni-app小程序zhi2-mobile-shimin）投票决策结果页 DecisionResult 的「最近一次决策」下方大片空白，签字图未显示。

## 问题现象
- DecisionResult「最近一次决策」下方出现大片空白，本该有的签字图没显示
- 「决策详情」被做成整行 CardCell，额外贡献一段行高

## 根因
- 签字用 CardCell 包 ZsImage，图片容器无固定尺寸，内部 height:100% 在 flex 测量链里拿不到确定高度，图片退化成 0 高导致空白
- 取值只读了 signature，后端在另一种返回结构里给的是 sign，字段不匹配时同样只剩空白
- 「决策详情」被做成整行 CardCell，本身额外贡献一段行高

## 解决方案
- 签字区不用 CardCell，改用 cell-item + 专用 sign-picture-wrap，容器固定 153×68px，图片 mode="aspectFit" 保证不拉伸
- 取值做多候选回退：recordDetail.signature || recordDetail.sign || detail.signature || detail.sign
- 「决策详情」从整行卡片降级为决策内容下方的紧凑链接行
- 同一业务的复制页面（optional/ 与 common/ 下同名文件）互相对齐，改一份同步另一份
- 推广：小程序里任何图片（签字、证照、缩略图）都必须由外部容器定尺寸，不要依赖 height:100% 自行撑开

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话 55bd76cb（2026-08-28，基线 8fc3cc5）用户报「optional/DecisionResult 最近一次决策下面有大量空白，也可能是签字没展示」
- 涉及文件：src/pages_vote/decision/optional/DecisionResult.vue、src/pages_vote/decision/common/DecisionResult.vue、src/pages_vote/decision/styles/page.scss
- 所属项目：苏住房C；来源会话ID：55bd76cb-6679-4d29-9b33-6cebc5d1203e；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "signature_image_blank",
  "source_extraction_id": "b914c1b571894896a474b9ab1408ca7f",
  "version": 1,
  "memory_type": "entities"
}
-->