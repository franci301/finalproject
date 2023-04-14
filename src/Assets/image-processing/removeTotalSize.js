export default function removeTotalSize(values){
     return values.map((map) => {
        const newMap = new Map(map);
        newMap.delete('total-size');
        return newMap;
      });
}