# Caminho vazio não autenticado dispara goMenu indisponível
No projeto zhi2-mobile-shimin, quando o usuário não está verificado (realname), passar caminho vazio '' para goMenu dispara a mensagem "功能暂未开放" (funcionalidade indisponível).

## 问题
- Arquivo `src/pages_my/setting/userInfo.vue` passa '' para `goMenu` se o usuário não fez verificação real.
- Isso faz o `goMenu` exibir "功能暂未开放" (funcionalidade temporariamente indisponível).

## 解决方案
- Adicionado `handleRealNameClick` que navega conforme status de verificação real e atualiza texto inline.
- Arquivos envolvidos: userInfo.vue, utils/index.js, realInfo.vue, UnauthorizedPage.vue, TypeChoose.vue, store/user.js, aty_renzheng.xml, setting/index.vue.

## Verificação
- 验证证据: src=苏住房C/029.md (documento interno).
- Sessão de origem: 04bd980d-60cb-4228-859f-9dca707763e9; base de código: none.

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia SuzhouC",
  "name": "unregistered_gomenu_empty",
  "source_extraction_id": "195ef044b5d84cc697c2bf15d158b46d",
  "version": 1,
  "memory_type": "entities"
}
-->