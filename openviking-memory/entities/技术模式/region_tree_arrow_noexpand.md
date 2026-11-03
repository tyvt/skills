# 行政区域树点击箭头不展开根因与修复
苏住房G项目物业管理区域查询页左侧行政区划树点展开箭头无反应，根因为node-key不稳定叠加异步默认展开失效。

## 问题根因
- node-key='areaCode'不稳定：接口返回的areaCode可能重复或为空，破坏el-tree内部节点映射，表现「点了没反应」
- 绑定:current-node-key受控值与不稳定key配合，重渲染时干扰展开状态
- default-expanded-keys对异步数据天然失效：树数据接口返回后才赋值，初始化展开已跑完，赋data不重放默认展开

## 解决方案
- node-key改为加载时补全的唯一id（遍历treeData生成/补id后赋值）
- 删掉:current-node-key和无效default-expanded-keys
- 数据加载完成回调里手动setCurrentKey+展开根节点
- 设:expand-on-click-node="false"避免点文字触发筛选与展开打架
- 排序列表无匹配时回退使用接口返回的完整区县数据

## 验证与归属
- 验证：会话bd3cdf70用户报「部门树不展开」，结论列三点根因并修复为node-key="id"+补唯一id+移除受控key+手动展开根节点+expand-on-click-node=false+无匹配回退
- 涉及文件：publicQuery/complex/index.vue、property/complex/components/RegionTreeLayout.vue、property/complex/components/regionTree.vue
- 所属项目：苏住房G；代码基线：4e59087；来源会话：bd3cdf70-1309-4f6d-b4b3-b918206e8052

## 关联区分
- 与已知「node-key类型与setCurrentKey入参类型不一致」不是同一坑：那条是类型不匹配，本条是key本身不唯一+异步默认展开失效

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_arrow_noexpand",
  "source_extraction_id": "d2b47756a3ff4649b774baa576cac35f",
  "version": 1,
  "memory_type": "entities"
}
-->