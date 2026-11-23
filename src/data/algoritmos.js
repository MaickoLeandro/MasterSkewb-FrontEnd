const nomes = ["U2", "R U R'", "L' U' L", "R' U R", "B U B'", "U R U' R'", "L U L'", "U' B' U B"];

export const metodos = ["NS", "EG2", "FL", "FF"];
export const categorias = ["LC / CC", "LC / CC 2", "Só CC"];

export const algoritmos = Array.from({ length: 144 }, (_, i) => ({
  id: i + 1,
  nome: nomes[i % nomes.length],
  caso: "Desconhecido",
  variantes: [
    { sequencia: "R' R U U B B'", autor: "@Roberto" },
    { sequencia: "R' B U R B B'", autor: "@Roberto" },
  ],
}));