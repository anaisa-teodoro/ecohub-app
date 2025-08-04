import { ONG } from '../types/ONG';
import caranguejoImg from '../assets/caranguejo.png';
import neocarbonImg from '../assets/neocarbon.png';
import vivaCidadeImg from '../assets/viva-cidade-logo.png';
import imaImg from '../assets/ima.png';

const ONG_STORAGE_KEY = 'ongs';

const defaultONGs: ONG[] = [
  {
    id: '1',
    nome: 'Instituto Caranguejo de Educação Ambiental',
    descricao: 'Promove ações de educação ambiental em escolas, comunidades e eventos, com foco na sustentabilidade e preservação da biodiversidade.',
    imagem: caranguejoImg,
    meta: 10000,
    arrecadado: 4500,
  },
  {
    id: '2',
    nome: 'Instituto Neo Carbon',
    descricao: 'Atua na mitigação das mudanças climáticas, conectando setores emissores de carbono com projetos de sequestro de carbono.',
    imagem: neocarbonImg,
    meta: 15000,
    arrecadado: 8200,
  },
  {
    id: '3',
    nome: 'Instituto Viva a Cidade (IVC)',
    descricao: 'Atua na revitalização do Rio Cachoeira e na promoção da cidadania ambiental em Joinville.',
    imagem: vivaCidadeImg,
    meta: 12000,
    arrecadado: 12000,
  },
  {
    id: '4',
    nome: 'Fundação do Meio Ambiente (IMA)',
    descricao: 'Órgão estadual responsável por políticas públicas ambientais, licenciamento e fiscalização ambiental.',
    imagem: imaImg,
    meta: 20000,
    arrecadado: 16750,
  },
];

export function initializeONGs() {
  const existing = localStorage.getItem(ONG_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(ONG_STORAGE_KEY, JSON.stringify(defaultONGs));
  }
}

export function getONGs(): ONG[] {
  const data = localStorage.getItem(ONG_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function updateONGsWithLocalImages() {
  localStorage.setItem(ONG_STORAGE_KEY, JSON.stringify(defaultONGs));
}

export function clearONGs() {
  localStorage.removeItem(ONG_STORAGE_KEY);
}

export function updateONGs(ongs: ONG[]) {
  localStorage.setItem(ONG_STORAGE_KEY, JSON.stringify(ongs));
}
