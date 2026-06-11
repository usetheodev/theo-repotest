# PRINCÍPIOS INQUEBRÁVEIS

> Documento Universal de Engenharia de Software — Versão 2.0
>
> Estas regras se aplicam a QUALQUER projeto de software, independente de tecnologia, arquitetura ou complexidade. São princípios fundamentais não-negociáveis.

---

## PARTE I — REGRAS DE CONDUTA E OPERAÇÃO

### 1. Regra de Confiança de 95%

Não proceda com NENHUMA implementação sem ter 95%+ de certeza sobre o que está fazendo.

**Na prática:**

- Pare imediatamente se não tiver 95% de confiança.
- Faça perguntas até ter certeza absoluta sobre requisitos.
- Nunca assuma requisitos ou faça interpretações especulativas.
- Nunca proceda sem validação completa dos inputs do usuário.
- Nunca continue sem evidências concretas.

**Frases obrigatórias quando não houver certeza:**

- "Não tenho certeza sobre isso. Preciso de mais informações."
- "Posso estar errado, mas acredito que..."
- "Não sei com 95% de certeza. Você pode confirmar?"
- "Identifiquei um risco: [explique o risco]."
- "Parei porque não tenho certeza absoluta sobre [X]."

**Antes de qualquer ação importante:** pause e pergunte "Tenho 95%+ de certeza?" — se não, seja honesto e peça esclarecimento. Se sim, proceda comunicando riscos conhecidos.

### 2. Regra de Completude de Task

> "Antes de iniciar uma nova task, SEMPRE pergunte: a task anterior está 100% implementada?"

**Fluxo:**

1. Quando pedirem para fazer algo novo → pergunte se a task anterior está 100% implementada.
2. Se NÃO → pare e complete a anterior primeiro.
3. Se SIM → prossiga com a nova task.

**Definição de "100% Implementada":**

- Todos os botões funcionam (têm handlers).
- Todos os formulários submetem (têm validação + submit).
- Todas as modais abrem/fecham.
- Todas as integrações funcionam de verdade (não mocks).
- Usuário consegue completar todos os fluxos.

### 3. Honestidade Extrema

Você DEVE ser extremamente sincero em TODAS as situações. Não existe exceção.

- Admita imediatamente quando não souber algo.
- Exponha limitações e riscos reais antes de agir.
- Reconheça erros imediatamente quando cometidos.
- Nunca invente informações para parecer competente.
- Nunca dê respostas genéricas quando não souber.
- Nunca oculte dúvidas ou limitações.

**Regra final:** melhor admitir ignorância e aprender do que fingir conhecimento e falhar.

### 4. Regras de Git — Invioláveis

- **SEMPRE** trabalhe na branch `develop`. Toda mudança (feature, fix, refactor, docs, chore) é commitada diretamente em `develop`. **Não criamos feature branches.**
- **NUNCA** trabalhe diretamente na branch `main`. `main` é branch protegida que recebe **apenas merges de release** vindos de `develop` (corte de versão). Releases podem ser cortados via merge `develop → main` + tag semver, manual ou via PR de release.
- **NUNCA** faça `git checkout` ou `git revert`. Use `git switch` para trocar de branch e `git restore --staged` para des-stagear.
- **NUNCA** faça `git push --force` em `main` ou `develop`. Force-push só em branches descartáveis efêmeras (ex: experimento solo, nunca compartilhada).
- **NUNCA** faça `git reset --hard`. Use `git stash` ou `git reset --soft` para preservar mudanças.
- Quando um recurso gerenciado pelo ArgoCD ficar stuck em deletion, remover o finalizer é a solução correta para destravar e permitir que o GitOps reassuma o controle.

### 5. Nomenclatura

Escolha sempre o nome mais específico e descritivo. Melhor um nome longo e claro do que um nome curto e problemático.

| Bom | Ruim | Motivo |
|---|---|---|
| `user_metadata` | `metadata` | Ambíguo, pode conflitar |
| `content_type` | `type` | Palavra reservada em várias linguagens |
| `from_date` | `from` | Palavra reservada em Python |

### 6. Changelogs — Registro Obrigatório de Mudanças

Todo projeto DEVE manter um `CHANGELOG.md` na raiz do repositório. O changelog é o contrato de comunicação entre quem desenvolve e quem consome. Se a mudança não está no changelog, ela não aconteceu.

**Formato: [Keep a Changelog](https://keepachangelog.com/) + [Semantic Versioning](https://semver.org/)**

```markdown
# Changelog

## [Unreleased]

### Added
- Endpoint POST /api/v1/users para criação de usuários (#142)

### Changed
- Timeout de conexão com Redis aumentado de 3s para 10s (#138)

### Fixed
- Correção de race condition no processamento de eventos de pagamento (#145)

### Removed
- Suporte a API v0 descontinuado conforme comunicado de 2025-01 (#130)

## [1.2.0] - 2026-02-05

### Added
- ...
```

**Categorias permitidas (apenas estas, nesta ordem):**

- `Added` — funcionalidades novas.
- `Changed` — alterações em funcionalidades existentes.
- `Deprecated` — funcionalidades que serão removidas em breve.
- `Removed` — funcionalidades removidas.
- `Fixed` — correções de bugs.
- `Security` — correções de vulnerabilidades.

**Regras:**

- Toda entry DEVE ter referência ao ticket/issue/PR entre parênteses: `(#142)`.
- Escreva para o consumidor, não para o desenvolvedor. "Corrigido bug no cálculo de juros compostos" — não "Ajustado float precision na função calc_interest".
- Uma linha por mudança. Se precisar de mais, a mudança é grande demais para uma linha ou o escopo do PR está errado.
- A seção `[Unreleased]` é obrigatória e é onde toda mudança entra primeiro. Só migra para uma versão numerada no momento do release.
- NUNCA edite entradas de versões já released. Se errou, crie uma entrada nova com a correção.
- Changelogs são escritos por humanos, para humanos. Não são dumps de git log.

**Anti-Patterns:**

- Usar `git log --oneline` como changelog.
- Entradas vagas: "melhorias de performance", "ajustes diversos", "refatoração".
- Misturar mudanças internas (refactor sem impacto externo) com mudanças visíveis ao consumidor.
- Changelog desatualizado ou preenchido só no dia do release.

### 7. Testes — Se Não Tem Teste, Não Funciona

Código sem teste é código que funciona por coincidência. Testes não são overhead — são a única prova objetiva de que o software faz o que deveria. Falar de SOLID, DRY e KISS sem ter testes é como projetar um prédio e nunca inspecionar a fundação.

**Filosofia:**

- Testes existem para proteger comportamento, não para cobrir linhas. 100% de cobertura com assertions vazios é pior que 60% de cobertura com testes significativos.
- Testes são documentação executável. Um bom teste descreve o que o sistema faz sem precisar ler o código de produção.
- Teste quebrado é bug com prioridade máxima. Se o time ignora testes vermelhos, os testes perdem todo o valor.

**Pirâmide de Testes:**

```
        /  E2E  \        ← Poucos: fluxos críticos de ponta a ponta
       /----------\
      / Integração \     ← Moderados: fronteiras do sistema (DB, APIs, filas)
     /--------------\
    /   Unitários    \   ← Muitos: lógica de negócio isolada, rápidos, determinísticos
   /------------------\
```

- **Unitários** — testam lógica de negócio pura, sem I/O. Devem rodar em milissegundos. São a base de tudo.
- **Integração** — testam fronteiras: repositórios contra banco real, clients contra APIs, consumers contra filas. Aqui é onde DIP paga seu investimento — mocks nos unitários, implementações reais na integração.
- **E2E** — testam fluxos críticos do ponto de vista do usuário. Poucos, estáveis e representativos. Não tente cobrir edge cases aqui.

**Regras:**

- Toda lógica de negócio DEVE ter teste unitário. Sem exceção.
- Todo bug corrigido DEVE gerar um teste de regressão antes do fix. Primeiro escreva o teste que falha, depois corrija.
- Testes devem ser determinísticos. Se um teste falha intermitentemente (flaky), ele é um bug e deve ser corrigido ou removido imediatamente.
- Cada teste testa UMA coisa. Se o nome do teste tem "e" (testa criação e validação e envio), ele testa demais.
- Testes devem ser independentes entre si. Nenhum teste deve depender de estado deixado por outro teste. A ordem de execução não pode importar.
- Use o padrão Arrange-Act-Assert (AAA) ou Given-When-Then. Sem exceção.
- Nomes de testes devem descrever o comportamento, não o método: `test_transferencia_falha_quando_saldo_insuficiente`, não `test_transfer_1`.

**O que testar vs o que NÃO testar:**

| Testar | Não testar |
|---|---|
| Regras de negócio e cálculos | Getters/setters triviais |
| Validações e edge cases | Código gerado por frameworks |
| Integrações com sistemas externos | Implementação interna (teste comportamento, não estrutura) |
| Cenários de erro e fallback | Bibliotecas de terceiros (elas têm seus próprios testes) |
| Contratos de API (request/response) | Layout e CSS (a menos que seja requisito de negócio) |

**Anti-Patterns:**

- Testes que dependem de ordem de execução ou estado compartilhado.
- Testes que testam implementação em vez de comportamento (quebram em qualquer refactor).
- Mocks em excesso: se precisa de 10 mocks para testar uma função, o design está errado (volta pro SRP).
- Testes comentados ou com `@skip` permanente. Teste desabilitado é dívida técnica invisível.
- Testar só o happy path. Os bugs moram nos edge cases.

### 8. Error Handling — Falhe Alto, Falhe Cedo, Falhe Claro

Erros silenciosos são o tipo mais perigoso de bug — o sistema continua rodando, dados corrompem, e quando alguém descobre o problema já é tarde. Em contexto financeiro, um erro engolido pode significar dinheiro perdido, auditoria comprometida ou operação irregular. Não existe erro que "pode ser ignorado".

**Filosofia: Fail-Fast**

O sistema deve falhar o mais cedo possível, o mais alto possível, e com a mensagem mais clara possível. Um erro detectado na validação de entrada custa centavos. O mesmo erro detectado em produção, três camadas depois, custa milhões.

**Regras:**

- NUNCA engula exceções. `catch (Exception e) {}` é proibido. Se não sabe tratar, deixe subir.
- Valide inputs nas fronteiras do sistema (controllers, consumers, handlers). Depois da fronteira, os dados são confiáveis.
- Erros devem ser explícitos e tipados. Use exceções de domínio com mensagens claras, não strings genéricas. `InsufficientBalanceError("Conta 12345: saldo R$100, tentativa R$500")` — não `Error("erro no processamento")`.
- Diferencie erros recuperáveis de irrecuperáveis. Timeout de API externa? Retry com backoff. Violação de regra de negócio? Falha imediata, sem retry.
- Logs de erro devem ter contexto suficiente para reproduzir o problema sem acesso ao debugger: quem, quando, o quê, com quais dados, e o que era esperado vs o que aconteceu.
- Nunca use exceções para controle de fluxo. Exceções são para situações excepcionais, não para lógica de negócio.
- Retorne erros explícitos em vez de valores mágicos. Não retorne `-1`, `null`, ou string vazia para indicar erro.

**Hierarquia de tratamento:**

```
1. VALIDE na entrada    → Rejeite dados inválidos antes de processar
2. FALHE rápido         → Se algo está errado, pare imediatamente
3. FALHE claro          → Mensagem específica com contexto completo
4. FALHE alto           → Deixe o erro subir até quem sabe tratar
5. REGISTRE com contexto → Log estruturado com dados para diagnóstico
6. RECUPERE se possível  → Retry, fallback, circuit breaker — apenas onde faz sentido
```

**Anti-Patterns:**

- `catch (Exception e) { log.error("erro"); }` — engoliu o erro, ninguém vai saber o que aconteceu.
- Retornar `null` em vez de lançar exceção quando a operação falhou.
- Mensagens genéricas: "Ocorreu um erro inesperado". Para quem? Sobre o quê?
- Retry infinito sem backoff ou circuit breaker.
- Tratar todo erro da mesma forma — timeout de rede e violação de regra de negócio são problemas fundamentalmente diferentes.
- Logar o erro e relançar a mesma exceção (duplica log sem adicionar valor).

---

## PARTE II — PRINCÍPIOS DE DESIGN DE SOFTWARE

A ordem importa. **"Não reinvente a roda" define o ponto de partida. KISS define a mentalidade. YAGNI filtra o escopo. DRY elimina redundância. SOLID estrutura o design.** Um alimenta o outro.

### 9. Não Reinvente a Roda — Use o Que Já Existe

Antes de escrever qualquer código, pergunte: "alguém já resolveu isso?" A resposta quase sempre é sim. Bibliotecas maduras, battle-tested e mantidas por comunidades inteiras são superiores a qualquer implementação caseira feita em uma sprint. Cada linha de código que você não escreve é uma linha que não precisa manter, testar, documentar e debugar.

Reinventar a roda é o oposto de engenharia — é vaidade disfarçada de técnica.

**Regras:**

- Antes de implementar qualquer funcionalidade não-trivial, pesquise se já existe uma biblioteca, ferramenta ou serviço que resolve. Gaste 30 minutos pesquisando antes de gastar 3 dias implementando.
- Prefira bibliotecas com: comunidade ativa, manutenção recente, boa documentação, licença compatível e adoção significativa. Stars no GitHub não são métrica — frequência de releases e issues respondidas são.
- Use ferramentas padrão da indústria. Se o ecossistema tem uma solução consagrada, use-a. Não escreva seu próprio ORM, seu próprio framework HTTP, seu próprio sistema de filas, seu próprio gerenciador de migrations.
- Quando adotar uma dependência, encapsule-a atrás de uma interface do domínio (DIP). Isso permite trocar a implementação se necessário, sem cirurgia no sistema inteiro.
- Documente o motivo da escolha de cada dependência significativa. Um ADR curto com "escolhemos X porque Y" evita que alguém reimplemente a mesma coisa depois.

**Quando É aceitável construir do zero:**

- O problema é genuinamente específico do seu domínio e nenhuma biblioteca resolve sem gambiarras.
- As opções existentes têm riscos inaceitáveis (licença, segurança, abandono, dependências transitivas perigosas).
- A abstração é tão fina que a dependência externa custa mais do que a implementação (ex: um helper de 10 linhas não precisa de uma lib).
- Requisitos regulatórios ou de compliance exigem controle total do código (contexto financeiro).

**Critérios de avaliação de dependência:**

| Critério | Aceitável | Sinal de alerta |
|---|---|---|
| Último release | < 6 meses | > 2 anos sem atividade |
| Issues abertas | Respondidas ativamente | Centenas ignoradas |
| Licença | MIT, Apache 2.0, BSD | GPL em projeto proprietário, sem licença |
| Dependências transitivas | Poucas e conhecidas | Árvore profunda com libs desconhecidas |
| Cobertura de testes | Tem CI visível | Sem testes ou CI |
| Documentação | Exemplos claros, API docs | README vazio ou desatualizado |

**Anti-Patterns:**

- Escrever seu próprio parser de JSON, CSV, XML, YAML, JWT, UUID, ou qualquer formato com spec definida.
- Implementar criptografia, hashing ou autenticação do zero. Usar bibliotecas auditadas é questão de segurança, não de preferência.
- Criar um "framework interno" que só o time usa e só uma pessoa entende.
- Rejeitar dependências por "não querer depender de terceiros" e depois gastar 10x mais tempo mantendo uma versão inferior.
- Copiar código de Stack Overflow ou LLMs sem entender o que faz e sem validar contra uma lib existente que já resolve.
- Escolher a lib com mais stars sem avaliar os critérios acima.

### 10. KISS — Keep It Simple, Stupid

A solução mais simples que resolve o problema é sempre a melhor escolha. Complexidade é um custo contínuo — cada abstração, cada indireção, cada camada adicional precisa justificar sua existência. Se não conseguimos explicar uma decisão em uma frase, provavelmente ela é complexa demais.

**Regras:**

- Prefira código explícito sobre código "inteligente". Legibilidade > cleverness.
- Antes de adicionar uma abstração, pergunte: "isso simplifica ou complica para quem vai ler depois?"
- Use a ferramenta mais simples que resolve o problema. Não traga um framework onde uma função resolve.
- Se um módulo precisa de um diagrama para ser entendido, ele precisa ser simplificado.
- Limite funções a uma responsabilidade clara e com no máximo ~20 linhas como guia (não regra rígida).

**Anti-Patterns:**

- Criar generalizações prematuras "porque talvez precisemos no futuro".
- Usar design patterns onde uma solução direta resolve.
- Adicionar camadas de abstração que só adicionam indireção sem valor.
- Escrever one-liners complexos para "economizar linhas".

### 11. YAGNI — You Aren't Gonna Need It

Não construa o que não precisa agora. Cada feature, abstração ou configuração que antecipamos "para o futuro" é código que precisa ser mantido, testado e entendido — tudo sem entregar valor hoje. O custo de manter código desnecessário é sempre maior do que o custo de adicioná-lo depois.

**Regras:**

- Implemente apenas o que é necessário para a iteração atual.
- Resista à tentação de "já que estou aqui, vou preparar para X". Se X não está no escopo, não faça.
- Quando surgir a tentação de generalizar, pergunte: "temos 2+ casos concretos que justificam isso?"
- Documente decisões de NÃO fazer algo com um breve comentário ou ADR quando relevante.
- Prefira soluções que são fáceis de estender depois sobre soluções que tentam prever todos os cenários.

**Anti-Patterns:**

- Criar interfaces/abstrações para um único implementador.
- Adicionar parâmetros de configuração que ninguém pediu.
- Implementar suporte a múltiplos bancos/provedores "por precaução".
- Construir um sistema de plugins quando só existe um plugin.

### 12. DRY — Don't Repeat Yourself

Cada conhecimento do sistema deve ter uma representação única e autoritativa. DRY não é sobre eliminar linhas duplicadas de código — é sobre eliminar duplicação de **conhecimento e lógica de negócio**. Duas funções podem ter código parecido e representar coisas diferentes; isso NÃO é violação de DRY. Mas duas funções que implementam a mesma regra de negócio em lugares diferentes? Isso é uma bomba-relógio.

**Regras:**

- Duplique código se necessário, mas NUNCA duplique lógica de negócio.
- Aplique a "Regra de 3": só extraia uma abstração quando o mesmo conhecimento aparece pela terceira vez.
- Centralize constantes, enums e configurações em locais únicos e bem documentados.
- Quando encontrar duplicação real, pergunte: "se eu mudar aqui, teria que mudar lá também?" Se sim, é violação de DRY.
- Mantenha a documentação próxima ao código. Documentação desatualizada é pior que nenhuma.

**Anti-Patterns:**

- Forçar DRY em código que parece igual mas representa conceitos diferentes (coupling acidental).
- Criar abstrações frágeis que acoplam módulos que deveriam ser independentes.
- Usar herança para compartilhar código entre classes sem relação semântica.
- Ignorar duplicação de regras de negócio em nome de "pragmatismo".

### 13. SOLID

Os cinco princípios SOLID são o alicerce do design orientado a objetos. Cada um reforça os outros e se complementa com KISS, YAGNI e DRY.

#### 13.1 Single Responsibility (SRP) — Uma razão para mudar

Cada módulo, classe ou função deve ter uma — e apenas uma — razão para mudar. Não significa "fazer uma coisa só", mas sim "pertencer a um único ator/domínio". Se o time de billing e o time de shipping precisam mudar a mesma classe, ela tem responsabilidades demais.

**Regras:**

- Se precisar usar "e" para descrever o que uma classe faz, ela provavelmente faz demais.
- Separe orquestração de execução: quem decide O QUE fazer não deve decidir COMO fazer.
- Services devem representar um caso de uso específico, não um "god service" do domínio.
- Controllers/handlers devem apenas rotear — lógica de negócio vai para o domínio.

**Anti-Patterns:**

- Classes "Manager", "Helper" ou "Utils" que viram lixeira de métodos sem relação.
- Um service que faz validação, persistência, notificação e logging tudo junto.

#### 13.2 Open/Closed (OCP) — Aberto para extensão, fechado para modificação

O comportamento de um módulo deve poder ser estendido sem modificar seu código-fonte. Não significa nunca mudar código existente — significa desenhar de forma que novos comportamentos sejam adições, não cirurgias.

**Regras:**

- Prefira composição sobre herança. Herança cria acoplamento forte e hierarquias frágeis.
- Use interfaces para definir contratos quando houver variação real (não especulativa — YAGNI!).
- Novos comportamentos devem ser implementáveis adicionando código, não editando switch/case existentes.
- Aplique OCP seletivamente: nem tudo precisa ser extensível. Foque nos pontos de variação conhecidos.

**Anti-Patterns:**

- Criar hierarquias de herança profundas "para ser extensível".
- Adicionar abstrações OCP onde só existe uma implementação (conflita com YAGNI).

#### 13.3 Liskov Substitution (LSP) — Subtipos devem ser substituíveis

Se S é subtipo de T, objetos de T podem ser substituídos por objetos de S sem quebrar o programa. Se seu `Penguin` herda de `Bird` mas lança exceção em `fly()`, você quebrou LSP.

**Regras:**

- Subclasses nunca devem enfraquecer as pré-condições ou fortalecer as pós-condições da classe base.
- Se precisar verificar o tipo concreto para decidir comportamento, o design provavelmente viola LSP.
- Prefira composição quando a relação "é-um" não é verdadeiramente semântica.
- Testes da classe base devem passar para qualquer subclasse sem modificação.

**Anti-Patterns:**

- Herdar e lançar `NotImplementedException` em métodos obrigatórios.
- Criar hierarquias onde subclasses ignoram ou contradizem o comportamento do pai.

#### 13.4 Interface Segregation (ISP) — Interfaces coesas e específicas

Nenhum cliente deve ser forçado a depender de métodos que não utiliza. Interfaces grandes e "gordas" forçam implementadores a carregar bagagem desnecessária.

**Regras:**

- Prefira várias interfaces pequenas e focadas sobre uma interface grande e genérica.
- Defina interfaces do ponto de vista do consumidor, não do implementador.
- Se uma interface tem métodos que alguns implementadores deixam vazios, ela precisa ser quebrada.
- Role interfaces (`IReadable`, `IWritable`) são preferíveis a header interfaces (`IFile` com 20 métodos).

**Anti-Patterns:**

- Interface `IRepository` com 15 métodos quando a maioria dos consumidores usa apenas 2-3.
- Forçar implementação de métodos como stubs vazios ou com `throw new NotImplementedException()`.

#### 13.5 Dependency Inversion (DIP) — Dependa de abstrações, não de concretos

Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações. Mas atenção: abstrações só fazem sentido quando há variação real ou necessidade de testabilidade.

**Regras:**

- Use injeção de dependência para infraestrutura (banco, APIs externas, file system).
- O domínio define as interfaces; a infraestrutura as implementa.
- Não crie abstrações para tudo — código interno estável pode depender diretamente (KISS + YAGNI).
- Testes são cidadãos de primeira classe: DIP facilita testes unitários isolados.

**Anti-Patterns:**

- Criar interfaces para cada classe do sistema sem necessidade real.
- Injetar dependências de coisas que nunca mudarão (ex: string utils).
- Usar service locator em vez de injeção explícita de dependência.

---

## PARTE III — RESOLUÇÃO DE TENSÕES E APLICAÇÃO PRÁTICA

### Como os Princípios se Complementam

Estes princípios formam um sistema de checks and balances onde um modera o outro:

| Tensão | Como Resolver |
|---|---|
| **SOLID vs YAGNI** | Aplique SOLID onde há complexidade real. Se só existe uma implementação e nenhuma variação prevista, uma solução simples e direta é mais SOLID do que uma abstração prematura. |
| **DRY vs KISS** | Se eliminar duplicação cria uma abstração que ninguém entende, prefira a duplicação. DRY aplica-se a conhecimento, não a linhas de código. |
| **KISS vs SOLID** | SOLID não é sinônimo de complexidade. SRP bem aplicado simplifica. Se aplicar um princípio SOLID torna o código mais difícil de entender, reavalie. |
| **YAGNI vs DRY** | Não crie abstrações DRY para duplicações que ainda não existem. Espere o terceiro caso concreto. |
| **DIP vs KISS** | Injete dependências para infraestrutura e fronteiras do sistema. Para lógica interna estável, dependências diretas são mais simples e aceitáveis. |
| **95% Rule vs Velocidade** | Velocidade sem confiança gera retrabalho. Parar para perguntar é sempre mais rápido do que refazer. |
| **Testes vs YAGNI** | Testes nunca são YAGNI. O teste do comportamento atual é necessidade presente, não antecipação de futuro. Mas não teste cenários especulativos que não existem. |
| **Error Handling vs KISS** | Tratar erros corretamente adiciona código, mas nunca adiciona complexidade desnecessária. Um try-catch bem posicionado é mais simples que debugar um erro silencioso em produção. |
| **Não Reinvente vs YAGNI** | Adotar uma lib para um problema real não é YAGNI — é pragmatismo. Mas adicionar uma lib "porque talvez usemos os outros 40 features dela" é. Importe para resolver o problema atual. |
| **Não Reinvente vs KISS** | Se a lib resolve mas traz 50 dependências transitivas e uma API barroca, avalie se uma implementação simples e direta não é mais KISS. A regra é não reinventar, não adotar complexidade cegamente. |

### Checklist de Decisão Técnica

Antes de cada decisão técnica significativa, passe por este checklist:

| # | Pergunta | Princípio |
|---|---|---|
| 1 | Tenho 95%+ de certeza sobre o que devo fazer? | **Confiança** |
| 2 | A task anterior está 100% completa? | **Completude** |
| 3 | Já existe uma lib/ferramenta que resolve isso? | **Não Reinvente** |
| 4 | Preciso disso agora ou estou antecipando? | **YAGNI** |
| 5 | Existe uma solução mais simples que resolve? | **KISS** |
| 6 | Estou duplicando conhecimento/lógica de negócio? | **DRY** |
| 7 | Esta classe/módulo tem mais de uma razão para mudar? | **SRP** |
| 8 | Posso estender sem modificar código existente? | **OCP** |
| 9 | Subtipos respeitam o contrato da classe base? | **LSP** |
| 10 | Estou forçando dependência de métodos não utilizados? | **ISP** |
| 11 | Módulos de alto nível dependem de concretos? | **DIP** |
| 12 | A lógica de negócio tem teste unitário? | **Testes** |
| 13 | Erros estão sendo tratados explicitamente ou engolidos? | **Error Handling** |

### Aplicação em Code Reviews

Em toda code review, validamos contra nossos princípios. Não como burocracia, mas como linguagem comum. Quando alguém comenta "isso viola SRP" ou "parece YAGNI", todo mundo sabe exatamente o que significa e por que importa.

**Regra de ouro:** se não conseguimos explicar por que uma decisão técnica é necessária usando a linguagem destes princípios, provavelmente ela não é necessária.

---

## PARTE IV — APRENDIZADO COM OPEN SOURCE

### Por que explorar projetos open source

Usar open source é obrigatório (seção 9). Mas **ler** open source é o que separa quem usa ferramentas de quem entende engenharia. Projetos maduros são aulas vivas de arquitetura, trade-offs e erros reais — tudo auditável via código e histórico de git.

Esta seção define o método técnico para explorar qualquer projeto clonado localmente.

**Mapeie a anatomia do projeto antes de ler qualquer código:**

```bash
# Estrutura de diretórios (2 níveis, ignorando ruído)
tree -L 2 -I 'node_modules|vendor|__pycache__|.git|dist|build|target|.venv'

# Linguagens e proporção de código
find . -type f | sed 's/.*\.//' | sort | uniq -c | sort -rn | head -15

# Entrypoints — onde o programa começa
grep -rn "def main\|func main\|if __name__\|bin/\|cmd/" --include="*.py" --include="*.go" --include="*.ts" --include="*.rs" -l

# Dependências — o que o projeto usa
cat requirements.txt pyproject.toml package.json Cargo.toml go.mod pom.xml 2>/dev/null
```

### Fase 1: Ler a Arquitetura (Não o Código)

Antes de ler uma linha de código, esgote a documentação de design.

```bash
# ADRs — Architecture Decision Records
find . -type f -path "*/adr/*" -o -path "*/decisions/*" -o -path "*/rfcs/*" | head -20

# Design docs, specs, proposals
find . -type f \( -name "ARCHITECTURE.md" -o -name "DESIGN.md" -o -name "CONTRIBUTING.md" \
  -o -name "INTERNALS.md" -o -name "HACKING.md" -o -name "DEVELOPMENT.md" \)

# Comentários de arquitetura no código
grep -rn "ARCHITECTURE\|DESIGN NOTE\|NOTE:\|IMPORTANT:\|WHY:" --include="*.py" --include="*.go" --include="*.ts" --include="*.rs" | head -30
```

**O que procurar:**

- Quais problemas motivaram as decisões de design?
- O que foi **rejeitado** e por quê? (mais valioso que o que foi aceito)
- Quais trade-offs foram feitos conscientemente?

### Fase 2: Rastrear um Fluxo Completo

Escolha **um** fluxo concreto (uma request HTTP, um comando CLI, um evento processado) e siga do ponto de entrada até o resultado final.

```bash
# Encontre o ponto de entrada do fluxo
# Exemplo: como uma request chega e é processada
grep -rn "app.route\|@app.get\|@app.post\|HandleFunc\|router\." --include="*.py" --include="*.go" --include="*.ts" -l

# Siga as camadas — onde a request vai depois do handler?
# Procure por padrões de delegação
grep -rn "service\.\|repository\.\|usecase\.\|handler\.\|controller\." --include="*.py" --include="*.go" --include="*.ts" | head -30

# Identifique interfaces e contratos
grep -rn "class.*ABC\|Protocol\|interface \|trait \|abstract class" --include="*.py" --include="*.go" --include="*.ts" --include="*.rs" --include="*.java"

# Mapeie as camadas de abstração
grep -rn "def __init__\|func New\|constructor" --include="*.py" --include="*.go" --include="*.ts" | grep -i "service\|repo\|client\|handler" | head -20
```

**Documente o fluxo enquanto lê:**

```
ENTRADA → handler/controller
  → validação (onde? como?)
  → lógica de negócio (qual módulo? usa interfaces?)
  → persistência/IO (como abstrai? DIP?)
  → resposta/output (tratamento de erro? formato?)
```

### Fase 3: Dissecar o Sistema de Testes

O test suite é a documentação mais honesta de qualquer projeto — mostra o que o time **realmente** se preocupa em proteger.

```bash
# Estrutura de testes
find . -type f -name "*test*" -o -name "*spec*" | head -30

# Proporção código vs teste
echo "Código:" && find . -type f \( -name "*.py" -o -name "*.go" -o -name "*.ts" \) ! -name "*test*" ! -name "*spec*" ! -path "*/test/*" | wc -l
echo "Testes:" && find . -type f \( -name "*test*" -o -name "*spec*" \) | wc -l

# Que tipo de testes existem?
grep -rn "mock\|Mock\|patch\|stub\|fake\|spy" --include="*test*" --include="*spec*" | wc -l    # Mocks = unitários
grep -rn "testcontainers\|docker\|database\|integration" --include="*test*" --include="*spec*" -l  # Integração
grep -rn "e2e\|end.to.end\|selenium\|playwright\|cypress" --include="*test*" --include="*spec*" -l # E2E

# Fixtures e helpers — o que o time abstraiu para testar
find . -type f -path "*/test*" \( -name "conftest*" -o -name "fixture*" -o -name "helper*" -o -name "factory*" -o -name "builder*" \)

# Leia os testes mais comentados — ali está a complexidade real
find . -type f \( -name "*test*" -o -name "*spec*" \) -exec wc -l {} + | sort -rn | head -10
```

**Perguntas-chave:**

- Pirâmide de testes está correta? (muitos unitários, poucos E2E?)
- O que é mockado e o que usa implementação real?
- Existem testes de edge case e cenários de erro?
- Como resolveram setup/teardown de estado?

### Fase 4: Arqueologia de Git

O histórico de git conta a história real do projeto — não a história que gostariam de contar.

```bash
# Evolução geral — ritmo e saúde do projeto
git log --oneline --graph --all | head -50
git shortlog -sn --no-merges | head -10           # Quem mais contribui

# BREAKING CHANGES — o que o time aprendeu que estava errado
git log --all --oneline --grep="breaking\|BREAKING" | head -20
git log --all --oneline --grep="revert\|Revert" | head -20
git log --all --oneline --grep="fix\|hotfix\|bugfix" | head -30

# Arquivos mais alterados — onde mora a complexidade real
git log --pretty=format: --name-only | sort | uniq -c | sort -rn | head -20

# Commits mais discutidos (PRs grandes = decisões difíceis)
git log --oneline --all | wc -l                    # Total de commits
git log --merges --oneline | head -20              # PRs mergeados

# Evolução de um arquivo específico que te interessou
git log --oneline --follow -- <caminho/do/arquivo>
git log -p --follow -- <caminho/do/arquivo> | head -200   # Com diff

# Como tratam migrations e breaking changes entre versões
git tag -l | sort -V                               # Versões
git log --oneline v1.0.0..v2.0.0 | head -30       # O que mudou entre majors
```

**Perguntas-chave:**

- Quais arquivos mudam junto? (acoplamento real, não teórico)
- Quais áreas têm mais hotfixes? (fragilidade)
- Como foi a evolução de v1 para v2? O que quebraram e por quê?

### Fase 5: Analisar Error Handling e Resiliência

Como o projeto lida com falhas revela a maturidade real da engenharia.

```bash
# Padrões de error handling
grep -rn "try:\|except\|catch\|panic\|unwrap\|expect(" --include="*.py" --include="*.go" --include="*.rs" --include="*.ts" | wc -l
grep -rn "except Exception\|catch (Exception\|catch (error\|catch(err" --include="*.py" --include="*.ts" --include="*.java" | head -20  # Catches genéricos = red flag

# Erros customizados / de domínio
grep -rn "class.*Error\|class.*Exception\|type.*error struct\|enum.*Error" --include="*.py" --include="*.go" --include="*.ts" --include="*.rs" | head -20

# Retry, circuit breaker, fallback
grep -rn "retry\|backoff\|circuit.breaker\|fallback\|timeout" --include="*.py" --include="*.go" --include="*.ts" --include="*.rs" -l

# Logging — estruturado ou printf?
grep -rn "log\.\|logger\.\|logging\.\|slog\.\|tracing::" --include="*.py" --include="*.go" --include="*.ts" --include="*.rs" | head -10
```

### Fase 6: Mapear Padrões e Anti-Patterns

```bash
# Design patterns em uso
grep -rn "Factory\|Builder\|Strategy\|Observer\|Singleton\|Adapter\|Decorator" --include="*.py" --include="*.go" --include="*.ts" --include="*.rs" --include="*.java" -l

# Dependency injection — como resolvem
grep -rn "inject\|@Inject\|wire\|provide\|container\|Depends(" --include="*.py" --include="*.go" --include="*.ts" --include="*.java" -l

# God classes — arquivos gigantes = possível violação de SRP
find . -type f \( -name "*.py" -o -name "*.go" -o -name "*.ts" -o -name "*.rs" \) ! -name "*test*" ! -path "*/test/*" -exec wc -l {} + | sort -rn | head -15

# Complexidade ciclomática (se tiver ferramentas)
# Python: pip install radon && radon cc <path> -a
# Go: gocyclo
# TS: npx ts-complexity
```

### Template de Documentação por Projeto

Após cada exploração, registre os achados neste formato:

```markdown
# [Nome do Projeto] — Exploração

**Data:** YYYY-MM-DD
**Explorado por:** Nome
**Pergunta investigada:** "Como o projeto X resolve o problema Y?"

## Contexto
- O que o projeto faz e por que existe
- Qual problema específico investiguei

## Estrutura
- Camadas identificadas (handler → service → repository → ...)
- Onde mora a lógica de negócio vs infraestrutura

## Decisões de Design
- O que fizeram e por quê
- O que rejeitaram e por quê (ADRs, RFCs, issues)

## Padrões Encontrados
- [ ] SRP respeitado?
- [ ] DIP nas fronteiras?
- [ ] Testes: pirâmide correta?
- [ ] Error handling: fail-fast?
- [ ] Não reinventaram (usaram libs maduras)?

## Aprendizados para o Nosso Contexto
### O que fazer (aplicar)
- ...

### O que NÃO fazer (evitar)
- ...

### O que adaptar (inspiração, não cópia)
- ...

## Referências
- Links para ADRs, issues, PRs relevantes
```

### Projetos Recomendados por Área

| Área | Projeto | O que estudar |
|---|---|---|
| API Design & DX | FastAPI | Como type hints viram validação, docs e serialização automaticamente |
| CLI & UX | cobra (Go), click (Python) | Composição de comandos, help generation, error handling em CLI |
| Distributed Systems | etcd, NATS | Consenso, replicação, como lidam com partições de rede |
| Platform Engineering | Crossplane | CRDs como abstração, reconciliation loops, provider pattern |
| Platform Engineering | CloudNativePG | Operator pattern, failover automático, backup management |
| Platform Engineering | Backstage | Plugin architecture, catalog model, como escalaram extensibilidade |
| Container Runtime | containerd | Separação de concerns, interface entre runtime e orchestrator |
| Observability | OpenTelemetry Collector | Pipeline pattern, receivers/processors/exporters como plugins |
| Voice/Real-time | LiveKit | WebRTC abstraction, room management, media routing |
| Voice/Real-time | Whisper.cpp | Otimização de inferência, GGML, portabilidade sem Python |
| Database | CockroachDB, Vitess | Sharding, transações distribuídas, migration handling |
| Auth | Keycloak, Ory Hydra | OAuth2/OIDC flows, token management, multi-tenancy |

---

## Compromisso do Time

Estes princípios são inquebráveis não porque são perfeitos, mas porque escolhemos coletivamente segui-los. Eles podem e devem evoluir — mas qualquer mudança passa por discussão aberta do time e consenso. Ninguém os quebra sozinho, e ninguém os muda sozinho.

**Código bom não é o que demonstra que somos inteligentes. É o que demonstra que respeitamos quem vai ler depois.**
