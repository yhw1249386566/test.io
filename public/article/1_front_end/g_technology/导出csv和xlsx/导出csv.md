# 概念

使用 json2csv 库来帮我们进行导出 csv

# 快速开始

- `yarn add json2csv` / `npm i json2csv`

- ```ts
  import { Parser as JsonParser } from 'json2csv'
  
  const exportCsv = (
      dataSource: {}[],
      headerSource: string[], // as title, value in CSV
      fieldsSource: string[] // corresponding field in the dataSource
  ) => {
      // label: title, value: fieldName
      const fields = headerSource.map((value, key) => {
          return {
              label: value, // csv title
              // 将字段名作为值 => ['accountId','base.userName']
              value: fieldsSource[key] 
          }
      })
      const parser = new JsonParser({ fields })
      const csvContent = parser.parse(dataSource)
      const uri = encodeURI(`data:text/csv;charset=utf-8,\uFEFF${csvContent}`)
      const eLink = document.createElement('a')
      eLink.href = uri
      eLink.download = 'export.csv'
      document.body.appendChild(eLink)
      eLink.click()
      document.body.removeChild(eLink)
  }
  ```

# [导出任意格式的csv](https://codesandbox.io/s/dao-chu-ren-yi-ge-shi-de-csv-5fntpr)

导出任意个格式的 csv 最主要的就是：知道 csv 是什么。

### 什么是 csv

一个纯文本格式，可以使用 txt 打开，其格式内容类似如下：

```txt
Positions Overview
Name,Base Currency,Total Value,Total Cost,MtM,Unrealized P&L,Realized P&L,Net P&L
Positions Summary,BTC,,,,,, 

SAA Type Summary
SAA Type Name,Base Currency,Total Value,Total Cost,MtM,Unrealized P&L,Realized P&L,Net P&L
Service RFQ,USD,0,0,0,0,0,0 
Service RFQ2,BTC,0,0,0,0,0,0 

```

- **空行** 表示会在 .csv 后缀的文件空一行

- 单词和单词之前的 **空格** 或 **逗号** 表示它们会在不同的单元格内。

- 尾部 `,,,,,,`  没啥用，有没有都不会影响格式

### 如何做到导出任意格式的 csv

当我们知道 csv 格式的内容 和 对应它会对应的纯文本格式是什么样子之后，我们只需要将数据处理成你所需要的格式即可，例如以下格式：

```
`Positions Overview
One
Name Gender
Yomua,man

Two
Hobby Height
woman,2m
`
```

这是[实例](https://codesandbox.io/s/dao-chu-ren-yi-ge-shi-de-csv-5fntpr?file=/src/tools.ts)

# 数据源的某字段是数组且要把它导出（同个文件）

  用到操作：将数组子项和父项合并

```js
const dataSource =[
  {
    id: 1,
    name: 'yhw',
    list: [
      {listId: 1},
      {listId: 2},
    ]
  },
  {
    id: 2,
    name: 'yomua',
    list: [
      {listId: 1},
      {listId: 2},
    ]
  },
]
```

以上数据源需要导出在 csv，且格式为：

![](.//picture/datasource.png)

这种情况，一个简单的思路是：将子项中的数组摊平到最外层数组，这样就能使用 exportCsv()

1. 遍历 dataSource，再遍历其中的 list，将 list 的每项赋值为：dataSource 中的数据 和 list 每项的数据
   
   ```js
   const data = dataSource.map(item =>
       item.list.map(line => ({
           ...item,
           ...line,
           list: 'done' // 目的是判断 list 是否已经遍历。
       }))
   )
   ```
   
   若此若作，你会得到下面的数组：
   
   ```json
   [
     [
       { "id": 1, "name": "yhw", "list": "done", "listId": 1 },
       { "id": 1, "name": "yhw", "list": "done", "listId": 2 }
     ],
     [
       { "id": 2, "name": "yomua", "list": "done", "listId": 1 },
       { "id": 2, "name": "yomua", "list": "done", "listId": 2 }
     ]
   ]
   ```

2. 将得到的数组进行扁平化处理：
   
   ```js
   const formatData = data.flat()
   ```
   
   可以得到以下数组：
   
   ```json
   [
     { "id": 1, "name": "yhw", "list": "done", "listId": 1 },
     { "id": 1, "name": "yhw", "list": "done", "listId": 2 },
     { "id": 2, "name": "yomua", "list": "done", "listId": 1 },
     { "id": 2, "name": "yomua", "list": "done", "listId": 2 }
   ]
   ```

3. 在使用 exportCsv(formatData, header, fields) 即可。

