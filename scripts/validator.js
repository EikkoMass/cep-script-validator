const context = "prod2";

import * as cepList from '../resources/prod.json';
import * as ranges from '../resources/formatedranges.json'

let validos = [];
let invalidos = [];
let validosTemp = [];
let invalidosTemp = [];
let fullLength = cepList["default"].length;

for (let i = 0; i < fullLength; i++) {
    console.log(`${(i / fullLength) * 100}%`);
    testef(cepList["default"][i]);

    if(invalidosTemp.length == 10000 || i == fullLength - 1)
    {
        invalidos.push(...invalidosTemp);
        invalidosTemp = [];
    }

    if(validosTemp.length == 10000 || i == fullLength - 1)
    {
        validos.push(...validosTemp);
        validosTemp = [];
    }

}

console.log(`Num Validos: ${validos.length}`);
console.log(`Num Invalidos: ${invalidos.length}`);
await Bun.write(`./temp/total_${context}.json`, JSON.stringify({validos, invalidos}));
await Bun.write(`./temp/validos_${context}.json`, JSON.stringify(validos));
await Bun.write(`./temp/invalidos_${context}.json`, JSON.stringify(invalidos));

function testef(element) {
    const ceps = ranges["default"];

    if (element.CEP === '00000000' || element.CEP === '11111111' || element.CEP === '12345678') {
        invalidosTemp.push({ id: element.ID, error: "mockupcep" });
        return;
    }
     if (ceps[element.UF] == undefined) {
        invalidosTemp.push({ id: element.ID, error: "invalidstate" });
        return;
    }
     if (ceps[element.UF].some(cep => element.CEP >= cep["postcode_min_range"] && element.CEP <= cep["postcode_max_range"])) {
        validosTemp.push({id: element.ID});
        return;
    } 

    invalidosTemp.push({ id: element.ID, error: "excededceprangebyregion" });
}

