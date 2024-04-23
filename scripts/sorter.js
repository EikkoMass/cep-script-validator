import * as ranges from './resources/cepranges.json'

let ceps = ranges["default"];
let main = {};

for (let cep of ceps) {

    if (main[cep.state] === undefined || main[cep.state] === null) {
        main[cep.state] = [cep];
    } else {
        main[cep.state].push(cep);
    }

   
}
await Bun.write("./temp/data.json", JSON.stringify(main));