# 苏房V3列表页首次仅显4行刷新正常的高度测量根因
物业管理区域信息页在奇安信可信浏览器上首次进入列表只露4行多、刷新后正常，根因是zs-table底部安全区测量函数把容器下方空白反向扣减高度。

## 问题现象
- 仅旧Chromium内核浏览器出现：首次从其他菜单进入property/complex列表只显示约4行，刷新一次显示全部10条
- 根因：首次进入flex高度链路未稳，list-container高度偏小留白；zs-table的getBottomSafeInset()把下方空白当底部安全区再减一次，算得仅4行
- 刷新后容器撑满空白近0表现正常；与已知calc(100vh-120px)常量少减16px是不同根因，改常量修不好

## 解决方案
- RegionTreeLayout改用动态高度：height = window.innerHeight - listContainer.getBoundingClientRect().top - 8，0~3000ms多次同步覆盖异步加载与路由动画
- zs-table移除错误容器下方空白扣减，新增getFillHeightFromContainerBounds()用容器底边-表格顶边计算，取容器边界/布局高度/视口高度三算法最大值兜底
- 分页条未显示时也预留52px避免高度突变

## 验证与归属
- 涉及文件：property/complex/components/RegionTreeLayout.vue、components/zs-table/zs-table.vue、property/complex/index.vue
- 所属项目：苏住房G；来源会话ID：284420f4-9651-4522-a204-e61d73fc5079；代码基线：2a3ef8a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_layout_height_bug",
  "source_extraction_id": "f7f1e07dd4db4c05b244379202929f45",
  "version": 1,
  "memory_type": "entities"
}
-->