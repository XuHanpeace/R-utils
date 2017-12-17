/*!

 * Functional version of Reasy validation library

 *	Copyright (c) 2017 XuHanpeace, contributors

 * Released under MIT license

 */

 'use strict'

//保存各个工具函数的全局对象
var R = {} 

 //先实现两个纯函数的组合
var _pipe = function(func1,func2) {
    return function(){
        //获取参数arguments
        var args = Array.prototype.slice.call(arguments,0)
        //闭包会将func1和func2保留
        return func2.call(this,func1.apply(this,args))
    }
}
//函数化reverse
var _reverse = function(str) {
    return str.reverse()
}
//利用reduce函数，实现多函数的组合
var compose = function(){
    var args = Array.prototype.slice.call(arguments,0)
    //args.shift()作为第一个参数，依次与args里面的函数组合
    return _reverse(args).reduce(_pipe,args.shift())
}



module.exports = {
	'compose': compose
}

