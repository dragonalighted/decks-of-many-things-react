

let fs = require('fs'); 
let path = require('path'); 

const iconFolderPath = path.resolve('../img/icons/');
const jsFilePath = path.resolve('../src/resource/icons.js');


let results = {}; 

function catSort(a, b) {
    if(a.name === 'default') return -1; 
    if(b.name === 'default') return 1; 
    return a.name.localeCompare(b.name); 
}
function walk(dir) {
    let categoryName = dir.substring( iconFolderPath.length).replace('/', '').replace('\\', '');
    let category = {name: categoryName || 'default', path : dir, icons: [] }; 
    let categories = []; 

    let fileList = fs.readdirSync(category.path);
    for(let fileName of fileList) {
        let filePath = path.resolve(category.path,fileName);
        let stats = fs.statSync(filePath);
        if(stats.isDirectory()) {
            let subCat = walk(filePath);
            categories = categories.concat(subCat); 
        }
        else {
            category.icons.push({
                name: fileName.substring(0, fileName.lastIndexOf('.'))
                , path : `./img/icons/${category.name === 'default'? '' : category.name + '/'}${fileName}`
            })
        }  
    }

    if(category.icons.length > 0) categories.push(category); 
    return categories; 
}

function toCatString(cat) {
    return `  { name:'${cat.name}', path:'${cat.path}',\n    icons:[${cat.icons.map(toIconString).join(',')}]\n  }`; 
} 
function toIconString(icon) {
    return `\n      {name:'${icon.name}', path:'${icon.path}'}`;
}

let categories = walk(iconFolderPath);

categories.sort(catSort);
categories.forEach(function(cat) {
    cat.icons.sort(catSort );
})



// =======================================================
// ========= WRITE TO FILE ===============================
// =======================================================
fs.writeFileSync(jsFilePath, `const icons = [\n${categories.map(toCatString).join(',\n')}\n];\n export {icons};`);


function stringify(inputObject){

}
function fattener( inputObject, outputPath, variableName ){


    fs.writeFileSync(outputPath, `const ${variableName} = ${stringify(inputObject)};\n\nexport {${variableName}};`);
}