// Implemente uma função que execute uma cópia profunda de um valor, mas também manipule referências circulares.

// A cópia profunda é um processo que cria uma nova instância de um objeto, copiando não apenas as propriedades e valores do objeto original, mas também duplicando todas as referências de objetos aninhados, garantindo que duas estruturas de objeto não compartilhem referências de seus objetos internos. Vamos analisar a função deepCopy parte por parte:

function deepCopy(obj, map = new WeakMap()) {
  if (obj == null || typeof obj !== "object") {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }

  const result = Array.isArray(obj) ? [] : {};
  map.set(obj, result);

  for (const key of Object.keys(obj)) {
    result[key] = deepCopy(obj[key], map);
  }

  return result;
}

const obj = {};
obj.self = obj;
const copy = deepCopy(obj);
console.log(copy === obj); // false
console.log(copy.self === copy); // True

// Parâmetros
// obj: O objeto que será copiado.
// map = new WeakMap(): Um WeakMap opcional utilizado para controlar referências circulares dentro do objeto. Esse mapa é inicializado com um novo WeakMap se nenhum for fornecido.

// Corpo da Função
// Verificação Inicial: Primeiro, a função verifica se o obj é null ou não é um objeto (typeof obj !== "object"). Se alguma dessas condições for verdadeira, a função simplesmente retorna o próprio obj. Isso é necessário porque tipos primitivos (como números, strings e booleans) e null não são objetos e não precisam ser copiados profundamente.

// Verificação no WeakMap: Em seguida, a função verifica se o objeto já foi visitado durante a cópia (isso é verificado pelo map.has(obj)). Se já foi visitado, a função retorna a cópia desse objeto do WeakMap para evitar referências circulares e duplicação infinita.

// Criação do Objeto de Resultado: Dependendo de se obj é uma array (Array.isArray(obj)) ou um objeto regular, result é inicializado como uma array ou um objeto, respectivamente.

// Adição ao WeakMap: O objeto original (obj) é adicionado ao WeakMap com sua cópia (result) como valor. Isso é feito para manter um registro de todos os objetos que já foram copiados.

// Cópia das Propriedades: A função itera sobre todas as propriedades do objeto original (Object.keys(obj)) e copia cada propriedade para o novo objeto (result). Para cada propriedade, a função é chamada recursivamente (deepCopy(obj[key], map)), garantindo que todas as propriedades de objetos aninhados também sejam copiadas profundamente.

// Retorno
// A função retorna result, que é a cópia profunda do objeto original.
// Métodos Usados
// Array.isArray(): Verifica se o valor fornecido é uma array.
// Object.keys(): Retorna um array contendo os nomes das propriedades próprias (não herdadas) de um objeto.
// WeakMap: É uma coleção de pares chave/valor em que as chaves são apenas objetos e os valores podem ser valores arbitrários. WeakMap é "fraco", o que significa que as referências a objetos-chave são mantidas de forma fraca, permitindo que eles sejam coletados como lixo se não houver outras referências para o objeto.
// Uso do WeakMap
// O uso de WeakMap é crucial para lidar com objetos que têm referências circulares. Sem ele, a função entraria em um loop infinito ao tentar copiar um objeto que se referencia direta ou indiretamente. Ao mapear cada objeto original para sua cópia profunda, WeakMap garante que a função possa identificar e reutilizar cópias de objetos que já foram processados, preservando a estrutura do objeto sem causar um loop infinito.
