import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Tarifas reais atualizadas (ANEEL 2025)
const tarifas = [
  { estado: 'PA', nome: 'Pará', tarifa: 0.938 },
  { estado: 'MS', nome: 'Mato Grosso do Sul', tarifa: 0.870 },
  { estado: 'RJ', nome: 'Rio de Janeiro', tarifa: 0.870 },
  { estado: 'AL', nome: 'Alagoas', tarifa: 0.863 },
  { estado: 'AM', nome: 'Amazonas', tarifa: 0.857 },
  { estado: 'MT', nome: 'Mato Grosso', tarifa: 0.847 },
  { estado: 'PI', nome: 'Piauí', tarifa: 0.829 },
  { estado: 'TO', nome: 'Tocantins', tarifa: 0.823 },
  { estado: 'BA', nome: 'Bahia', tarifa: 0.821 },
  { estado: 'AP', nome: 'Amapá', tarifa: 0.808 },
  { estado: 'MG', nome: 'Minas Gerais', tarifa: 0.796 },
  { estado: 'AC', nome: 'Acre', tarifa: 0.791 },
  { estado: 'GO', nome: 'Goiás', tarifa: 0.745 },
  { estado: 'PE', nome: 'Pernambuco', tarifa: 0.744 },
  { estado: 'DF', nome: 'Distrito Federal', tarifa: 0.743 },
  { estado: 'RO', nome: 'Rondônia', tarifa: 0.727 },
  { estado: 'CE', nome: 'Ceará', tarifa: 0.722 },
  { estado: 'RN', nome: 'Rio Grande do Norte', tarifa: 0.722 },
  { estado: 'MA', nome: 'Maranhão', tarifa: 0.711 },
  { estado: 'RS', nome: 'Rio Grande do Sul', tarifa: 0.701 },
  { estado: 'ES', nome: 'Espírito Santo', tarifa: 0.682 },
  { estado: 'SP', nome: 'São Paulo', tarifa: 0.671 },
  { estado: 'SE', nome: 'Sergipe', tarifa: 0.666 },
  { estado: 'RR', nome: 'Roraima', tarifa: 0.661 },
  { estado: 'PR', nome: 'Paraná', tarifa: 0.629 },
  { estado: 'SC', nome: 'Santa Catarina', tarifa: 0.618 },
  { estado: 'PB', nome: 'Paraíba', tarifa: 0.588 },
];

const modulosDisponiveis = [
  { marca: 'JA Solar', modelo: 'JAM72S30-550/MR', potencia: 550, preco: 950 },
  { marca: 'Canadian Solar', modelo: 'CS6W-550MS', potencia: 550, preco: 980 },
  { marca: 'Trina Solar', modelo: 'TSM-DE18M(II)-550', potencia: 550, preco: 970 },
  { marca: 'BYD', modelo: 'BYD-440M6', potencia: 440, preco: 780 },
  { marca: 'Risen', modelo: 'RSM120-410M', potencia: 410, preco: 720 },
  { marca: 'LONGi', modelo: 'LR5-72HPH-540M', potencia: 540, preco: 940 },
  { marca: 'Jinko', modelo: 'JKM475M-7RL3-TV', potencia: 475, preco: 850 },
  { marca: 'Canadian Solar', modelo: 'CS3W-410MS', potencia: 410, preco: 730 },
  { marca: 'Trina Solar', modelo: 'TSM-DE09.08-405', potencia: 405, preco: 710 },
];
const inversoresDisponiveis = [
  { marca: 'Fronius', modelo: 'Primo 5.0-1', potencia: 5, preco: 6500 },
  { marca: 'Solis', modelo: 'Solis-5K-1P', potencia: 5, preco: 5200 },
  { marca: 'Growatt', modelo: 'MIN 5000TL-X', potencia: 5, preco: 4800 },
  { marca: 'Huawei', modelo: 'SUN2000-10KTL', potencia: 10, preco: 9800 },
  { marca: 'SMA', modelo: 'Sunny Boy 6.0', potencia: 6, preco: 7200 },
  { marca: 'ABB', modelo: 'UNO-DM-3.3-TL-PLUS', potencia: 3.3, preco: 3900 },
  { marca: 'WEG', modelo: 'WEG-Solar-8K', potencia: 8, preco: 8500 }
  ];
// Fontes (opcional, para kits híbridos ou off-grid)
const fontesDisponiveis = [
  { tipo: 'Nenhuma', descricao: 'Sem fonte extra' },
  { tipo: 'Rede elétrica', descricao: 'Convencional (On-grid)' },
  { tipo: 'Bateria', descricao: 'Backup com baterias' },
  { tipo: 'Gerador', descricao: 'Gerador auxiliar' },
  { tipo: 'Híbrido', descricao: 'Solar + Rede + Bateria' },
];

// Novas opções reais de baterias e geradores
const bateriasDisponiveis = [
  { marca: 'BYD', modelo: 'B-Box Pro 13.8', capacidade: 13.8, preco: 32000 },
  { marca: 'Pylontech', modelo: 'US2000', capacidade: 2.4, preco: 6500 },
  { marca: 'Freedom', modelo: 'DF200', capacidade: 5, preco: 9000 },
];
const geradoresDisponiveis = [
  { marca: 'Honda', modelo: 'EG6500', potencia: 5.5, preco: 7800 },
  { marca: 'WEG', modelo: 'GMP22', potencia: 8, preco: 12000 },
  { marca: 'Toyama', modelo: 'TDG8000E', potencia: 7, preco: 9500 },
];

const estruturaPrecoPorKW = 400;
const perfis = [
  { tipo: 'residencial', nome: 'Residencial', fator: 1 },
  { tipo: 'comercial', nome: 'Comercial', fator: 1.08 },
  { tipo: 'rural', nome: 'Rural', fator: 1.15 }
];

const textos = {
  pt: {
    simulador: 'Simule sua Economia Solar',
    consumo: 'Consumo médio mensal (kWh):',
    valor: 'Valor médio da conta (R$):',
    estado: 'Estado:',
    perfil: 'Perfil de consumo:',
    calcular: 'Calcular Economia',
    economia: 'Economia estimada',
    kit: 'Kit sugerido para seu consumo:',
    modulos: 'módulos',
    inversor: 'inversor(es)',
    area: 'de área estimada para instalação',
    valorKit: 'Valor estimado do kit',
    economiaAnual: 'Economia anual',
    payback: 'Payback estimado',
    anos: 'anos',
    baixarPdf: 'Baixar orçamento PDF',
    enviarEmail: 'Enviar por e-mail',
    faq: 'Dúvidas frequentes sobre energia solar:',
    financiamento: 'Simular financiamento',
    parcelas: 'Parcelas',
    juros: 'Juros ao ano',
    valorParcela: 'Valor da parcela',
    contato: 'Solicitar contato',
    whatsapp: 'WhatsApp',
    co2: 'CO₂ evitado',
    arvores: 'Árvores equivalentes',
    idioma: 'Idioma',
    dark: 'Modo escuro',
    claro: 'Modo claro',
  },
  en: {},
  es: {},
};

function t(idioma: 'pt' | 'en' | 'es', chave: keyof typeof textos['pt']) {
  const dict = textos[idioma] as typeof textos['pt'];
  return (dict && dict[chave]) || textos['pt'][chave] || chave;
}

const SimuladorEconomiaSolar: React.FC = () => {
  const [tipo, setTipo] = useState<'kwh' | 'valor'>('kwh');
  const [consumo, setConsumo] = useState('');
  const [estado, setEstado] = useState(tarifas[0].estado);
  const [perfil, setPerfil] = useState(perfis[0].tipo);
  const [moduloIdx, setModuloIdx] = useState(0);
  const [inversorIdx, setInversorIdx] = useState(0);
  const [fonteIdx, setFonteIdx] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [idioma, setIdioma] = useState<'pt' | 'en' | 'es'>('pt');

  // Campos opcionais do usuário
  const [areaDisponivel, setAreaDisponivel] = useState('');
  const [inclinacao, setInclinacao] = useState('');
  const [estrutura, setEstrutura] = useState('telhado');
  const [bateriaIdx, setBateriaIdx] = useState(0);
  const [geradorIdx, setGeradorIdx] = useState(0);

  // Campos geográficos
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [sombreamento, setSombreamento] = useState('');

  // Financiamento
  const [entrada, setEntrada] = useState('');
  const [prazo, setPrazo] = useState('');
  const [juros, setJuros] = useState('');

  // Simulação de irradiação solar média (kWh/m²/dia) por cidade/CEP
  function obterIrradiacao() {
    // Simulação: se CEP/cidade informado, retorna valor típico da região
    if (cep.startsWith('68') || cidade.toLowerCase().includes('manaus')) return 5.0; // Norte
    if (cep.startsWith('71') || cidade.toLowerCase().includes('brasilia')) return 5.5; // Centro-Oeste
    if (cep.startsWith('80') || cidade.toLowerCase().includes('curitiba')) return 4.5; // Sul
    if (cep.startsWith('01') || cidade.toLowerCase().includes('sao paulo')) return 5.2; // Sudeste
    if (cep.startsWith('40') || cidade.toLowerCase().includes('salvador')) return 5.7; // Nordeste
    return 5.3; // Média nacional
  }
  const irradiacao = obterIrradiacao();
  // Ajuste por sombreamento (opcional)
  let fatorSombra = 1;
  if (sombreamento && !isNaN(Number(sombreamento))) {
    const sombra = Number(sombreamento);
    if (sombra > 0 && sombra <= 100) fatorSombra = 1 - sombra / 100;
  }

  // Cálculo principal
  const tarifa = tarifas.find(t => t.estado === estado)?.tarifa || 1;
  let consumoKwh = 0;
  if (tipo === 'kwh') {
    consumoKwh = parseFloat(consumo.replace(',', '.'));
  } else {
    const valor = parseFloat(consumo.replace(',', '.'));
    consumoKwh = valor / tarifa;
  }
  const modulo = modulosDisponiveis[moduloIdx];
  const inversor = inversoresDisponiveis[inversorIdx];
  const fonte = fontesDisponiveis[fonteIdx];
  const fatorPerfil = perfis.find(p => p.tipo === perfil)?.fator || 1;
  // Cálculo geográfico se cidade/CEP informado
  let kWp = consumoKwh > 0 ? consumoKwh / (30 * 5 * 0.8 * fatorPerfil) : 0;
  let modulosQtd = kWp > 0 ? Math.ceil((kWp * 1000) / modulo.potencia) : 0;
  let potencia = modulosQtd * modulo.potencia / 1000;
  let area = modulosQtd * 2.1;
  let economia = consumoKwh > 0 ? consumoKwh * tarifa * 0.95 : 0;
  let economiaAnual = economia * 12;
  let inversorQtd = potencia > 0 ? Math.ceil(potencia / inversor.potencia) : 0;
  let preco = modulosQtd * modulo.preco + inversorQtd * inversor.preco + potencia * estruturaPrecoPorKW;
  if (cidade || cep) {
    kWp = consumoKwh > 0 ? consumoKwh / (irradiacao * 30 * fatorPerfil * fatorSombra) : 0;
    modulosQtd = kWp > 0 ? Math.ceil((kWp * 1000) / modulo.potencia) : 0;
    potencia = modulosQtd * modulo.potencia / 1000;
    area = modulosQtd * 2.1;
    economia = consumoKwh > 0 ? consumoKwh * tarifa * 0.95 * fatorSombra : 0;
    economiaAnual = economia * 12;
    inversorQtd = potencia > 0 ? Math.ceil(potencia / inversor.potencia) : 0;
    preco = modulosQtd * modulo.preco + inversorQtd * inversor.preco + potencia * estruturaPrecoPorKW;
  }
  // Custo extra conforme fonte
  let precoFonte = 0;
  // Impacto real da bateria selecionada
  if ((fonte.tipo === 'Bateria' || fonte.tipo === 'Híbrido') && bateriaIdx >= 0 && bateriasDisponiveis[bateriaIdx]) {
    precoFonte += bateriasDisponiveis[bateriaIdx].preco;
    // Se quiser, pode ajustar autonomia, economia, etc. aqui
  }
  if ((fonte.tipo === 'Gerador' || fonte.tipo === 'Híbrido') && geradorIdx >= 0 && geradoresDisponiveis[geradorIdx]) {
    precoFonte += geradoresDisponiveis[geradorIdx].preco;
    // Se quiser, pode ajustar economia, etc. aqui
  }
  const precoTotal = preco + precoFonte;
  const payback = economiaAnual > 0 ? precoTotal / economiaAnual : 0;
  const co2Evitado = consumoKwh > 0 ? consumoKwh * 0.085 * 12 * 25 : 0;
  const arvoresEquivalentes = co2Evitado / 20;

  // Simulação de financiamento (cálculo único, sem duplicidade, nunca NaN)
  const valorEntrada = isNaN(parseFloat(entrada.replace(',', '.'))) ? 0 : parseFloat(entrada.replace(',', '.'));
  const valorFinanciado = Math.max(0, precoTotal - valorEntrada);
  const taxaJuros = isNaN(parseFloat(juros.replace(',', '.'))) ? 0 : Math.max(0, parseFloat(juros.replace(',', '.')) / 100);
  const numeroParcelas = isNaN(parseInt(prazo, 10)) ? 1 : Math.max(1, parseInt(prazo, 10));
  // Prestação mensal (sistema francês)
  let parcela = 0;
  if (valorFinanciado > 0 && numeroParcelas > 0) {
    parcela = taxaJuros > 0
      ? (valorFinanciado * taxaJuros) / (1 - Math.pow(1 + taxaJuros, -numeroParcelas))
      : valorFinanciado / numeroParcelas;
    if (isNaN(parcela) || !isFinite(parcela)) parcela = 0;
  }
  let totalPago = 0;
  if (parcela > 0 && numeroParcelas > 0) {
    totalPago = parcela * numeroParcelas + valorEntrada;
    if (isNaN(totalPago) || !isFinite(totalPago)) totalPago = 0;
  }
  let jurosTotais = 0;
  if (totalPago > 0) {
    jurosTotais = totalPago - precoTotal;
    if (isNaN(jurosTotais) || !isFinite(jurosTotais)) jurosTotais = 0;
  }

  // Gráfico de economia acumulada
  const anos = 25;
  const dataGrafico = Array.from({ length: anos + 1 }, (_, i) => ({
    ano: i,
    acumulado: Math.max(0, economia * 12 * i - preco),
    acumuladoFonte: Math.max(0, economia * 12 * i - precoTotal),
    economia: economia * 12 * i,
  }));

  // Layout e responsividade
  const cardStyle = {
    background: darkMode ? '#222' : '#fff',
    color: darkMode ? '#ffe066' : '#222',
    borderRadius: 16,
    boxShadow: '0 2px 16px #0001',
    padding: 24,
    maxWidth: 480,
    margin: '32px auto',
    transition: 'all 0.3s',
  } as React.CSSProperties;

  return (
    <div style={{ background: darkMode ? '#181818' : '#f4f6fa', minHeight: '100vh', transition: 'all 0.3s' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: 16 }}>
        <button onClick={() => setDarkMode(d => !d)}>{darkMode ? t(idioma, 'claro') : t(idioma, 'dark')}</button>
        <select value={idioma} onChange={e => setIdioma(e.target.value as any)}>
          <option value="pt">PT</option>
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
      </div>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: 16, color: darkMode ? '#ffe066' : '#222' }}>{t(idioma, 'simulador')}</h2>
        <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
          <button onClick={() => setTipo('kwh')} style={{ flex: 1, background: tipo === 'kwh' ? '#ffe066' : '#eee', border: 'none', borderRadius: 6, padding: 8, fontWeight: 'bold', cursor: 'pointer' }} title="Informe o consumo em kWh, disponível na conta de luz">kWh</button>
          <button onClick={() => setTipo('valor')} style={{ flex: 1, background: tipo === 'valor' ? '#ffe066' : '#eee', border: 'none', borderRadius: 6, padding: 8, fontWeight: 'bold', cursor: 'pointer' }} title="Informe o valor médio da conta em reais">R$</button>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>{tipo === 'kwh' ? t(idioma, 'consumo') : t(idioma, 'valor')}<br />
            <input
              type="number"
              min="0"
              value={consumo}
              onChange={e => setConsumo(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
              placeholder={tipo === 'kwh' ? 'Ex: 350' : 'Ex: 400,00'}
              title="Consumo médio mensal ou valor médio da conta dos últimos 6 meses"
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>{t(idioma, 'estado')}<br />
            <select
              value={estado}
              onChange={e => setEstado(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
              title="Selecione o estado para aplicar a tarifa local"
            >
              {tarifas.map(t => (
                <option key={t.estado} value={t.estado}>{t.nome} (R${t.tarifa.toFixed(3)}/kWh)</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>{t(idioma, 'perfil')}<br />
            <select value={perfil} onChange={e => setPerfil(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} title="Perfil de consumo influencia perdas e dimensionamento">
              {perfis.map(p => (
                <option key={p.tipo} value={p.tipo}>{p.nome}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <label style={{ fontWeight: 500 }}>Módulo solar:<br />
              <select value={moduloIdx} onChange={e => setModuloIdx(Number(e.target.value))} style={{ width: '100%', padding: 6, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} title="Escolha o modelo de painel solar">
                {modulosDisponiveis.map((m, i) => (
                  <option key={m.modelo} value={i}>{m.marca} {m.modelo} ({m.potencia}W) - R${m.preco}</option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <label style={{ fontWeight: 500 }}>Inversor:<br />
              <select value={inversorIdx} onChange={e => setInversorIdx(Number(e.target.value))} style={{ width: '100%', padding: 6, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} title="Escolha o modelo de inversor">
                {inversoresDisponiveis.map((inv, i) => (
                  <option key={inv.modelo} value={i}>{inv.marca} {inv.modelo} ({inv.potencia}kW) - R${inv.preco}</option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <label style={{ fontWeight: 500 }}>Fonte do kit:<br />
              <select value={fonteIdx} onChange={e => setFonteIdx(Number(e.target.value))} style={{ width: '100%', padding: 6, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} title="Escolha a fonte do sistema">
                {fontesDisponiveis.map((f, i) => (
                  <option key={f.tipo} value={i}>{f.tipo} - {f.descricao}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        {/* Campos opcionais de personalização */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 180, marginRight: '16px' }}>
            <label>Área disponível (m²):<br />
              <input
                type="number"
                min="0"
                value={areaDisponivel}
                onChange={e => setAreaDisponivel(e.target.value)}
                style={{ width: '100%', padding: 6, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
                placeholder="Opcional"
                title="Informe a área disponível para instalação (opcional)"
              />
            </label>
          </div>
          <div style={{ flex: 1, minWidth: 180, marginLeft: '16px' }}>
            <label>Inclinação da telha (°):<br />
              <input
                type="number"
                min="0"
                max="45"
                value={inclinacao}
                onChange={e => setInclinacao(e.target.value)}
                style={{ width: '100%', padding: 6, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
                placeholder="Opcional"
                title="Informe a inclinação da telha (opcional)"
              />
            </label>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label>Tipo de estrutura:<br />
              <select value={estrutura} onChange={e => setEstrutura(e.target.value)} style={{ width: '100%', padding: 6, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}>
                <option value="telhado">Telhado</option>
                <option value="solo">Solo</option>
              </select>
            </label>
          </div>
        </div>
        {/* Simulação de financiamento - bloco único */}
        <div style={{ background: darkMode ? '#222' : '#f8f8f8', borderRadius: 12, padding: 16, marginBottom: 18, boxShadow: '0 2px 8px #0001', maxWidth: 650 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12, color: darkMode ? '#ffe066' : '#222' }}>Simulação de Financiamento</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="entrada">Entrada (R$):</label>
              <input id="entrada" type="number" min="0" value={entrada} onChange={e => setEntrada(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 0 }} placeholder="0" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="prazo">Prazo (meses):</label>
              <input id="prazo" type="number" min="1" value={prazo} onChange={e => setPrazo(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 0 }} placeholder="60" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="juros">Juros (% ao mês):</label>
              <input id="juros" type="number" min="0" step="0.01" value={juros} onChange={e => setJuros(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 0 }} placeholder="1.2" />
            </div>
          </div>
          <div style={{ marginTop: 16, fontSize: 16 }}>
            <strong>Valor financiado:</strong> R$ {valorFinanciado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
            <strong>Parcela mensal:</strong> R$ {parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
            <strong>Total pago:</strong> R$ {totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
            <strong>Total de juros:</strong> R$ {jurosTotais.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
            <strong>Economia mensal estimada:</strong> R$ {economia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
            <span style={{ color: parcela < economia ? 'green' : 'red', fontWeight: 'bold' }}>
              {parcela < economia ? 'A economia cobre a parcela!' : 'A parcela é maior que a economia.'}
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '18px',
            marginBottom: 18,
            width: '100%',
            maxWidth: 650,
            alignItems: 'end',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 150 }}>
            <label htmlFor="cidade" style={{ marginBottom: 4 }}>Cidade:</label>
            <input
              id="cidade"
              type="text"
              value={cidade}
              onChange={e => setCidade(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 0 }}
              placeholder="Opcional"
              title="Informe a cidade para cálculo geográfico (opcional)"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
            <label htmlFor="cep" style={{ marginBottom: 4 }}>CEP:</label>
            <input
              id="cep"
              type="text"
              value={cep}
              onChange={e => setCep(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 0 }}
              placeholder="Opcional"
              title="Informe o CEP para cálculo geográfico (opcional)"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
            <label htmlFor="sombreamento" style={{ marginBottom: 4 }}>Sombreamento (%):</label>
            <input
              id="sombreamento"
              type="number"
              min="0"
              max="100"
              value={sombreamento}
              onChange={e => setSombreamento(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 0 }}
              placeholder="Opcional"
              title="Informe o percentual de sombreamento (opcional)"
            />
          </div>
        </div>
        {/* Financiamento */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: 18, width: '100%', maxWidth: 650 }}>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
            <label htmlFor="entrada" style={{ marginBottom: 4 }}>Entrada (R$):</label>
            <input
              id="entrada"
              type="number"
              min="0"
              value={entrada}
              onChange={e => setEntrada(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 0, fontSize: 16 }}
              placeholder="0"
              title="Valor de entrada do financiamento"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
            <label htmlFor="prazo" style={{ marginBottom: 4 }}>Prazo (meses):</label>
            <input
              id="prazo"
              type="number"
              min="1"
              value={prazo}
              onChange={e => setPrazo(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 0, fontSize: 16 }}
              placeholder="60"
              title="Prazo em meses"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
            <label htmlFor="juros" style={{ marginBottom: 4 }}>Juros (%/mês):</label>
            <input
              id="juros"
              type="number"
              min="0"
              step="0.01"
              value={juros}
              onChange={e => setJuros(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 0, fontSize: 16 }}
              placeholder="1.2"
              title="Taxa de juros mensal"
            />
          </div>
        </div>
        {/* Resultados do financiamento só aparecem se há kit válido e valor financiado > 0 */}
        {(precoTotal > 0 && valorFinanciado > 0) && (
          <div style={{ background: '#fffbe6', borderRadius: 12, padding: 16, marginBottom: 18, boxShadow: '0 2px 8px #0001' }}>
            <h3 style={{ marginTop: 0 }}>Simulação de Financiamento</h3>
            <div>Valor financiado: <b>R$ {isNaN(valorFinanciado) ? '0,00' : valorFinanciado.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</b></div>
            <div>Parcela mensal: <b>R$ {isNaN(parcela) ? '0,00' : parcela.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</b></div>
            <div>Juros totais: <b>R$ {isNaN(jurosTotais) ? '0,00' : jurosTotais.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</b></div>
            <div>Valor total pago: <b>R$ {isNaN(totalPago) ? '0,00' : totalPago.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</b></div>
            <div>Economia mensal estimada: <b>R$ {isNaN(economia) ? '0,00' : economia.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</b></div>
            <div style={{ marginTop: 8, color: parcela > economia ? '#c00' : '#080', fontWeight: 'bold' }}>
              {parcela > economia ? 'Atenção: parcela maior que economia mensal!' : 'Parcela menor que economia mensal.'}
            </div>
          </div>
        )}
        <button
          onClick={() => {}}
          style={{ width: '100%', padding: 10, borderRadius: 6, background: '#ffe066', color: '#222', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginBottom: 12, fontSize: 17, transition: 'all 0.2s' }}
        >
          {t(idioma, 'calcular')}
        </button>
        {economia > 0 && (
          <div style={{ background: darkMode ? '#181818' : '#f8f9fa', color: darkMode ? '#ffe066' : '#222', borderRadius: 8, padding: 16, marginTop: 8, textAlign: 'center', transition: 'all 0.3s' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: darkMode ? '#ffe066' : '#2b9348' }}>
              {t(idioma, 'economia')}: R$ {economia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
            </div>
            <div style={{ fontSize: 15, color: darkMode ? '#ffe066' : '#555', marginTop: 4 }}>
              (aprox. 95% de redução na conta)
            </div>
            <div style={{ fontSize: 15, color: darkMode ? '#ffe066' : '#222', marginTop: 16, fontWeight: 600 }}>
              <span>{t(idioma, 'kit')}</span>
              <ul style={{ textAlign: 'left', margin: '12px auto 0', maxWidth: 320, fontWeight: 400, color: darkMode ? '#ffe066' : '#444', fontSize: 15 }}>
                <li><b>{modulosQtd}</b> {t(idioma, 'modulos')} {modulo.marca} {modulo.modelo} de {modulo.potencia}W</li>
                <li><b>{inversorQtd}</b> {t(idioma, 'inversor')} {inversor.marca} {inversor.modelo} ({inversor.potencia}kW)</li>
                <li><b>{area.toFixed(1)} m²</b> {t(idioma, 'area')}</li>
                <li>Estrutura: {estrutura === 'solo' ? 'Solo (custo extra)' : 'Telhado'}</li>
                {bateriaIdx >= 0 && (
                  <li>Bateria: {bateriasDisponiveis[bateriaIdx].marca} {bateriasDisponiveis[bateriaIdx].modelo} ({bateriasDisponiveis[bateriaIdx].capacidade}kWh) - R${bateriasDisponiveis[bateriaIdx].preco}</li>
                )}
                {geradorIdx >= 0 && (
                  <li>Gerador: {geradoresDisponiveis[geradorIdx].marca} {geradoresDisponiveis[geradorIdx].modelo} ({geradoresDisponiveis[geradorIdx].potencia}kW) - R${geradoresDisponiveis[geradorIdx].preco}</li>
                )}
                <li><b>{t(idioma, 'valorKit')}: R$ {isNaN(preco) ? '0,00' : preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b></li>
                {(fonte.tipo !== 'Nenhuma' || bateriaIdx >= 0 || geradorIdx >= 0) && (
                  <li style={{ color: '#0891b2' }}>
                    Custo extra da fonte
                    {fonte.tipo !== 'Nenhuma' && ` (${fonte.tipo})`}
                    {bateriaIdx >= 0 && fonte.tipo === 'Bateria' && ` (Bateria)`}
                    {geradorIdx >= 0 && fonte.tipo === 'Gerador' && ` (Gerador)`}
                    : <b>R$ {isNaN(precoFonte) ? '0,00' : precoFonte.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b><br />
                    <b>Valor total do kit: R$ {isNaN(precoTotal) ? '0,00' : precoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b>
                  </li>
                )}
              </ul>
              <div style={{ fontSize: 15, color: darkMode ? '#ffe066' : '#2b9348', marginTop: 8 }}>
                {t(idioma, 'economiaAnual')}: <b>R$ {economiaAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b><br />
                {t(idioma, 'payback')}: <b>{payback.toFixed(1)} {t(idioma, 'anos')}</b>
              </div>
              <div style={{ fontSize: 15, color: darkMode ? '#ffe066' : '#2b9348', marginTop: 8 }}>
                {t(idioma, 'co2')}: <b>{co2Evitado.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} kg</b><br />
                {t(idioma, 'arvores')}: <b>{arvoresEquivalentes.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</b>
              </div>
              <div style={{ marginTop: 16 }}>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={dataGrafico} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ano" label={{ value: 'Ano', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis label={{ value: 'R$', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={v => `R$ ${Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
                    <Line type="monotone" dataKey="acumulado" stroke="#2b9348" strokeWidth={3} name="Lucro acumulado (kit padrão)" />
                    <Line type="monotone" dataKey="acumuladoFonte" stroke="#fbbf24" strokeWidth={3} name="Lucro acumulado (com fonte)" />
                    <Line type="monotone" dataKey="economia" stroke="#ffe066" strokeWidth={2} name="Economia total" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div style={{ fontSize: 13, color: darkMode ? '#ffe066' : '#888', marginTop: 8 }}>
                * Valores aproximados, podem variar conforme região, fornecedor e projeto.
              </div>
            </div>
          </div>
        )}
        <div style={{
          marginTop: 28,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 18,
          flexWrap: 'wrap',
        }}>
          <button
            style={{ background: '#25d366', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #25d36644', transition: 'all 0.2s' }}
            onClick={() => {
              const msg = encodeURIComponent(`Olá! Gostaria de um orçamento solar. Meu consumo é de ${consumoKwh.toFixed(0)} kWh/mês em ${tarifas.find(t => t.estado === estado)?.nome}.`);
              window.open(`https://wa.me/5519982091708?text=${msg}`, '_blank');
            }}
          >{t(idioma, 'whatsapp')}</button>
          <button
            style={{ background: '#ffe066', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', color: '#222', boxShadow: '0 2px 8px #ffe06644', transition: 'all 0.2s' }}
            onClick={() => {
              alert('Em breve um especialista entrará em contato!');
            }}
          >{t(idioma, 'contato')}</button>
          <button
            style={{ background: '#ffe066', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', color: '#222', boxShadow: '0 2px 8px #ffe06644', transition: 'all 0.2s' }}
            onClick={() => {
              const doc = `Orçamento Solar\n\nEstado: ${tarifas.find(t => t.estado === estado)?.nome}\nConsumo: ${consumoKwh.toFixed(0)} kWh/mês\nPerfil: ${perfil}\n\nKit sugerido:\n- ${modulosQtd} módulos ${modulo.marca} ${modulo.modelo} de ${modulo.potencia}W\n- ${inversorQtd} inversor(es) ${inversor.marca} ${inversor.modelo} (${inversor.potencia}kW)\n- Área estimada: ${area.toFixed(1)} m²\n- Valor estimado: R$ ${preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\nEconomia: R$ ${economia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês\nPayback: ${payback.toFixed(1)} anos\nCO₂ evitado: ${co2Evitado.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} kg\nÁrvores equivalentes: ${arvoresEquivalentes.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
              const blob = new Blob([doc], { type: 'application/pdf' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'orcamento-solar.pdf';
              a.click();
              setTimeout(() => URL.revokeObjectURL(url), 1000);
            }}
          >{t(idioma, 'baixarPdf')}</button>
        </div>
        <div style={{ marginTop: 32, background: darkMode ? '#222' : '#f6f6f6', borderRadius: 12, padding: 18 }}>
          <b>{t(idioma, 'faq')}</b>
          <ul style={{ margin: '10px 0 0 18px', color: darkMode ? '#ffe066' : '#444', fontSize: 15 }}>
            <li>O sistema funciona em dias nublados? <span style={{ color: '#2b9348' }}>Sim, mas com menor geração.</span></li>
            <li>Precisa de manutenção? <span style={{ color: '#2b9348' }}>Baixa, apenas limpeza e inspeção anual.</span></li>
            <li>Posso zerar a conta de luz? <span style={{ color: '#2b9348' }}>Na maioria dos casos, sim.</span></li>
            <li>Qual a vida útil dos equipamentos? <span style={{ color: '#2b9348' }}>Módulos: 25 anos, inversores: 8-12 anos.</span></li>
            <li>O que é payback? <span style={{ color: '#2b9348' }}>Tempo para o investimento se pagar com a economia gerada.</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SimuladorEconomiaSolar;
