# Componente de subpacote não pode ser referenciado entre subpacotes
No mini-programa SuzhouFangC (zhi2-mobile-shimin), componentes de subpacotes não podem ser referenciados entre diferentes subpacotes; Home_Jiayuanqu (subpacote pages_tab) referenciava NoticeList do subpacote pages_main causando erro, sendo necessário mover o componente para o pacote principal e unificar o caminho de importação.

## 问题根因
- O mini-programa WeChat não permite referência de componentes entre subpacotes
- Home_Jiayuanqu (subpacote pages_tab) referenciava NoticeList do subpacote pages_main, causando falha de carregamento

## 解决方案
- Mover NoticeList para o pacote principal em src/components/NoticeList/NoticeList.vue
- Unificar caminhos de importação em pages_tab/components/Home_Jiayuanqu.vue etc. para @/components/NoticeList/NoticeList.vue
- Remover o caminho original do subpacote

## 验证与归属
- Verificação: sessão 454c97fd usuário reportou erro de referência entre subpacotes; NoticeList movido para pacote principal e caminhos unificados
- 涉及文件: src/pages/index/components/Home_Jiayuanqu.vue, src/pages.json, src/components/PageBg/PageBg.vue, src/components/NoticeList/NoticeList.vue, pages_tab/components/Home_Jiayuanqu.vue
- 验证证据: src=苏住房C/052.md; ID da sessão: 454c97fd-ca5c-4c7f-a2dd-54da7553d258; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subpkg_component_cross_access",
  "source_extraction_id": "0e29cc68446e451f8607eb6f35513056",
  "version": 1,
  "memory_type": "entities"
}
-->