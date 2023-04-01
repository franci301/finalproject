export default function formatNormValues(values){
    let arr = [];
    for(let value of values){
        let data = {r:value.mapValue.fields.r.doubleValue, g:value.mapValue.fields.g.doubleValue, b: value.mapValue.fields.b.doubleValue};
        arr.push(data);
    }
    return arr;
}