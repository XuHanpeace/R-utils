## 这是一个提供了函数组合、函数柯里化和一些常用函数的工具库

[![NPM](https://nodei.co/npm/rapper-utils.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/rapper-utils/)

## Installation
```javascript
npm install -g rapper-utils
```

## Usage
```javascript
var R = require('rapper-utils');
```

### 函数柯里化 (currying)
```javascript
/*例一：声明一个替换空格的函数*/
//柯里化replace函数
var replace = R.curry(function(reg, replacement, str) {
    	return str.replace(reg, replacement);
	});

var replaceSpace = replace(/\s+/g, 'Space');

//调用
var space = " gang ";
space = replaceSpace(space);
console.log(space); //output: SpacegangSpace;空格被替换成了Space

/*例二：声明一个对数组每一项加一的函数*/
//柯里化map函数
var map = curry(function(fn, arr){
		return arr.map(fn);
	});

var mapAdd = map(function(item){
		return item + 1;
	});

//调用
var arr = [1,2,3];
arr = mapAdd(arr);
console.log(arr);	//output:[2,3,4];
```

## 纯函数组合 (composing)
```javascript
var greeting = function(firstName, lastName){
	return 'My name is' + lastName + ',' + firstName;
}
var toUpper = function(str){
	return str.toUpperCase();
}
var repeat = function(str){
	return str.repeat(2);
}

//上面三个函数是干嘛的就不说了，他们有一个特点就是都是输出一个与参数相关的值，是纯函数
//将三个纯函数组合
var composed = R.compose(repeat, toUpper, greeting);
var result = composed('Han', 'Xu');
console.log(result); //MY NAME IS XU,HANMY NAME IS XU,HAN
```

## 获取字符串字节数 (sizeof)
```javascript
//这个就很简单了
var str = '爱就一个字peace';
var size = R.sizeof(str, 'utf-8');
console.log(size); //output: 20;
//在utf-8编码下，绝大多数汉字每个字符占3 Bytes。
//5个汉字再加上5个ASCII码，所以输出结果是 **3x5+5=20** Bytes 
```

## 快速排序 (quickSort)和冒泡排序 (bubbleSort)
```javascript
//快速排序
var arr = [3,44,1,6,41];
var sorted = R.quickSort(arr);
console.log(sorted); //output: [1,3,6,41,44]

//冒泡排序
var arr2 = [3,44,1,6,41];
var sorted2 = R.bubbleSort(arr2);
console.log(arr2); //output: [1,3,6,41,44]
```