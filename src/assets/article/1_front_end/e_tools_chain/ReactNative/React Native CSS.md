# CSS

## 使用方法

你可以在 [snack](https://snack.expo.dev/@yomua/note-use-of-stylesheeet) 上尝试。

要为 RN 的原生组件使用样式和在 Web 上有一些区别，大概使用如下：

```react
const styles = StyleSheet.create({
  container: {...},
  text:{...},
}
<View style={styles.container}>
  <Text style={styles.text}>Yomua</Text>
</View>;
```

## [原生组件的样式属性](https://reactnative.cn/docs/image-style-props) 

### [flex](https://reactnative.cn/docs/layout-props#flex):int

你可以在 [snack](https://snack.expo.dev/@yomua/note-use-of-stylesheeet) 上尝试

- 剩余空间：当前容器大小 - 所有同级元素所需最小空间 = 剩余空间

规定同级元素所拥有的剩余空间的大小，flex 属性值越大则所占剩余空间就越大。

当同级元素为2个及以上时，它们所有的 flex 的属性值加起来则是它们将整个屏幕划分为多少块，如以下示例：

```react
import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default const Flex = () => {
  return (
    <View style={{flex:1}}>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 2 }} />
      <View style={{ flex: 3 }} />
    </View>
  );
};
```

我们可以看见最外层的 View 组件的 flex:1，但由于它没有任何同级元素，所以整个屏幕的大小被划分为 1 份，而该组件所有的剩余空间将占满整个屏幕。

而它所包裹的三个 View 组件是同级组件，所以它们的所占剩余空间的大小将会被 flex 影响，由于它们的 flex 大小分别为：1、2、3，所以外层 View 组件的大小被划分为 6 份，第一 View 占 1/6、第二个占 2/6、第三个占 3/6。

# 
