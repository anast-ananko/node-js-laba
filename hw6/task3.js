function multiline(template) {
  const cleaned = template[0].replace(/^\n|\n$/g, "").split("\n");
  return cleaned.map((line, i) => `${i + 1} ${line}`).join("\n");
}

const code = multiline`
function add(a, b) {
  return a + b;
}
`;

console.log(code);
// Expected:
// "1 function add(a, b) {
//  2 return a + b;
//  3 }
