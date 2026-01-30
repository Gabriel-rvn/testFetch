const inputValue = "abcde#fghij"

const [gameName, tagLine, semvalor] = inputValue.split("#"); 

console.log(gameName);
console.log(tagLine);
console.log(semvalor);

const abacaxi = "1230334542640542542504524542524"

const [fatia1, fatia2, fatia3, fatia4, fatia5] = abacaxi.split("0");

console.log(fatia1);
console.log(fatia2);
console.log(fatia3);
console.log(fatia4);
console.log(fatia5);

const nomeCompleto = "abc#def#ghi#jkl#mno#pqr#rtu#vxz#";
const partes = nomeCompleto.split("#");

const fatiaDoAlfabeto = partes[0];
const fatiaDoAlfabeto2 = partes[5];

console.log(fatiaDoAlfabeto, fatiaDoAlfabeto2);