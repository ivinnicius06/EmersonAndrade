export type Measurements = {
  height: number;
  weight: number;
  shoulders: number;
  chest: number;
  waist: number;
  hips: number;
};
export const initialMeasurements: Measurements = {
  height: 178,
  weight: 78,
  shoulders: 47,
  chest: 104,
  waist: 88,
  hips: 100,
};
export const measureFields: {
  key: keyof Measurements;
  label: string;
  question: string;
  unit: string;
  min: number;
  max: number;
  help: string;
}[] = [
  {
    key: "height",
    label: "Altura",
    question: "Qual é a sua altura?",
    unit: "cm",
    min: 140,
    max: 215,
    help: "Descalço, meça do chão até o topo da cabeça.",
  },
  {
    key: "weight",
    label: "Peso",
    question: "Qual é o seu peso?",
    unit: "kg",
    min: 40,
    max: 160,
    help: "Informe seu peso atual aproximado.",
  },
  {
    key: "shoulders",
    label: "Ombros",
    question: "De ombro a ombro.",
    unit: "cm",
    min: 32,
    max: 65,
    help: "Meça pelas costas, entre as extremidades dos ombros.",
  },
  {
    key: "chest",
    label: "Tórax",
    question: "Agora, o seu tórax.",
    unit: "cm",
    min: 65,
    max: 160,
    help: "Passe a fita ao redor da parte mais larga do peito, sem apertar.",
  },
  {
    key: "waist",
    label: "Cintura",
    question: "Encontre a sua cintura.",
    unit: "cm",
    min: 55,
    max: 160,
    help: "Contorne a cintura natural, mantendo a fita paralela ao chão.",
  },
  {
    key: "hips",
    label: "Quadril",
    question: "Por último, o quadril.",
    unit: "cm",
    min: 65,
    max: 160,
    help: "Meça a circunferência na parte mais larga do quadril.",
  },
];
export function profileMessage(
  name: string,
  phone: string,
  values: Measurements,
) {
  return `Olá, Emerson Andrade.\n\nGostaria de receber um atendimento personalizado.\n\nMeu perfil:\nNome: ${name.trim()}\nWhatsApp: ${phone.trim()}\n${measureFields.map((f) => `${f.label}: ${values[f.key]} ${f.unit}`).join("\n")}\n\nOrigem: EA Fit — Landing Page.`;
}
