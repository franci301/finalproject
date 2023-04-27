export default function euclideanDistance(color1,color2){
    return Math.sqrt(
      Math.pow(color1.L - color2.L, 2) +
      Math.pow(color1.a - color2.a, 2) +
      Math.pow(color1.b - color2.b, 2)
    );
}