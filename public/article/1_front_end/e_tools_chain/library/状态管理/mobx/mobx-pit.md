# Pit

## 在 MobX6.x 中消除使用装饰器的警告

警告提示：xxx 是新提案，以后可能删除。消除它：

1. 在 setting.json 中添加：

   ```bash
   "javascript.implicitProjectConfig.experimentalDecorators": true,
   ```

2. 然后在项目内部的 tsconfig.json（若没有则新建）中的 compilerOptions 中添加：

   ```bash
   "compilerOptions":{
       "experimentalDecorators": true,
       "emitDecoratorMetadata": true
   }
   ```

3. 最后转到 IDE 的 settings（preferences - settings 或 <kbd>ctrl+,</kbd>），搜索 experimentalDecorators，在显示的界面中，选中复选框，将之打勾

TIP：你可能需要重启 IDE => <kbd>ctrl+shift+p</kbd> 搜索 reload window，然后点击它即可。

注意：即使消除了警告，但是由于 Mobx 5.x 及以下版本使用的装饰器都是可能在未来被改变，所以想要一劳永逸的解决，建议使用：[MobX 6.x 版本](https://mobx.js.org/README.html)

注意：在 MobX 6.x 中，decorator 已经重新添加，这意味着你仍然可以在 MobX 6 中使用装饰器，参见：[Mobx 6.x EN-第 5 点（For Typescript users）](https://mobx.js.org/migrating-from-4-or-5.html#getting-started)

参考文档：

- [Experimental decorators warning in TypeScript compilation](https://stackoverflow.com/questions/38271273/experimental-decorators-warning-in-typescript-compilation) 
- [How to restart VScode after editing extension's config?](https://stackoverflow.com/questions/42002852/how-to-restart-vscode-after-editing-extensions-config) 
- [MobX 6.x](https://mobx.js.org/README.html) 

## [MobX 6.x 中删除了 decorate](https://stackoverflow.com/questions/64437377/not-able-to-import-decorate-from-mobx) 

`decorate` API已在MobX 6中删除，需要 `makeObservable` 在目标类的构造函数中替换。`makeObservable` 接受相同的参数。

