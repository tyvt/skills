# HomeBizSection 全高隐藏次级区块
所有的 HomeBizSection 都设置了 height:100% 和 flex:1，导致商业房产列占满全部空间并隐藏了二手房/租赁。

## 问题根因
- 所有的 HomeBizSection 都设置了 height:100% 和 flex:1
- 商业房产列占据全部空间并隐藏二手房/租赁的次级区块

## 修正
- stretch 仅在次级行启用
- 带有次级区块的 biz-center 使用 grid(auto+1fr)
- 经纪商侧的边栏在并列区块中添加 stretch

## 涉及文件
- zhi2-web-admin/src/views/home/components/layouts/HomeLayoutSidebar.vue
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/src/views/home/components/layouts/HomeLayoutAdmin.vue
- zhi2-web-admin/src/views/home/components/HomeBizSection.vue
- zhi2-web-admin/src/views/home/components/HomeQuickLinks.vue
- zhi2-web-admin/src/views/home/styles/homeCard.scss
- zhi2-web-admin/src/views/home/index-new.vue

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 来源会话：94cb407a-5b39-4218-8e57-162fde013753
- 验证证据: cursor 会话提取
- 所属项目: portal; session: 94cb407a-5b39-4218-8e57-162fde013753

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "biz_section_stretch",
  "source_extraction_id": "f86567dce52645b8804500e484bf9fdb",
  "version": 1,
  "memory_type": "entities"
}
-->