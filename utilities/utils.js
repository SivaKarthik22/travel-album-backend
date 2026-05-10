function buildNestedObj(flatObj){
    const nestedObj = {};
    for (const [key, value] of Object.entries(flatObj)) {
        const keySliptArray = key.split('-');
        buildProperty(nestedObj, keySliptArray, value);
    }
    return nestedObj;
}

/* function buildProperty(obj, keysArray, value){
    const key = keysArray.shift();
    if(isNumeric(key)){
        const index = Number(key);
        if(keysArray.length == 0){
            if(index >= obj.length )
                obj.push(value);
            else
                obj[index] = value;
        }
        else if(isNumeric(keysArray[0])){
            if(index >= obj.length )
                obj.push([]);
            buildProperty(obj[index], keysArray, value);
        }
        else{
            if(index >= obj.length )
                obj.push({});
            buildProperty(obj[index], keysArray, value);
        }
    }
    else {
        if(keysArray.length == 0)
            obj[key] = value;
        else if(isNumeric(keysArray[0])){
            if(!obj[key])
                obj[key] = [];
            buildProperty(obj[key], keysArray, value);
        }
        else{
            if(!obj[key])
                obj[key] = {};
            buildProperty(obj[key], keysArray, value);
        }
    }
} */

function buildProperty(obj, keysArray, value){
    let key = keysArray.shift();
    const keyIsNumeric = isNumeric(key);
    if(keyIsNumeric) key = parseInt(key);

    if(keysArray.length == 0){
        if(keyIsNumeric && key >= obj.length)
            obj.push(value);
        else
            obj[key] = value;
    }
    else if(isNumeric(keysArray[0])){
        if(keyIsNumeric && key >= obj.length)
            obj.push([]);
        else if(!obj[key])
            obj[key] = [];
        buildProperty(obj[key], keysArray, value);
    }
    else{
        if(keyIsNumeric && key >= obj.length )
            obj.push({});
        else if(!obj[key])
            obj[key] = {};
        buildProperty(obj[key], keysArray, value);
    }
}

function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseInt(str));
}

module.exports = {
    buildNestedObj,
};