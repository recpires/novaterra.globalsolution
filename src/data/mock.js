/* ─── ALERTAS ─── */
export const ALERTAS = [
  { id: 1, tipo: 'QUEIMADA',     regiao: 'MT — Chapada dos Guimarães', municipio: 'Chapada dos Guimarães, MT', severidade: 'CRITICO',  status: 'ativo',        mapX: 44, mapY: 48, criado_em: '2026-06-01T14:32:00', area_km2: 124, risco: 94, focos: 312 },
  { id: 2, tipo: 'ENCHENTE',     regiao: 'RS — Vale do Taquari',       municipio: 'Lajeado, RS',                severidade: 'ALTO',     status: 'ativo',        mapX: 56, mapY: 88, criado_em: '2026-06-01T13:10:00', area_km2: 45,  risco: 78, focos: null },
  { id: 3, tipo: 'DESLIZAMENTO', regiao: 'SP — Serra do Mar',          municipio: 'Caraguatatuba, SP',          severidade: 'ALTO',     status: 'ativo',        mapX: 66, mapY: 72, criado_em: '2026-06-01T11:45:00', area_km2: 12,  risco: 72, focos: null },
  { id: 4, tipo: 'SECA',         regiao: 'CE — Sertão Central',        municipio: 'Quixadá, CE',                severidade: 'MEDIO',    status: 'ativo',        mapX: 84, mapY: 22, criado_em: '2026-06-01T09:20:00', area_km2: 380, risco: 61, focos: null },
  { id: 5, tipo: 'QUEIMADA',     regiao: 'PA — Sul do Pará',           municipio: 'São Félix do Xingu, PA',     severidade: 'CRITICO',  status: 'ativo',        mapX: 60, mapY: 30, criado_em: '2026-06-01T08:05:00', area_km2: 256, risco: 91, focos: 578 },
  { id: 6, tipo: 'GRANIZO',      regiao: 'PR — Norte',                 municipio: 'Londrina, PR',               severidade: 'MEDIO',    status: 'monitorando',  mapX: 62, mapY: 78, criado_em: '2026-05-31T22:30:00', area_km2: 8,   risco: 55, focos: null },
  { id: 7, tipo: 'QUEIMADA',     regiao: 'AM — Médio Amazonas',        municipio: 'Borba, AM',                  severidade: 'ALTO',     status: 'ativo',        mapX: 33, mapY: 25, criado_em: '2026-05-31T18:15:00', area_km2: 97,  risco: 80, focos: 204 },
  { id: 8, tipo: 'ENCHENTE',     regiao: 'AC — Vale do Juruá',         municipio: 'Cruzeiro do Sul, AC',        severidade: 'MEDIO',    status: 'monitorando',  mapX: 18, mapY: 32, criado_em: '2026-05-31T15:00:00', area_km2: 22,  risco: 58, focos: null },
];

/* ─── FAZENDAS (AgriSat) ─── */
export const FAZENDAS = [
  {
    id: 1, nome: 'Fazenda São João', cultura: 'Soja', area_ha: 450,
    ndvi: 0.72, umidade: 68, temp: 24.5, irrigacao: 12, horario: '06:00 e 18:00',
    status: 'ok', mapX: 48, mapY: 54, lat: -15.2, lng: -49.3,
    ndvi_hist: [0.65, 0.67, 0.70, 0.69, 0.71, 0.72, 0.72],
    umidade_hist: [72, 70, 68, 69, 67, 68, 68],
    recomendacao: 'Vegetação saudável. Manter regime de irrigação atual de 12L/m². Próxima análise em 48h. Risco de praga: baixo.',
  },
  {
    id: 2, nome: 'Fazenda Bela Vista', cultura: 'Milho', area_ha: 280,
    ndvi: 0.41, umidade: 42, temp: 28.1, irrigacao: 24, horario: '05:30 e 19:00',
    status: 'warning', mapX: 52, mapY: 58, lat: -16.5, lng: -48.8,
    ndvi_hist: [0.55, 0.52, 0.49, 0.46, 0.44, 0.42, 0.41],
    umidade_hist: [58, 55, 51, 48, 45, 43, 42],
    recomendacao: 'Estresse hídrico moderado detectado. Aumentar irrigação para 24L/m². Tendência de queda — risco de praga: médio. Monitorar próximas 72h.',
  },
  {
    id: 3, nome: 'Sítio Esperança', cultura: 'Feijão', area_ha: 120,
    ndvi: 0.15, umidade: 28, temp: 31.2, irrigacao: 35, horario: 'URGENTE',
    status: 'critical', mapX: 56, mapY: 60, lat: -17.1, lng: -47.9,
    ndvi_hist: [0.42, 0.38, 0.31, 0.26, 0.21, 0.18, 0.15],
    umidade_hist: [48, 43, 39, 35, 31, 29, 28],
    recomendacao: 'CRÍTICO: Estresse hídrico severo. Irrigar imediatamente 35L/m². NDVI em colapso — risco de perda total da safra em 5–7 dias sem intervenção.',
  },
  {
    id: 4, nome: 'Fazenda Santa Maria', cultura: 'Cana-de-açúcar', area_ha: 680,
    ndvi: 0.85, umidade: 75, temp: 22.8, irrigacao: 8, horario: '07:00',
    status: 'ok', mapX: 62, mapY: 66, lat: -21.1, lng: -47.5,
    ndvi_hist: [0.80, 0.81, 0.83, 0.82, 0.84, 0.85, 0.85],
    umidade_hist: [74, 75, 74, 76, 75, 75, 75],
    recomendacao: 'Excelente condição vegetativa. Cana-de-açúcar em ótimo desenvolvimento. Manter irrigação reduzida de 8L/m². Previsão de safra acima da média.',
  },
];

/* ─── DASHBOARD ─── */
export const ALERTAS_30D = [3,5,2,8,4,6,3,9,12,7,5,8,4,6,11,8,5,3,7,9,6,4,8,12,7,5,8,10,6,12];

export const ALERTAS_REGIAO = [
  { reg: 'MT', val: 45, color: '#E53935' },
  { reg: 'PA', val: 38, color: '#E53935' },
  { reg: 'AM', val: 32, color: '#F4A261' },
  { reg: 'RS', val: 28, color: '#F4A261' },
  { reg: 'SP', val: 24, color: '#FFC107' },
  { reg: 'BA', val: 19, color: '#FFC107' },
];

export const MODULO_DIST = [
  { label: 'AgriSat',       val: 42, color: '#00D4AA' },
  { label: 'SentinelAlert', val: 35, color: '#F4A261' },
  { label: 'EcoTrack',      val: 23, color: '#43A047' },
];

/* ─── ECOTRACK ─── */
export const DESMATA_AREAS = [
  { id: 1, nome: 'Pará — Corredor Norte',     area_km2: 342, co2_ton: 48_600, creditos: 1200, data: '2026-05-28', status: 'confirmado',  score_esg: 12 },
  { id: 2, nome: 'MT — Corredor MT-AM',        area_km2: 189, co2_ton: 26_800, creditos: 670,  data: '2026-05-25', status: 'confirmado',  score_esg: 28 },
  { id: 3, nome: 'GO — Cerrado Central',       area_km2: 95,  co2_ton: 13_500, creditos: 338,  data: '2026-05-20', status: 'monitorando', score_esg: 45 },
  { id: 4, nome: 'SC — Mata Atlântica Sul',    area_km2: 28,  co2_ton: 3_970,  creditos: 99,   data: '2026-05-15', status: 'confirmado',  score_esg: 67 },
  { id: 5, nome: 'RO — Rondônia Sudoeste',    area_km2: 78,  co2_ton: 11_050, creditos: 276,  data: '2026-05-10', status: 'confirmado',  score_esg: 33 },
];

export const CARBON_MERCADO = [
  { empresa: 'AgroGreen Ltda',     creditos: 450, valor_unit: 28.50, total: 12_825, prazo: '2026-12-31' },
  { empresa: 'Petrolífera Alfa S/A', creditos: 800, valor_unit: 31.00, total: 24_800, prazo: '2027-06-30' },
  { empresa: 'Construtora Beta',   creditos: 220, valor_unit: 27.00, total: 5_940,  prazo: '2026-09-15' },
];

export const CO2_HIST = [120, 145, 98, 210, 167, 89, 134, 178, 203, 156, 190, 231];

/* ─── RELATÓRIOS ─── */
export const RELATORIOS = [
  { id: 1, titulo: 'Relatório de Desmatamento — Maio/2026',         modulo: 'EcoTrack',      data: '2026-06-01', tamanho: '2.4 MB', status: 'pronto'  },
  { id: 2, titulo: 'Análise AgriSat — Fazenda São João — Sem. 22',  modulo: 'AgriSat',       data: '2026-05-31', tamanho: '1.1 MB', status: 'pronto'  },
  { id: 3, titulo: 'Consolidado Alertas SentinelAlert — Maio/2026', modulo: 'SentinelAlert', data: '2026-05-31', tamanho: '3.2 MB', status: 'pronto'  },
  { id: 4, titulo: 'Dashboard Executivo — Maio/2026',               modulo: 'Geral',         data: '2026-05-30', tamanho: '4.7 MB', status: 'pronto'  },
  { id: 5, titulo: 'Emissões CO₂ — Q1/2026',                        modulo: 'EcoTrack',      data: '2026-04-01', tamanho: '2.8 MB', status: 'pronto'  },
  { id: 6, titulo: 'Previsão Climática — Junho/2026',               modulo: 'SentinelAlert', data: '2026-06-01', tamanho: '—',      status: 'gerando' },
  { id: 7, titulo: 'Score ESG Trimestral — Empresas Parceiras',     modulo: 'EcoTrack',      data: '2026-06-01', tamanho: '—',      status: 'gerando' },
];

/* ─── CHAT HISTÓRIA (Assistente) ─── */
export const CHAT_INICIAL = [
  { id: 1, role: 'ia',   text: 'Olá! Sou a **Nova**, assistente inteligente da NovaTerra. Tenho acesso a dados em tempo real de satélites da NASA, ESA e INPE. Como posso ajudar hoje?', ts: '14:28' },
  { id: 2, role: 'user', text: 'Qual a previsão para a Fazenda Bela Vista essa semana?', ts: '14:29' },
  { id: 3, role: 'ia',   text: 'Analisando dados **Sentinel-2** para a Fazenda Bela Vista...\n\nNDVI atual: **0.41** (abaixo da média histórica). Tendência de queda nos últimos 7 dias.\n\n📡 Previsão climática: temp. 28–32°C, sem chuva prevista nos próximos 5 dias.\n\n💧 **Recomendação:** Irrigação urgente — 24L/m² às 05:30 e 19:00. Risco de perda parcial da safra se não irrigado em 48h.', ts: '14:29', action: 'Gerar Relatório AgriSat' },
  { id: 4, role: 'user', text: 'Tem queimadas ativas no Mato Grosso?', ts: '14:31' },
  { id: 5, role: 'ia',   text: 'Detectei **3 focos ativos** via NASA MODIS em MT:\n\n🔴 Chapada dos Guimarães — CRÍTICO | 124 km² | 312 focos\n🟠 Alto Araguaia — ALTO | 67 km² | 148 focos\n🟡 Barra do Garças — MÉDIO | 31 km² | 89 focos\n\nScore de risco regional: **94/100**. Defesa Civil do MT já notificada automaticamente.', ts: '14:31', action: 'Ver no Mapa' },
  { id: 6, role: 'user', text: 'Gere um relatório de desmatamento de maio', ts: '14:33' },
  { id: 7, role: 'ia',   text: 'Gerando **Relatório EcoTrack — Maio/2026**...\n\n📊 Área total desmatada: **532 km²**\n💨 CO₂ emitido estimado: **75.370 toneladas**\n🌱 Créditos de carbono disponíveis: **1.870 unidades** (R$ 56.940)\n\nRelatório gerado com sucesso! Disponível em /relatorios.', ts: '14:33', action: '⬇ Baixar PDF' },
];
