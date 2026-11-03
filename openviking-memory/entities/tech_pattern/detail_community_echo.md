# 详情页社区编码回显修复
苏住房G详情页因Vue2依赖收集不稳定导致所属社区显示编码而非名称，已通过void触发依赖并改用匹配函数修复。
## 问题根因
- 详情页使用dictFormatter在社区选项异步加载前回显编码
- Vue2计算属性对communityOptions依赖收集不稳定，导致名称未正确匹配
## 解决方案
- zhi2-web-admin/src/views/property/complex/detail.vue中contentInfo增加void this.communityOptions触发依赖收集
- 改用formatCommunityDisplay从communityOptions匹配名称
## 验证与归属
- 验证证据：src=苏住房G/032.md
- 涉及文件：detail.vue、index.vue、area.js、detailMixins.js、form.js、main.js、package.json
- 来源会话：1d1dcbd1-daa8-4961-bfb9-d16249fa1d19

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "detail_community_echo",
  "source_extraction_id": "9045f3f234e04b8fad54878354d961ab",
  "version": 1,
  "memory_type": "entities"
}
-->