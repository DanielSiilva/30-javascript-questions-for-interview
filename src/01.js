//Implemente uma função que serializa um valor Javascript em uma cadeia de caracteres JSON.

const obj = { nome: "Daniel", age: 30 };

((value) => {
  console.log(JSON.stringify(value));
  //return JSON.stringify(value);
})(obj);
