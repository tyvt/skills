# 全景大屏页横向滚动条被推离可视区
园区物管2.0 中全景类大屏页根节点同时用 height 与 min-height 的 calc(100vh-…) 会把横向滚动条推出主内容区可视范围。

## 现象
- 地图/资金全景等超宽大屏页，横向滚动条必须先把纵向滚到最底才出现。

## 根因
- 根节点写 height: calc(100vh - 84px) 且 min-height 同值；#app-main 为 flex:1，实际高度小于该值（上方还有 Tags 栏、票据条等，84 只是近似值）。
- 根盒子比可视区更高，横向滚动条画在盒子最底、落在主区可视范围之下。

## 解决方案
- 去掉强制视口高的 min-height，改加 max-height: 100% 让高度不超父级主内容区，并加 min-height: 0 保证 flex 子项正确参与高度计算。
- 若个别环境 max-height:100% 不生效，再在 AppMain 的 .app-main 上补 min-height:0。
- 与「详情页 calc(100vh-120px) 少减像素」是不同的根因与场景。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 a2b24d85 中 assetPanorama 与 fundPanorama 同步做「去 min-height + max-height:100% + min-height:0」三处修改后，横向滚动条无需先滚到底即可见。
- 涉及文件：src/views/benefit/dataSandbox/assetPanorama/index.vue、src/views/benefit/dataSandbox/fundPanorama/index.vue、src/layout/components/AppMain.vue。
- 所属项目：园区物管2.0；来源会话：a2b24d85-02d0-461f-afbd-1db973bf08f3；代码基线：f00310232。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "panorama_height_scroll",
  "source_extraction_id": "c83f42b2da4141d9b9f2031f7272f576",
  "version": 1,
  "memory_type": "entities"
}
-->