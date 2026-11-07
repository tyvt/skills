# 园区物管V0 地下车库「未开户」显示逻辑
园区物管V0 房产详情页地下车库区域与地上区域的「未开户」判断逻辑不一致，已分析清楚。

## 显示特征
- 页面「未开户」对应图例灰色（#a4a4a4），房间图标用 image/no.png 并加 class="gray"（CSS 灰度滤镜）

## 判断逻辑差异
- 地上区域主要看 account 字段
- 地下车库主要看 purpose 和 isInitpayment，且不判断 account
- changeBuild 将楼层为负（floor < 0）的户室汇总到虚拟单元 mapUnit['地下车库']

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管V0
- 涉及文件：empj/js/empj_EstateDetail.js
- 所属项目：园区物管V0；来源会话ID：47a15a5b-96fc-44bf-a48d-4d88ec7e305c

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "underground_garage_unopened",
  "source_extraction_id": "699078b4f19642a0bb7063574b980cd1",
  "version": 1,
  "memory_type": "entities"
}
-->