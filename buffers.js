// let arr = [1, 2, 3, 4];
// let bufferValue = Buffer.from(arr);
// console.log(bufferValue);

let value1 = "ABC";
let bufferValue1 = Buffer.from(value1);

let value2 = " XYZ";
let bufferValue2 = Buffer.from(value2);
console.log(bufferValue1, bufferValue2);

let combinedBuffer = Buffer.concat([bufferValue1, bufferValue2]);
console.log(combinedBuffer);
console.log(combinedBuffer.toString());
