import cristoImg from "@/assets/cristo-hero.jpg";
import beachImg from "@/assets/rio-beach.jpg";
import comidaImg from "@/assets/comida-tipica.jpg";
import eventosImg from "@/assets/eventos-rio.jpg";
import hotelImg from "@/assets/hotel-rio.jpg";

export const IMG = { cristo: cristoImg, beach: beachImg, comida: comidaImg, eventos: eventosImg, hotel: hotelImg };

export type Place = {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  price: string;
  duration: string;
  image: string;
  description: string;
  bookingUrl?: string;
};

export const PLACES: Place[] = [
  { id: "cristo", name: "Cristo Redentor", category: "Ponto turístico", neighborhood: "Corcovado", price: "R$ 110", duration: "3h", image: cristoImg, description: "Uma das 7 maravilhas do mundo moderno. Ingresso pelo trem do Corcovado.", bookingUrl: "https://paineirascorcovado.com.br/" },
  { id: "pao", name: "Pão de Açúcar", category: "Ponto turístico", neighborhood: "Urca", price: "R$ 160", duration: "3h", image: beachImg, description: "Bondinho com vista panorâmica da Baía de Guanabara.", bookingUrl: "https://www.bondinho.com.br/" },
  { id: "copa", name: "Praia de Copacabana", category: "Praia", neighborhood: "Copacabana", price: "Grátis", duration: "Livre", image: beachImg, description: "Calçadão icônico, quiosques e o famoso mar de Copacabana." },
  { id: "lage", name: "Parque Lage", category: "Natureza", neighborhood: "Jardim Botânico", price: "Grátis", duration: "2h", image: cristoImg, description: "Mansão histórica aos pés do Corcovado com café e trilha." },
  { id: "amanha", name: "Museu do Amanhã", category: "Museu", neighborhood: "Centro", price: "R$ 30 (terça grátis)", duration: "2h", image: beachImg, description: "Museu de ciências sobre futuro e sustentabilidade.", bookingUrl: "https://museudoamanha.org.br/" },
  { id: "mureta", name: "Mureta da Urca", category: "Pôr do sol", neighborhood: "Urca", price: "Grátis", duration: "1h", image: beachImg, description: "Pôr do sol mais bonito do Rio com cervejinha barata." },
];

export const FOODS = [
  { id: "feijoada", name: "Feijoada", desc: "Prato nacional aos sábados, ideal com caipirinha.", image: comidaImg, where: "Casa da Feijoada (Ipanema), Bar do Mineiro (Santa Teresa)" },
  { id: "picanha", name: "Picanha na chapa", desc: "Carne suculenta servida em rodízios e botecos.", image: comidaImg, where: "Galeto Sat's (Copacabana)" },
  { id: "acai", name: "Açaí na tigela", desc: "Refrescante, energético, encontrado nos quiosques de praia.", image: comidaImg, where: "Quiosques do Leblon e Ipanema" },
  { id: "pasteldefeira", name: "Pastel de feira", desc: "Crocante e barato, com caldo de cana gelado.", image: comidaImg, where: "Feira da Glória (domingos)" },
  { id: "biscoito", name: "Biscoito Globo + Mate", desc: "O combo praiano clássico carioca.", image: comidaImg, where: "Toda praia da Zona Sul" },
  { id: "joelho", name: "Joelho de porco", desc: "Boteco alemão raiz, prato farto.", image: comidaImg, where: "Bar Lagoa" },
];

export const HOTELS = [
  { id: "fasano", name: "Hotel Fasano Rio", area: "Ipanema", tier: "Luxo", price: "R$ 2.500/noite", image: hotelImg, description: "Vista direta para a praia, rooftop com piscina." },
  { id: "selina", name: "Selina Lapa", area: "Lapa", tier: "Hostel/Co-living", price: "R$ 90/noite", image: hotelImg, description: "Vibração boêmia no coração da vida noturna." },
  { id: "santa", name: "Casa Marques", area: "Santa Teresa", tier: "Boutique", price: "R$ 480/noite", image: hotelImg, description: "Charme histórico, café da manhã artesanal." },
  { id: "pestana", name: "Pestana Rio Atlântica", area: "Copacabana", tier: "4 estrelas", price: "R$ 850/noite", image: hotelImg, description: "Beira-mar em Copacabana, piscina no terraço." },
  { id: "yoo", name: "Yoo2 Botafogo", area: "Botafogo", tier: "Design", price: "R$ 620/noite", image: hotelImg, description: "Vista para o Pão de Açúcar, design jovem." },
];

export const EVENTS = [
  { id: "carnaval", name: "Carnaval de Rua", date: "Fev/Mar 2026", area: "Cidade toda", image: eventosImg, desc: "+500 blocos pelas ruas. Gratuito." },
  { id: "rir", name: "Rock in Rio", date: "Set 2026", area: "Parque Olímpico", image: eventosImg, desc: "Maior festival de música do mundo." },
  { id: "reveillon", name: "Réveillon de Copacabana", date: "31/Dez", area: "Copacabana", image: eventosImg, desc: "2,5 milhões de pessoas, queima de fogos no mar." },
  { id: "lapa", name: "Samba na Pedra do Sal", date: "Toda segunda", area: "Pedra do Sal", image: eventosImg, desc: "Roda de samba histórica e gratuita." },
];

export const ROTAS = [
  { id: "1dia", title: "Rio em 1 dia (clássico)", stops: ["Cristo Redentor (manhã)", "Almoço no Aprazível (Santa Teresa)", "Pão de Açúcar (pôr do sol)", "Jantar e samba na Lapa"], cost: "R$ 350", image: cristoImg },
  { id: "barato", title: "Rio econômico (3 dias)", stops: ["Mureta da Urca + praia", "Parque Lage + Jardim Botânico", "Museu do Amanhã (terça grátis)", "Feira de São Cristóvão (sábado)"], cost: "R$ 180", image: beachImg },
  { id: "praia", title: "Roteiro praiano", stops: ["Arpoador (nascer do sol)", "Ipanema (Posto 9)", "Leblon", "Pôr do sol no Arpoador"], cost: "R$ 80", image: beachImg },
  { id: "noite", title: "Vida noturna", stops: ["Pedra do Sal (segunda)", "Lapa", "Botafogo (Comuna)", "Centro Cultural Carioca"], cost: "R$ 200", image: eventosImg },
];
