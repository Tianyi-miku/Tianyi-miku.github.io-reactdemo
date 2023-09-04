/*
 * @Description: 自定义类型检测
 * @Author: zhangyuru
 * @Date: 2023-03-01 14:24:38
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-03-01 14:24:50
 * @FilePath: \05-simulation_training_React\src\utils\checkType.ts
 */
/**
 * @description: 判断是否是数组
 * @event: 用法： xxx instanceof isArray
 * @return { boolean } 
 */
export class isArray {
  static [Symbol.hasInstance] (arr: any) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  }
}

/**
 * @description: 判断是否是对象
 * @event: 用法： xxx instanceof isObj
 * @return { boolean } 
 */
export class isObj {
  static [Symbol.hasInstance] (arr: any) {
    return Object.prototype.toString.call(arr) === '[object Object]'
  }
}

/**
 * @description: 万能类型检测
 * @event: 用法： toType(1) 返回 'nunber'
 * @return { string } 
 */
export const toType = (obj: any): string => {
  const classType: any = {}
  const toString = classType.toString
  const types: string[] = [
    'Boolean',
    'Number',
    'String',
    'Function',
    'Array',
    'Date',
    'RegExp',
    'Object',
    'Error',
    'Symbol',
    'Bigint'
  ]
  types.forEach((name: string) => {
    classType[`[object ${name}]`] = name.toLowerCase()
  })
  if (obj == null) {
    return obj + ''
  }
  return typeof obj === 'object' || typeof obj === 'function' ?
    classType[toString.call(obj)] || 'object' :
    typeof obj
}
