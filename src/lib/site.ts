export const site = {
  name: "Emerson Andrade",
  phone: "5577998229945",
  instagram: "https://www.instagram.com/byemersonandrade/",
  maps: "https://share.google/4hUUau6yWPPr5PFyp",
  reviews: "https://share.google/ySiOFRE4icnr4qz7l",
};
export function whatsapp(
  message = "Olá, Emerson Andrade. Gostaria de agendar um atendimento personalizado.",
) {
  return `https://wa.me/${site.phone}?text=${encodeURIComponent(message)}`;
}
