# 🌱 EcoHub - Joinville

O EcoHub é uma aplicação web para conscientizar e estimular doações a ONGs ambientais da cidade de Joinville, conectando pessoas a doação de causas sustentáveis.

## ✨ Funcionalidades Implementadas

### 📊 **Dashboard Principal**
- **Visão geral das ONGs**: Exibição de todas as ONGs ambientais ativas
- **Resumo de metas**: Painel com estatísticas gerais (total arrecadado, meta total, metas atingidas)
- **Cards informativos**: Cada ONG é apresentada com:
  - Informações detalhadas da instituição
  - Progresso visual da meta (barra de progresso)
  - Status de meta atingida com destaque visual
  - Botão de ação para doação

### 💰 **Tela de Doação**
- **Formulário intuitivo**: Interface moderna para realizar doações
- **Validações robustas**: Verificação de valores válidos
- **Valores sugeridos**: Chips clicáveis com valores pré-definidos (R$ 50, 100, 200, 500)
- **Botão Cancelar**: Implementado conforme solicitado, permitindo retorno seguro
- **Feedback visual**: Confirmação de doação com animação de sucesso
- **Navegação clara**: Botão "Voltar às ONGs" sempre visível

### 🎨 **Design e UX**
- **Material-UI**: Interface moderna e responsiva
- **Tema personalizado**: Cores focadas em sustentabilidade (tons de verde)
- **Animações suaves**: Transições e hover effects
- **Layout responsivo**: Adaptação para diferentes tamanhos de tela
- **Indicadores visuais**: Chips e badges para status especiais

## 🏗️ **Arquitetura do Projeto**
- **Arquitetura**: Baseado no padrão Atomic Design, apenas substituido o Template pelo Context devido a estrutura dessa aplicação. 
```
src/
├── pages/
│   ├── Dashboard.tsx     # Página principal com lista de ONGs
│   └── Doacao.tsx       # Página de doação com botão cancelar
├── components/
│   ├── molecules/
│   │   └── CardONG.tsx  # Card individual da ONG
│   └── organisms/
│       └── Header.tsx   # Cabeçalho com navegação
├── services/
│   └── storage.ts       # Gerenciamento de dados das ONGs
├── types/
│   └── ONG.ts          # Interface TypeScript
└── assets/
   
```

## 🚀 **Como Executar**

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acessar a aplicação:**
   ```
   http://localhost:5173
   ```

## 🎯 **ONGs Cadastradas**

1. **Instituto Caranguejo de Educação Ambiental**
   - Meta: R$ 10.000
   - Foco: Educação ambiental

2. **Instituto Neo Carbon**
   - Meta: R$ 15.000
   - Foco: Mitigação climática

3. **Instituto Viva a Cidade (IVC)**
   - Meta: R$ 12.000 (✅ Meta atingida!)
   - Foco: Revitalização do Rio Cachoeira

4. **Fundação do Meio Ambiente (IMA)**
   - Meta: R$ 20.000
   - Foco: Políticas públicas ambientais

## 💻 **Tecnologias Utilizadas**

- **React 18** com TypeScript
- **Material-UI (MUI)** para componentes
- **React Router** para navegação
- **Vite** como bundler
- **LocalStorage** para persistência

## 🔄 **Fluxo de Navegação**

1. **Página Inicial**: Visualização das ONGs e suas metas
2. **Seleção de ONG**: Click no botão "Fazer Doação"
3. **Tela de Doação**: Formulário com informações detalhadas
4. **Opções do usuário**:
   - ✅ **Confirmar Doação**: Processa e retorna com sucesso
   - ❌ **Cancelar**: Retorna à página inicial (conforme solicitado)

## 🎨 **Recursos Visuais**

- **Indicadores de progresso**: Barras coloridas mostrando o progresso das metas
- **Status de meta**: ONGs que atingiram a meta recebem destaque especial
- **Responsividade**: Layout adaptativo para desktop, tablet e mobile
- **Acessibilidade**: Uso de cores contrastantes e navegação por teclado

## 📱 **Responsividade**

A aplicação foi desenvolvida com design responsivo, adaptando-se a:
- **Desktop**: Layout em grid com múltiplas colunas
- **Tablet**: Ajuste automático das colunas
- **Mobile**: Layout em coluna única com componentes otimizados

---

**Desenvolvido para conectar a comunidade FuturoDev ao programa JoinvilleMaisTec às causas ambientais locais! 🌿**
