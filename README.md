# Simulador de Economia Solar

Bem-vindo ao projeto **Simulador de Economia Solar**!

Este sistema permite calcular, simular e visualizar o potencial de economia ao instalar energia solar em qualquer região do Brasil, com personalização avançada do kit, simulação de financiamento, comparativo ambiental e exportação de orçamento.

## Funcionalidades

- **Cálculo por Estado:** Tarifas reais de energia de todos os estados do Brasil (ANEEL 2025).
- **Personalização do Kit:** Escolha de módulos, inversores, fontes extras (bateria, gerador, híbrido), estrutura, área disponível e inclinação.
- **Cálculo Geográfico:** Simulação por cidade/CEP, irradiação solar, sombreamento.
- **Simulação de Financiamento:** Entrada, prazo, juros, cálculo de parcelas e total pago.
- **Comparativo Ambiental:** CO₂ evitado, árvores equivalentes.
- **Gráficos Interativos:** Economia acumulada, payback, lucro ao longo dos anos.
- **Exportação:** Geração de orçamento em PDF, integração WhatsApp, contato comercial.
- **Dark Mode e Multi-idioma:** Experiência visual moderna e acessível.

## Como usar

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Inicie o projeto:**
   ```bash
   npm run dev
   ```
3. **Acesse no navegador:**
   [http://localhost:5173](http://localhost:5173)

## Estrutura do Projeto

- `src/components/SimuladorEconomiaSolar.tsx`: Componente principal do simulador.
- `src/`: Demais componentes, estilos e utilitários.
- `public/`: Arquivos estáticos.

## Personalização

- Adicione novos módulos, inversores, baterias ou geradores nos arrays do arquivo `SimuladorEconomiaSolar.tsx`.
- Ajuste tarifas, perfis ou textos conforme sua necessidade.

## Exportação e Integração

- Gere orçamento em PDF com um clique.
- Envie dados direto para WhatsApp ou solicite contato comercial.

## Dúvidas Frequentes

- O sistema funciona em dias nublados? Sim, mas com menor geração.
- Precisa de manutenção? Baixa, apenas limpeza e inspeção anual.
- Posso zerar a conta de luz? Na maioria dos casos, sim.
- Qual a vida útil dos equipamentos? Módulos: 25 anos, inversores: 8-12 anos.
- O que é payback? Tempo para o investimento se pagar com a economia gerada.

## Contribuição

Pull requests são bem-vindos! Sinta-se à vontade para sugerir melhorias, novas funcionalidades ou correções.

## Licença

Este projeto é open source e pode ser utilizado livremente.

---

**Desenvolvido por RuasCardi e colaboradores.**

Dúvidas, sugestões ou integração comercial? Use o WhatsApp ou o botão de contato no simulador.
