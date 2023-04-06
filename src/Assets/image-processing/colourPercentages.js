export function sumHistogram(blocks) {
  const percentages = new Map();
  for(let block of blocks){
    let keys = block.keys()
    for(let colourName of keys){
      if(percentages.has(colourName)){
          percentages.set(colourName,percentages.get(colourName)+ block.get(colourName))
        }else{
          percentages.set(colourName,block.get(colourName))
        }
    }
  }
  let keys = percentages.keys();
  for(let key of keys){
    if(percentages.get(key) < 1000){
      percentages.delete(key)
    }
  }
  return percentages;
}