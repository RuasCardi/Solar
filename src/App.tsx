import React, { useEffect, useState } from 'react';
// NAVBAR FIXA
const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 62px;
  background: rgba(255,255,255,0.97);
  box-shadow: 0 2px 12px 0 rgba(60,72,100,0.07);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NavList = styled.ul`
  display: flex;
  gap: 2.2rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const NavItem = styled.li``;
const NavLink = styled.a`
  color: #0891b2;
  font-weight: 700;
  font-size: 1.08rem;
  text-decoration: none;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  transition: border 0.2s, color 0.2s;
  &:hover, &.active {
    color: #fbbf24;
    border-bottom: 2px solid #fbbf24;
  }
`;

// BOTÃO FLUTUANTE PARA VOLTAR AO TOPO
const ScrollTopButton = styled.button`
  position: fixed;
  right: 28px;
  bottom: 32px;
  z-index: 120;
  background: #fbbf24;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  box-shadow: 0 2px 12px 0 rgba(60,72,100,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.85;
  transition: background 0.2s, opacity 0.2s;
  &:hover {
    background: #0891b2;
    opacity: 1;
  }
`;
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

import SimuladorEconomiaSolar from './components/SimuladorEconomiaSolar';

// Wrapper decorativo simples para substituir o ElectricBorder removido
const DecorativeBorder: React.FC<{ color?: string, thickness?: number, speed?: number, children?: React.ReactNode }> = ({ color = '#52f99f', thickness = 2, children }) => {
  return (
    <div style={{ padding: 4, borderRadius: 12, boxShadow: `0 0 0 ${thickness}px ${color}22 inset`, transition: 'transform 0.3s' }}>
      {children}
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    background: #f8fafc !important; /* força tema claro por padrão */
    color: #222 !important;
    box-sizing: border-box;
  }
  /* Forçar elementos que possam ter cores inline escuras a usar variações claras quando possível */
  .force-light, .force-light * {
    background-color: transparent !important;
    color: inherit !important;
  }
`;

const Hero = styled.section`
  width: 100vw;
  min-height: 420px;
  background: linear-gradient(120deg, #e0e7ef 0%, #f1f5f9 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1.2rem 2.5rem 1.2rem;
  position: relative;
  box-shadow: 0 4px 24px 0 rgba(60,72,100,0.07);
`;

const HeroImage = styled.img`
  width: 340px;
  max-width: 90vw;
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px 0 rgba(60,72,100,0.10);
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  color: #0891b2;
  margin: 0 0 1.1rem 0;
  text-align: center;
  letter-spacing: -1.5px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #222;
  margin: 0 0 2rem 0;
  text-align: center;
  max-width: 600px;
`;

const HeroCTA = styled.a`
  background: linear-gradient(90deg, #fbbf24 30%, #22d3ee 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 1rem 2.5rem;
  font-weight: 700;
  font-size: 1.15rem;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 2px 8px 0 rgba(60,72,100,0.10);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: linear-gradient(90deg, #22d3ee 30%, #fbbf24 100%);
    box-shadow: 0 4px 16px 0 rgba(60,72,100,0.16);
  }
`;

const StatsSection = styled.section`
  width: 100%;
  padding: 3rem 1.2rem 2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 900px;
`;

const StatCard = styled.div`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px 0 rgba(60,72,100,0.08);
  padding: 2rem 1.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 140px;
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8fafc;
`;

const StatNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  color: #fbbf24;
  margin-bottom: 0.5rem;
`;

const StatDesc = styled.div`
  font-size: 1.05rem;
  color: #222;
`;

const BenefitsSection = styled.section`
  width: 100%;
  background: #fff;
  padding: 3rem 1.2rem 2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
`;

const BenefitCard = styled.div`
  background: #f7fafc;
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px 0 rgba(60, 72, 100, 0.08);
  padding: 2rem 1.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 140px;
`;

const BenefitIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #fbbf24;
`;

const BenefitDesc = styled.p`
  font-size: 1.05rem;
  color: #64748b;
  margin: 0;
`;

const AboutSection = styled.section`
  width: 100%;
  background: #e3f6fd;
  padding: 3rem 1.2rem 2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AboutContent = styled.div`
  max-width: 900px;
  text-align: center;
`;

const AboutImage = styled.img`
  width: 320px;
  max-width: 90vw;
  margin: 2rem 0 0 0;
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px 0 rgba(60, 72, 100, 0.10);
`;

const ClientsSection = styled.section`
  width: 100%;
  max-width: 900px;
  margin: 2rem auto 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 700px) {
    margin: 1.2rem auto 1.2rem auto;
  }
`;

const ClientsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  @media (max-width: 700px) {
    gap: 1rem;
  }
`;

const ClientLogo = styled.div`
  min-width: 120px;
  min-height: 48px;
  background: #e0e7ef;
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #3b4a5a;
  font-size: 1.15rem;
  box-shadow: 0 2px 12px 0 rgba(60,72,100,0.08);
  margin: 8px;
  padding: 0 18px;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 24px 0 rgba(60,72,100,0.16);
    background: #fbbf24;
    color: #fff;
    transform: translateY(-2px) scale(1.04);
  }
  @media (max-width: 700px) {
    min-width: 90px;
    min-height: 36px;
    font-size: 1rem;
    padding: 0 8px;
  }
`;

const TestimonialsSection = styled.section`
  width: 100%;
  max-width: 900px;
  margin: 3rem auto 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 700px) {
    margin: 2rem auto 1.2rem auto;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: #fff;
  border-radius: 1.1rem;
  box-shadow: 0 2px 16px 0 rgba(60, 72, 100, 0.08);
  padding: 1.2rem 1rem;
  margin: 0.5rem 0;
  max-width: 500px;
  width: 100%;
  text-align: left;
  font-size: 1rem;
`;

const TestimonialAuthor = styled.p`
  font-weight: 700;
  color: #6366f1;
  margin: 0.7rem 0 0 0;
`;

const ContactSection = styled.section`
  width: 100%;
  max-width: 500px;
  margin: 3rem auto 0 auto;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 16px 0 rgba(60, 72, 100, 0.08);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 700px) {
    padding: 1.2rem 0.7rem;
    margin: 2rem auto 0 auto;
  }
`;

const ContactTitle = styled.h3`
  margin-bottom: 1rem;
  color: #6366f1;
  font-size: 1.3rem;
`;

const ContactForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 0.7rem;
  border: 1px solid #e0e7ef;
  font-size: 1rem;
  background: #f8fafc;
  &:focus {
    outline: 2px solid #6366f1;
    border-color: #6366f1;
  }
`;

const Textarea = styled.textarea`
  padding: 0.8rem 1rem;
  border-radius: 0.7rem;
  border: 1px solid #e0e7ef;
  font-size: 1rem;
  min-height: 90px;
  background: #f8fafc;
  &:focus {
    outline: 2px solid #6366f1;
    border-color: #6366f1;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg, #6366f1 30%, #60a5fa 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.9rem 2rem;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px 0 rgba(60, 72, 100, 0.10);
  &:hover {
    background: linear-gradient(90deg, #60a5fa 30%, #6366f1 100%);
    box-shadow: 0 4px 16px 0 rgba(60, 72, 100, 0.16);
  }
`;

const Footer = styled.footer`
  margin-top: 3rem;
  padding: 2rem 0 0 0;
  text-align: center;
  color: #94a3b8;
  font-size: 1rem;
`;

// DADOS
const benefits = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/169/169367.png',
    title: 'Energia Limpa e Renovável',
    desc: 'Soluções solares que reduzem sua conta de luz e o impacto ambiental.'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
    title: 'Economia Garantida',
    desc: 'Projetos personalizados para máxima eficiência e retorno do investimento.'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/2917/2917995.png',
    title: 'Sustentabilidade',
    desc: 'Contribua para um futuro mais verde com energia solar de alta performance.'
  },
];

const testimonials = [
  {
    text: 'Reduzi minha conta de energia em mais de 80% com a SolarPrime! Atendimento excelente e instalação rápida.',
    author: 'Patrícia L., Cliente Residencial',
  },
  {
    text: 'A empresa se destacou pelo profissionalismo e pelo suporte pós-venda. Recomendo para todos que buscam economia.',
    author: 'João M., Empresário',
  },
];

const clients = [
  'EcoFazenda', 'Residencial Sol', 'Comercial Luz', 'GreenTech', 'Condomínio Solar'
];

// Dados para os gráficos


// COMPONENTE PRINCIPAL
function App() {
  // Para mostrar/esconder botão de scroll top
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const stats = [
    {
      number: 'Até 95%',
      desc: (<span>de economia comprovada na conta de luz <span style={{ color: '#0891b2', fontWeight: 600 }}>(ANEEL, 2024)</span></span>),
    },
    {
      number: '+25 anos',
      desc: (<span>de vida útil dos painéis com garantia internacional</span>),
    },
    {
      number: '0%',
      desc: (<span>de emissão de CO₂ durante a geração <span style={{ color: '#0891b2', fontWeight: 600 }}>(IEA, 2023)</span></span>),
    },
    {
      number: '+15%',
      desc: (<span>de valorização média do imóvel após instalação <span style={{ color: '#0891b2', fontWeight: 600 }}>(FGV, 2024)</span></span>),
    }
  ];
  return (
    <>
      <GlobalStyle />
      <Navbar>
        <NavList>
          <NavItem><NavLink href="#hero">Início</NavLink></NavItem>
          <NavItem><NavLink href="#impacto">Impacto</NavLink></NavItem>
          <NavItem><NavLink href="#graficos">Gráficos</NavLink></NavItem>
          <NavItem><NavLink href="#beneficios">Benefícios</NavLink></NavItem>
          <NavItem><NavLink href="#historia">História</NavLink></NavItem>
          <NavItem><NavLink href="#sobre">Sobre</NavLink></NavItem>
          <NavItem><NavLink href="#clientes">Clientes</NavLink></NavItem>
          <NavItem><NavLink href="#contato">Contato</NavLink></NavItem>
        </NavList>
      </Navbar>
      <Container style={{ paddingTop: 62 }}>
  {/* HERO SECTION */}
  <Hero id="hero">
          <HeroImage src="/images/download.jpeg" alt="Painéis solares instalados" />
          <HeroTitle>Energia Solar para um Futuro Sustentável</HeroTitle>
          <HeroSubtitle>Economize, valorize seu imóvel e preserve o planeta com soluções solares inteligentes.</HeroSubtitle>
          <HeroCTA href="#contato">Solicite um orçamento</HeroCTA>
        </Hero>

  {/* ESTATÍSTICAS PROFISSIONAIS */}
  <StatsSection id="impacto" style={{ background: 'linear-gradient(120deg, #e0e7ef 0%, #f1f5f9 100%)', boxShadow: '0 4px 24px 0 rgba(60,72,100,0.07)' }}>
          <h2 style={{ color: '#0891b2', fontWeight: 900, fontSize: '2rem', marginBottom: '2.2rem', letterSpacing: '-1px' }}>
            Impacto Real da Energia Solar
          </h2>
          <StatsGrid>
            {stats.map((stat, idx) => (
              <DecorativeBorder key={idx} color="#52f99f" thickness={2}>
                <StatCard>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatDesc>{stat.desc}</StatDesc>
                </StatCard>
              </DecorativeBorder>
            ))}
          </StatsGrid>
        </StatsSection>

  {/* GRÁFICOS PROFISSIONAIS */}
  <StatsSection id="graficos" style={{ background: '#fff', boxShadow: '0 4px 24px 0 rgba(60,72,100,0.07)' }}>
          <h2 style={{ color: '#0891b2', fontWeight: 900, fontSize: '1.7rem', marginBottom: '2rem', letterSpacing: '-1px' }}>
            Economia e Redução de Consumo: Dados Reais
          </h2>
          <div style={{ width: '100%', maxWidth: 1000, display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'center' }}>
            <DecorativeBorder color="#52f99f" thickness={2}>
              <div style={{ flex: 1, minWidth: 340, background: 'linear-gradient(120deg, #f1f5f9 0%, #e0e7ef 100%)', borderRadius: 18, boxShadow: '0 2px 16px 0 rgba(60,72,100,0.10)', padding: 32 }}>
                <h3 style={{ color: '#fbbf24', fontWeight: 800, fontSize: '1.15rem', marginBottom: 16, letterSpacing: '-0.5px' }}>Economia anual estimada (R$)</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={[
                    { ano: '2021', economia: 2100 },
                    { ano: '2022', economia: 3400 },
                    { ano: '2023', economia: 4700 },
                    { ano: '2024', economia: 5900 },
                    { ano: '2025', economia: 6500 },
                  ]}>
                    <XAxis dataKey="ano" tick={{ fontWeight: 700, fill: '#0891b2' }} />
                    <YAxis tick={{ fontWeight: 700, fill: '#0891b2' }} />
                    <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                    <Bar dataKey="economia" fill="#22d3ee" radius={[10,10,0,0]} barSize={38} />
                  </BarChart>
                </ResponsiveContainer>
                <p style={{ color: '#64748b', fontSize: '0.98rem', marginTop: 12, textAlign: 'center' }}>
                  Fonte: Associação Brasileira de Energia Solar (ABSOLAR), 2024
                </p>
              </div>
            </DecorativeBorder>
            <DecorativeBorder color="#52f99f" thickness={2}>
              <div style={{ flex: 1, minWidth: 340, background: 'linear-gradient(120deg, #f1f5f9 0%, #e0e7ef 100%)', borderRadius: 18, boxShadow: '0 2px 16px 0 rgba(60,72,100,0.10)', padding: 32 }}>
                <h3 style={{ color: '#fbbf24', fontWeight: 800, fontSize: '1.15rem', marginBottom: 16, letterSpacing: '-0.5px' }}>Consumo antes x depois (kWh/mês)</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={[
                      { tipo: 'Antes do Solar', valor: 350 },
                      { tipo: 'Depois do Solar', valor: 55 },
                    ]} dataKey="valor" nameKey="tipo" cx="50%" cy="50%" outerRadius={80} label>
                      <Cell fill="#fbbf24" />
                      <Cell fill="#22d3ee" />
                    </Pie>
                    <Legend formatter={(value) => value === 'Antes do Solar' ? 'Antes do Solar' : 'Depois do Solar'} />
                    <Tooltip formatter={(value, name) => [`${value} kWh/mês`, name]} />
                  </PieChart>
                </ResponsiveContainer>
                <p style={{ color: '#64748b', fontSize: '0.98rem', marginTop: 12, textAlign: 'center' }}>
                  Redução média de consumo residencial após instalação solar (ABSOLAR, 2024)
                </p>
              </div>
            </DecorativeBorder>
          </div>
        </StatsSection>

  {/* BENEFÍCIOS */}
  <BenefitsSection id="beneficios">
          <h2 style={{ color: '#0891b2', fontWeight: 800, fontSize: '2rem', marginBottom: '2rem' }}>Por que escolher energia solar?</h2>
          <BenefitsGrid>
            {benefits.map((b) => (
              <DecorativeBorder key={b.title} color="#52f99f" thickness={2}>
                <BenefitCard>
                  <BenefitIcon src={b.icon} alt={b.title} />
                  <BenefitTitle>{b.title}</BenefitTitle>
                  <BenefitDesc>{b.desc}</BenefitDesc>
                </BenefitCard>
              </DecorativeBorder>
            ))}
          </BenefitsGrid>
        </BenefitsSection>

  {/* HISTÓRIA DO PAINEL SOLAR */}
  <AboutSection id="historia" style={{ background: 'linear-gradient(120deg, #fffbe6 0%, #e3f6fd 100%)', marginBottom: 0 }}>
          <AboutContent>
            <h2 style={{ color: '#fbbf24', fontWeight: 900, fontSize: '2rem', marginBottom: '1.2rem', letterSpacing: '-1px' }}>
              Como o Painel Solar foi Inventado?
            </h2>
            <p style={{ color: '#222', fontSize: '1.13rem', marginBottom: '1.2rem', lineHeight: 1.7 }}>
              A história da energia solar começou em 1839, quando o físico francês <b>Edmond Becquerel</b> descobriu o <b>efeito fotovoltaico</b>, observando que certos materiais geravam eletricidade ao serem expostos à luz. Décadas depois, em 1954, pesquisadores dos Laboratórios Bell, nos EUA, criaram a <b>primeira célula solar de silício eficiente</b>, capaz de converter luz solar em energia elétrica de forma prática. Esse avanço revolucionou o mundo, tornando possível alimentar satélites, casas e empresas com energia limpa e renovável.<br /><br />
              Hoje, os painéis solares são símbolo de inovação, sustentabilidade e independência energética. Ao investir em energia solar, você faz parte dessa evolução tecnológica que transforma o planeta!
            </p>

            {/* LINHA DO TEMPO INTERATIVA */}
            <TimelineInteractive />

            {/* CURIOSIDADES */}
            <div style={{ maxWidth: 800, margin: '2rem auto 0 auto', background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px 0 rgba(60,72,100,0.08)', padding: '2rem 1.2rem' }}>
              <h3 style={{ color: '#0891b2', fontWeight: 800, fontSize: '1.15rem', marginBottom: 16, letterSpacing: '-0.5px' }}>Curiosidades Solares</h3>
              <ul style={{ color: '#222', fontSize: '1.05rem', paddingLeft: 18, margin: 0 }}>
                <li style={{ marginBottom: 10 }}><b>O Sol libera mais energia em 1 hora</b> do que toda a humanidade consome em 1 ano.</li>
                <li style={{ marginBottom: 10 }}><b>O maior parque solar do mundo</b> está na Índia e tem capacidade para abastecer mais de 700 mil casas.</li>
                <li style={{ marginBottom: 10 }}><b>Satélites, calculadoras e até carros</b> usam células solares para funcionar sem combustíveis fósseis.</li>
                <li style={{ marginBottom: 10 }}><b>O recorde de eficiência</b> de uma célula solar de laboratório já ultrapassa 47% (2023).</li>
                <li style={{ marginBottom: 10 }}><b>O Brasil</b> está entre os 10 países que mais instalam energia solar no mundo.</li>
              </ul>
            </div>
            <AboutImage src="/images/images.jpeg" alt="Cientista analisando célula solar" />
          </AboutContent>
        </AboutSection>

  {/* SOBRE */}
  <AboutSection id="sobre">
          <AboutContent>
            <h2 style={{ color: '#fbbf24', fontWeight: 800, fontSize: '2rem', marginBottom: '1.2rem' }}>Sobre a SolarPrime</h2>
            <p style={{ color: '#222', fontSize: '1.15rem', marginBottom: '1.5rem' }}>
              Somos especialistas em projetos, instalação e manutenção de sistemas fotovoltaicos residenciais, comerciais e rurais. Atendemos todo o Brasil com tecnologia de ponta, equipe qualificada e compromisso com o meio ambiente.
            </p>
            <AboutImage src="/images/s.jpeg" alt="Painéis solares instalados" />
          </AboutContent>
        </AboutSection>

  {/* CLIENTES */}
  <ClientsSection id="clientes">
          <h2 style={{ color: '#0891b2', fontWeight: 700, marginBottom: '0.5rem' }}>Clientes que confiam</h2>
          <ClientsGrid>
            {clients.map((client) => (
              <ClientLogo key={client}>{client}</ClientLogo>
            ))}
          </ClientsGrid>
        </ClientsSection>

        {/* DEPOIMENTOS */}
        <TestimonialsSection>
          <h2 style={{ color: '#fbbf24', fontWeight: 700, marginBottom: '0.5rem' }}>Depoimentos de quem já economiza</h2>
          {testimonials.map((t, idx) => (
            <TestimonialCard
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
            >
              <p style={{ fontStyle: 'italic', margin: 0 }}>{`"${t.text}"`}</p>
              <TestimonialAuthor>{t.author}</TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsSection>

        {/* Simulador de economia solar */}
        <SimuladorEconomiaSolar />

  {/* CONTATO */}
  <ContactSection id="contato">
          <ContactTitle>Fale com um especialista solar</ContactTitle>
          <ContactForm onSubmit={e => { e.preventDefault(); alert('Mensagem enviada!'); }}>
            <Input type="text" placeholder="Seu nome" required />
            <Input type="email" placeholder="Seu e-mail" required />
            <Textarea placeholder="Sua mensagem" required />
            <SubmitButton type="submit">Enviar</SubmitButton>
          </ContactForm>
        </ContactSection>

        <Footer>
          © {new Date().getFullYear()} SolarPrime Energia. Todos os direitos reservados.
        </Footer>
      </Container>
      {showScrollTop && (
        <ScrollTopButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Voltar ao topo">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19" cy="19" r="17" fill="#fbbf24" />
            <path d="M19 28V12" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
            <path d="M13 18L19 12L25 18" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ScrollTopButton>
      )}
  </>
  );
}

// DADOS DA LINHA DO TEMPO
const timelineData = [
  {
    year: '1839',
    title: 'Descoberta do Efeito Fotovoltaico',
    desc: 'Edmond Becquerel observa que certos materiais geram eletricidade ao serem expostos à luz.'
  },
  {
    year: '1954',
    title: 'Primeira Célula Solar de Silício',
    desc: 'Laboratórios Bell criam a primeira célula solar eficiente, marco para a energia solar moderna.'
  },
  {
    year: '1973',
    title: 'Crise do Petróleo',
    desc: 'Busca por alternativas acelera pesquisas em energia solar no mundo todo.'
  },
  {
    year: '2000+',
    title: 'Expansão Global',
    desc: 'Painéis solares se popularizam em residências, empresas e grandes usinas.'
  },
  {
    year: '2024',
    title: 'Brasil no Top 10',
    desc: 'O Brasil se consolida entre os maiores mercados de energia solar do mundo.'
  },
];

// COMPONENTE DA LINHA DO TEMPO INTERATIVA
function TimelineInteractive() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const curiosidades = [
    [
      'O efeito fotovoltaico é a base dos painéis solares modernos.',
      'Becquerel tinha apenas 19 anos quando fez a descoberta!'
    ],
    [
      'A primeira célula solar tinha eficiência de apenas 6%.',
      'Hoje, laboratórios já passam de 47% de eficiência.'
    ],
    [
      'A crise do petróleo fez o preço da energia disparar.',
      'Esse evento acelerou pesquisas em fontes renováveis.'
    ],
    [
      'O maior parque solar do mundo está na Índia.',
      'Ele pode abastecer mais de 700 mil casas.'
    ],
    [
      'O Brasil está entre os 10 países que mais instalam energia solar.',
      'O setor solar brasileiro cresce mais de 50% ao ano.'
    ],
  ];
  return (
    <div style={{ width: '100%', overflowX: 'auto', margin: '2.5rem 0 2.5rem 0', paddingBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 600, justifyContent: 'center', gap: 0 }}>
        {timelineData.map((item, idx) => (
          <React.Fragment key={item.year}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
              <button
                onClick={() => setActiveIdx(idx)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: idx === activeIdx ? '#fbbf24' : '#e0e7ef',
                  border: '3px solid #fbbf24',
                  marginBottom: 8,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  outline: 'none',
                  outlineOffset: 0,
                  boxSizing: 'border-box',
                  boxShadow: idx === activeIdx ? '0 2px 8px 0 rgba(60,72,100,0.10)' : 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  padding: 0,
                }}
                aria-label={item.title}
              />
              <span style={{ fontWeight: 700, color: idx === activeIdx ? '#fbbf24' : '#64748b', fontSize: 15 }}>{item.year}</span>
            </div>
            {idx < timelineData.length - 1 && (
              <div style={{ height: 4, width: 40, background: '#fbbf24', borderRadius: 2, margin: '0 0.5rem' }} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: 28, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px 0 rgba(60,72,100,0.08)', padding: '1.5rem 1.2rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', minHeight: 120 }}>
        <h4 style={{ color: '#0891b2', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{timelineData[activeIdx].title}</h4>
        <p style={{ color: '#222', fontSize: 15, margin: 0 }}>{timelineData[activeIdx].desc}</p>
        <ul style={{ color: '#0a0a0a', fontSize: 14, marginTop: 12, paddingLeft: 18 }}>
          {curiosidades[activeIdx].map((cur, i) => (
            <li key={i} style={{ marginBottom: 6 }}>{cur}</li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default App;
