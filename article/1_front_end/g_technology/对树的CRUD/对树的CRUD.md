现有要求，有一数据格式为：`type Data = {title:string; key:string; children: Data[]}[]` 的对象数组 Data，

现需要通过字符串数组（全是 key，如：[key1, key2, ...]）从 Data 中删除指定的 key，实现如下：

查看增删改查详细代码，参见：[此处](https://codesandbox.io/s/zeng-shan-gai-cha-tree-4ku0wk?file=/demo.tsx) 

```js
const treeData = [
  {
      title: "0-0",
      key: "0-0",
      children: [
          {
              title: "0-0-0",
              key: "0-0-0",
              children: [ { title: "0-0-0-0", key: "0-0-0-0" }, ]
          },
          {
              title: "0-0-1",
              key: "0-0-1",
              children: [
                  { title: "0-0-1-0", key: "0-0-1-0" },
                  { title: "0-0-1-1", key: "0-0-1-1" },
              ]
          },
      ]
  },
];
const checkedKeys = [
    "0-0-0", "0-0-1-0",
]
```

```typescript
// 包含副作用的递归
const digui = (dataSource, checkedKey) => {
  for (let index = 0; index < dataSource.length; index++) {
    const { key, children } = dataSource[index];
    // 当前层级找到了 checkedKey，则移除对应的节点
    if (key === checkedKey) {
      dataSource.splice(index, 1); // 删除选中的当前节点
      return;
    }

    // 如果当前层级存在 children，且不存在 checkedKey，则递归 children
    // 直到在某一层级找到 checkedKey，或一直没找到
    //（通常来说没有这可能，因为 checkedKey 代表的是选中的 key，说明存在于 dataSource）
    if (children) {
      digui(children, checkedKey);
    }
  }
};

// 用来让递归函数的副作用不影响到其它地方的函数
function remove(dataSource, checkedKeys) {
  // 深拷贝，使得直接修改参数 dataSource 不会影响到传入的 dataSource
  const data = _.cloneDeep(dataSource);

  checkedKeys.forEach((checkedKey) => {
    digui(data, checkedKey);
  });

  return data;
}
```

```js
// 调用
const data = remove(treeData, checkedKeys)
```
