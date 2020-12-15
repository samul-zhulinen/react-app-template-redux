// Omit 属性忽略
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// 返回一个全部由string组成的 元组
export const tuple = <T extends string[]>(...args: T) => args;

// 返回一个全部由number组成的 元组
export const tupleNum = <T extends number[]>(...args: T) => args;
