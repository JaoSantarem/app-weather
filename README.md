# 🌤️ Weather App

Uma aplicação de previsão do tempo moderna e responsiva construída com Next.js, React Query e TypeScript.

## ✨ Funcionalidades

### ✅ Obrigatórias
- **Componentização e reutilização**: Componentes modulares e reutilizáveis
- **Biblioteca de ícones**: Uso de emojis como ícones de clima
- **Organização de código**: Estrutura bem organizada com separação de responsabilidades
- **Cobertura de testes**: Testes unitários para componentes e hooks

### 🎯 Opcionais (Implementadas)
- **Tradução e troca de unidades**: Suporte a Celsius e Fahrenheit
- **Responsividade**: Design responsivo para todos os dispositivos
- **Geolocalização**: Botão para usar localização atual
- **Busca de cidades**: Autocomplete para buscar outras cidades

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **React Query (TanStack Query)** - Gerenciamento de estado e cache
- **Axios** - Cliente HTTP
- **CSS Modules** - Estilização modular
- **Jest & Testing Library** - Testes unitários

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta na [WeatherAPI.com](https://www.weatherapi.com/) (gratuita)

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/weather-app.git
cd weather-app
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure a API Key**
   - Crie uma conta em [WeatherAPI.com](https://www.weatherapi.com/)
   - Obtenha sua API key gratuita
   - Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_WEATHER_API_KEY=sua_api_key_aqui
```

4. **Execute o projeto**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── providers.tsx      # Providers (React Query)
│   └── globals.css        # Estilos globais
├── components/            # Componentes reutilizáveis
│   ├── CitySearch.tsx     # Busca de cidades
│   ├── WeatherCard.tsx    # Card principal de clima
│   ├── LoadingSpinner.tsx # Componente de loading
│   ├── UnitToggle.tsx     # Toggle de unidades
│   └── __tests__/         # Testes dos componentes
├── hooks/                 # Hooks personalizados
│   ├── useWeather.ts      # Hook para dados de clima
│   └── __tests__/         # Testes dos hooks
├── services/              # Serviços de API
│   └── weatherApi.ts      # Cliente da WeatherAPI
└── types/                 # Definições de tipos
    └── weather.ts         # Tipos do clima
```

## 🎨 Componentes

### CitySearch
- Busca de cidades com autocomplete
- Suporte a geolocalização
- Navegação por teclado (setas, Enter, Escape)

### WeatherCard
- Exibição do clima atual
- Previsão para 7 dias
- Detalhes como umidade, vento, pressão, etc.
- Ícones baseados em códigos de condição

### UnitToggle
- Alternância entre Celsius e Fahrenheit
- Estado persistente durante a sessão

### LoadingSpinner
- Componente de loading reutilizável
- Suporte a diferentes tamanhos e mensagens

## 🔧 Configuração da API

A aplicação usa a [WeatherAPI.com](https://www.weatherapi.com/) que oferece:

- **Plano gratuito**: 1 milhão de requisições/mês
- **Dados em tempo real**: Clima atual e previsões
- **Cobertura global**: Mais de 3 milhões de cidades
- **Dados detalhados**: Umidade, vento, pressão, UV, etc.

### Endpoints utilizados:
- `/forecast.json` - Clima atual e previsão
- `/search.json` - Busca de cidades

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:
- **Desktop**: > 768px
- **Tablet**: 480px - 768px  
- **Mobile**: < 480px

## 🎯 Funcionalidades Implementadas

### Busca de Cidades
- Autocomplete em tempo real
- Suporte a múltiplos idiomas
- Navegação por teclado
- Geolocalização automática

### Exibição de Dados
- Temperatura atual e sensação térmica
- Condição climática com ícones
- Umidade, vento, pressão atmosférica
- Índice UV
- Previsão para 7 dias

### Interatividade
- Toggle entre Celsius e Fahrenheit
- Busca de cidades
- Geolocalização
- Estados de loading e erro

## 🧪 Cobertura de Testes

Testes implementados para:
- ✅ Componentes (LoadingSpinner, UnitToggle)
- ✅ Hooks (useWeather)
- ✅ Funcionalidades de UI
- ✅ Interações do usuário

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure a variável de ambiente `NEXT_PUBLIC_WEATHER_API_KEY`
3. Deploy automático a cada push

### Outras plataformas
A aplicação pode ser deployada em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- [WeatherAPI.com](https://www.weatherapi.com/) - Dados de clima
- [Next.js](https://nextjs.org/) - Framework React
- [TanStack Query](https://tanstack.com/query) - Gerenciamento de estado
- [React Testing Library](https://testing-library.com/) - Testes

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando Next.js e TypeScript**
