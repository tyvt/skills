# detail-container 滚动与高度布局规则
园区房产 zhi3-web-admin-h5-g 详情页根容器 detail-container 的滚动与高度行为由 index.scss 第455-520行规则决定。

## 容器结构
- `.detail-container` 为 flex 布局且 `overflow: hidden`
- 直接子元素常见为 `.operation-btn-group`、`.detail-from-container`、附件组件等
- `.detail-from-container` 仅匹配"仅表单"分支，样式为 flex: 0 1 auto

## 滚动分支规则
- 直接子元素含 `> .collapse-container` 或 `> .sub-container` 时进入"整页滚动"分支
- 裸放兄弟节点（如直接放 AnnexUpload）不匹配任何滚动规则，组件自身 height: calc(100% - 50px) 撑满，超出视口被 overflow:hidden 裁剪

## 实践结论
- Headline 组件实际渲染为 `.collapse-container`，将附件块放进 Headline 内即可触发整页滚动分支
- 附件组件必须置于 zs-form 内部（机构页写法），避免裸放导致高度溢出与裁剪
- 涉及文件：index.scss、mainAccount/detail.vue、regulatorAccount/detail.vue 等

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "detail_container_scroll",
  "source_extraction_id": "0e5f3eab3f2546d9a26a5791b0689651",
  "version": 1,
  "memory_type": "entities"
}
-->