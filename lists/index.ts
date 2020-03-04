import requireDirectory, { RequireDirectoryResult } from 'require-directory';

const lists:[RequireDirectoryResult<Function>] = requireDirectory(module);
console.log('lists')
console.log(lists);
export default (keystone, options) => Object.entries(lists).forEach(([key,list]) => list.default(keystone, options));