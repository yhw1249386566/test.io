# [## 导出一个 xlsx，并附带一个或多个 sheet](https://codesandbox.io/s/dao-chu-xlsx-uz22ek?file=/src/App.tsx)



```ts
import ExcelJS from 'exceljs'
import FileSaver from 'file-saver'

export const exportXLSX = (
    sheets: {
        sheetName: string
        sheetHeader: string[]
        sheetFields: string[]
        sheetData: Record<string, any>[]
    }[]
) => {
    // 创建一个 excel 表
    const workbook = new ExcelJS.Workbook()

    sheets.map(({ sheetName, sheetHeader, sheetData, sheetFields }, index) => {
        // 创建一个 sheet
        const worksheet = workbook.addWorksheet(sheetName)

        //  得到渲染数据源，如： [ ['yomua','man'], ['yhw','man'] ]
        const rows = sheetData.map(item => {
            const temp = []
            for (const key of sheetFields) {
                if (item[key] !== null || item[key] !== undefined) {
                    temp.push(item[key])
                }
            }
            return temp
        })

        // 将 sheet 添加到表（Excel）中
        worksheet.addTable({
            name: sheetName,
            ref: 'A1',
            headerRow: true,
            totalsRow: false,
            style: {
                theme: null
            },
            columns: sheetHeader.map(name => ({ name })),
            rows
        })
    })

    // 将表（Excel）保存并导出成 .xlsx 格式文件
    workbook.xlsx.writeBuffer().then(buffer => {
        FileSaver.saveAs(
            new Blob([buffer], {
                type: 'application/octet-stream'
            }),
            `export.xlsx`
        )
    })
}
```

使用

```ts
exportXLSX([
    {
        sheetName: 'Summary',
        sheetHeader: Sheet1.header,
        sheetFields: Sheet1.fields,
        sheetData: sheet1Data
    },
    {
        sheetName: 'Sheet2',
        sheetHeader: Sheet2.header,
        sheetFields: Sheet2.fields,
        sheetData: sheet2Data
    },
    {
        sheetName: 'Sheet3',
        sheetHeader: Sheet3.header,
        sheetFields: Sheet3.fields,
        sheetData: sheet3Data
    },
    {
        sheetName: 'Sheet4',
        sheetHeader: Sheet4.header,
        sheetFields: Sheet4.fields,
        sheetData: sheet4Data
    }
])


// ---- 实际数据

    exportXLSX([
      {
        sheetName: "Summary",
        sheetHeader: ["姓名", "性别"],
        sheetFields: ["name", "gender"],
        sheetData: [
          { name: "yomua", gender: "man" },
          { name: "yhw", gender: "man" }
        ]
      },
      {
        sheetName: "Sheet2",
        sheetHeader: ["身高", "爱好"],
        sheetFields: ["height", "hobby"],
        sheetData: [
          { hobby: "swim", height: "2m" },
          { hobby: "play", height: "3m" }
        ]
      }
    ]);
```


