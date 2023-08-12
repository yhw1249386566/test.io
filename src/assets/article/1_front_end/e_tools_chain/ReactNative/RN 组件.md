# 组件

## View

## [SafeAreaView](https://reactnative.cn/docs/safeareaview)

该组件用来防止它所包裹的组件内容被“遮挡”，这是因为存在挖孔屏（Mi9）、刘海屏（iphoneX）等各种屏幕，这类屏幕在不使用该组件的情况下，内容通常会渲染到这些遮挡物里面，这是因为 RN 再渲染时，把这些遮挡物遮挡的屏幕当作一个正常的可视区域渲染，从而导致其实用户并无法看见遮挡物遮挡的内容。

而 \<SafeAreaView /> 组件所包裹的内容，可以灵活的根据屏幕是否有遮挡物来渲染内容，使得内容能在“安全”的区域渲染出来。

你可以将该组件用在包裹一个“视图”组件（View）、Text 组件或其他任何组件，但通常它用来包裹视图组件，这样就能让视图及视图内的安全渲染。

```react
export default const Portfolio = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View>...</View>
    </SafeAreaView>
  );
}
```

