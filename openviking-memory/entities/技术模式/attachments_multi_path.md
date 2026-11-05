# attachments 多路径字段拆分处理
园区物管2.0 资产详情弹窗图片不显示，根因是 attachments 字段为逗号分隔多路径，被整体当单 URL 处理。

## 问题根因
- 后端 attachments 字段是逗号分隔的多条相对路径串（如 /zhi2-dev/...jpg,/zhi2-dev/...jpg）
- 前端把它整个当一个 src 传给 resolveServerAssetUrl，拼出无效 URL 必然加载失败

## 解决方案
- 取值侧将 assetImageUrl 改为 assetImageUrls，按逗号 split 成路径数组并 trim 空白，逐条走 resolveServerAssetUrl 拼域名
- 展示侧单张用 <img>，多张用 el-carousel 轮播，可按接口数据正常显示多张图片（如7张）并左右切换
- 同模块 ParkingAssetDialog、AdvertiseAssetDialog 等弹窗有同样逻辑要一并排查

## 套路
- 凡是「多附件存在一个字符串字段」的接口，消费前必须先拆分数组，不能直接当单 URL 用

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/components/HouseAssetDialog.vue、src/utils/resolveServerAssetUrl.js
- 所属项目：园区物管2.0；来源会话：14e20239-48ca-49b6-aa6c-ccb4e211568e；代码基线：a63180c9a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "attachments_multi_path",
  "source_extraction_id": "2aa8b6d1567c447481ec957b1d181c1d",
  "version": 2,
  "memory_type": "entities"
}
-->