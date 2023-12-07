# 快速开始

- [创建相关 RN 环境](https://reactnative.cn/docs/environment-setup) 

- 初始化一个 RN 项目

  `npx react-native init AwesomeProject`

  `npx react-native init AwesomeProject --version X.XX.X` 选择指定版本的 RN

  `npx react-native init AwesomeTSProject --template react-native-template-typescript` 创建一些社区提供的模板

- cd AwesomeProject

  `yarn android/ios` / `yarn react-native run-android/ios `

- `yarn add @react-navigation/native ` 

- `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view` 

- `yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view` 

- `npx pod-install ios` （如果实在 mac 上开发 ios 项目，需要安装CocoaPods来完成项目链接）

- 当您完成了react-native-gesture-handler的安装，在项目的入口文件（例如index.js或App.js）引入react-native-gesture-handler（确保在入口文件的第一行）

  ```react
  import 'react-native-gesture-handler';
  ```

  > 注意：如果您忽略这一步，尽管在开发中运行是正常的，但在生产上将会奔溃。

  现在，我们需要将整个app装载在NavigationContainer之中。通常做法是，在入口文件（例如index.js或App.js）做这些事情：

  ```
  import 'react-native-gesture-handler';
  import * as React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  
  export default function App() {
    return (
      <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
    );
  }
  复制代码
  ```

  > 注意：当您使用导航器(如堆栈导航器)时，对于任何其他依赖项，都需要遵循导航器的安装说明。如果您遇到"Unable to resolve module"的错误，您需要安装错误中提示的组件到项目中。

  现在，您可以将项目编译并运行在设备或者模拟器上，并继续进行相关的代码编写

# 什么是 React Navigation

路由导航，类似于 vue-router、react-router 之类的

# 名称

- 屏幕，指的是 <Stack.Screen component={XXX} /> 中的 component 所指定的组件。

  即：用 Stack.Screen 创建了一个屏幕（组件）

  或者说当前屏幕正显示的组件。

- 我们可以使用 createStackNavigator()，创建符合编程命名规定的任意导航名称，如：

  ```react
  const MainStack = createStackNavigator();
  const RootStack = createStackNavigator();
  ...
  ```

# [Stack](https://reactnavigation.org/docs/stack-navigator/#navigationoptions-used-by-stacknavigator) 

```react
import { createStackNavigator } from '@react-navigation/stack' ; 
const Stack = createStackNavigator();
const MyStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
			...
    </Stack.Navigator>
  );
}
```

createStackNavigator() 将返回一个对象，为您的应用（App）提供一种在屏幕之间进行切换（类似路由跳转）的方法，其中每个新屏幕都将放置在堆栈顶部。

# Example

## 简单的例子

以下例子是一个 React Navigation 最简单的使用，该例子能跳转到另一个路由，也能从跳转到的路有返回到上一级路由。

```react
import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Home = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="进入 About" onPress={() => navigation.navigate('About')} />
      <Text>Home</Text>
    </View>
  );
};

const About = ({ navigation, route }) => {
  return (
    <>
      <Text>About</Text>
      <Button title="返回" onPress={() => navigation.goBack()} />
    </>
  );
};

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

createStackNavigator是一个函数，它返回一个包含两个属性的对象: Screen 和 Navigation。

在 <Stack.Screen /> 组件上，两个属性的意思如下：

- name：路由名字
- component: 该路由所对应的组件

当对应的路由渲染对应组件时 => `  <Stack.Screen name="About" component={About} />`，会传入一个 props 对象，里面存在两个字段：

```react
const About = (props) => {
	const {navigation, route} = props;
  return (...)
};
```

且这两个字段都是对象，[navigation](https://reactnavigation.org/docs/navigation-prop/) 和导航方法相关，[route](https://reactnavigation.org/docs/route-prop) 和当前路由相关。

# API

## React Navigation 自动传递的 props

React Navigation 会为 Stack.Screen 中的 component 属性指定的组件，自动传入一个 props（在渲染 component 指定的组件时），里面存在两个属性：

- navigation
- route

下面让我们来讲解一下这两个属性对象的拥有的方法和它们的作用吧。

### [navigation](https://reactnavigation.org/docs/navigation-prop#setoptions) 

#### navigation.navigate()

准备导航到哪个路由，并为该路由对应的组件传递参数，传递的值存在 route.params 属性中（这个字段是固定的）

有两种用法：

第一种是，传入两个参数：name 和 params

```js
const params = {
  names: ['Brent', 'Satya', 'Michaś'] 
}
navigation.navigate('Profile', params)
```

第二种是，传入一个对象，{name, params}

```js
const params = {
  names: ['Brent', 'Satya', 'Michaś'] 
}
navigation.navigate({
  name:'Profile',
  params,
  merge:true // 使用这种方式，需要让显式声明该字段为 true，使得当前 params 和 route.params 合并。
})
```

虽然有两种方法，但是其用法都是类似的。

- name:string => 要跳转的指定路由的名字
- params: any => 将该参数赋值给指定路由的 props.route.params

#### navigation.setOptions

修改当前路由的配置信息，如：title

如果你需要在组件本身就改变路由组件的 route.params 的配置，可以通过 navigation.setOptions() 方法实现。

```react
const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Update the title"
        // 通过该方法修改 options，从而影响到路由组件的配置。
        onPress={() => navigation.setOptions({ title: 'Updated!' })} />
    </View> 
  );
}
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

可以在 [snack](https://snack.expo.dev/?platform=android&name=updating%20navigation%20options&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.4.5%2C%40react-navigation%2Fdrawer%40%5E5.7.5%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.5%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.5%2C%40react-navigation%2Fnative%40%5E5.4.0%2C%40react-navigation%2Fstack%40%5E5.3.7%2Creact-native-paper%40%5E3.10.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E0.7.3%2Creact-native-screens%40%5E2.4.0%2Creact-native-tab-view%40%5E2.14.0&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fupdating-options-with-setoptions.js) 尝试。

### [route](https://reactnavigation.org/docs/route-prop) 

该字段指的是当前的路由组件的属性，通常使用三个字段：

1. key
2. name
3. params

#### key

当前屏幕（组件）的唯一 key，导航到此屏幕（组件）时自动创建或添加

类似于："路由名字- XXXXX_XXXX"

#### name

当前所在路由（屏幕/组件）的名字。

#### params

在使用 ` navigation.navigate(name,any)` 或 `navigation.navigate({name,params:any}) ` 这个方法时，我们可以配置要传递的参数，其中该参数可以是任何类型的值，字符串、数字、对象、数组等都可以。

## [写在 Stack.Navigator 组件上的属性](https://reactnavigation.org/docs/stack-navigator/#props) 

通过 Stack.Navigator 组件可以为它旗下的所有 Stack.Screen 路由组件配置共有属性。

### [screenOptions](https://reactnavigation.org/docs/stack-navigator/#screenoptions) 

在 [sncak](https://snack.expo.dev/?platform=android&name=sharing%20header%20styles&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.4.5%2C%40react-navigation%2Fdrawer%40%5E5.7.5%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.5%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.5%2C%40react-navigation%2Fnative%40%5E5.4.0%2C%40react-navigation%2Fstack%40%5E5.3.7%2Creact-native-paper%40%5E3.10.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E0.7.3%2Creact-native-screens%40%5E2.4.0%2Creact-native-tab-view%40%5E2.14.0&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fsharing-header-styles.js) 上尝试一下，为旗下所有屏幕设置一些配置，它的优先级低于使用 Stack.Screen 的 options 字段配置的样式，你可以将 screenOptions 认为是为所有旗下的组件设置一个默认配置。

```react
<Stack.Navigator
	screenOptions={{
		headerTintColor: 'white',
		headerStyle: { backgroundColor: 'tomato' },
	}}>
  <Stack.Screen options={{headerTintColor:"red"}}/> // 优先级 > screenOptions.headerTintColor
  ...
</Stack.Navigator>
```

## 写在路 Stack.Screen 组件上的属性

为单独的路由组件配置一些属性。

### initialParams

该字段能为指定的路由组件自动传递初始的 route.params。

- 这应该通过先对 initalParams 进行渲染，然后再渲染开发者手动传递的 prams，这样就能使得后者覆盖前者，让前者作为初始值。

  PS：这只是一种实现方式，还有更多，如：通过判断等。

这样，如果在导航到指定路由时，你未向路由传递 params，或者说你在路由中使用了 props.route.prams 中没有的值，那么 React Navigation 将会尝试从 initalParams 中找到对应的值来使用，如果都没有，则值为 undefeated.

```react
<Stack.Navigator mode="modal">
  <Stack.Screen name="Home" component={HomeScreen} initialParams={{number:123}}/>
</Stack.Navigator>
```

当导航到（无论什么方式） Home 路由，渲染 HomeScreen 组件时，如果你使用导航的方式没有传递 prams 或传递了 params 但不存在 number 属性，则此时 React Navigation 将使用 number:123 作为其值。

### [options](https://reactnavigation.org/docs/screen-options) | [更多配置](https://reactnavigation.org/docs/stack-navigator/#options) 

该字段能为指定路由组件配置一些其他选项，让我们用一个 title 属性作为切入口来讲解。

#### 使用 options 的两种方式

以下两种方式都可以将通过 options 设置的字段属性设置为函数，如：

```react
<Stack.Navigator>
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{
      // 若此若做，当前组件(HomeScreen) 的头部将被设置为一个图片
      headerTitle: (props) => <ImageLogo {...props} />,
    }}
  />
</Stack.Navigator>;
```



##### 第一种：直接将 options 写为对象

```react
const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title:"My honme"
        }}
      />
    </Stack.Navigator>
  );
}
```

##### 第二种：通过写为函数，然后该函数返回一个对象

使用这种方式，React Navigation 将用一个包含 navigation 和 route 的对象调用它，这两个对象完全和导航到路由传递的 props 中的 navigation, route 完全是一个东西。

- [navigation](https://reactnavigation.org/docs/navigation-prop/) prop
- [route](https://reactnavigation.org/docs/route-prop/) prop

```react
const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation, route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}
```

你可以 [snack](https://snack.expo.dev/?platform=android&name=params%20in%20title&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.4.5%2C%40react-navigation%2Fdrawer%40%5E5.7.5%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.5%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.5%2C%40react-navigation%2Fnative%40%5E5.4.0%2C%40react-navigation%2Fstack%40%5E5.3.7%2Creact-native-paper%40%5E3.10.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E0.7.3%2Creact-native-screens%40%5E2.4.0%2Creact-native-tab-view%40%5E2.14.0&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fparams-in-title.js) 上尝试看看。

#### title

用来指定路由的名字，可以覆盖 <Stack.Screen name="XX" /> 中 name 指定的路由名字。

#### 调整路由的头部样式

[尝试在 snack 上试试](https://snack.expo.dev/?platform=android&name=header%20styles&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.4.5%2C%40react-navigation%2Fdrawer%40%5E5.7.5%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.5%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.5%2C%40react-navigation%2Fnative%40%5E5.4.0%2C%40react-navigation%2Fstack%40%5E5.3.7%2Creact-native-paper%40%5E3.10.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E0.7.3%2Creact-native-screens%40%5E2.4.0%2Creact-native-tab-view%40%5E2.14.0&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fheader-styles.js) 

Tips：该示例只是单独为某个 Screen 的标题设置样式，并没有为所有 Screen 的标题设置样式。如果你要为所有 Screen 的标题设置样式，请在 Stack.Navigator 上使用 screenOptions 字段，让它旗下的所有组件共享样式。

##### headerStyle:object

设置当前路由头部的样式，如：使用 `backgroundColor` 可以设置头部的背景色。

```react
<Stack.Screen 
  headerStyle: {
    backgroundColor:'red'
  }
/>
```

##### headerTintColor:string

设置当前头部的标题颜色以及返回按钮的颜色。

```react
<Stack.Screen headerTintColor: 'red'/>
```

##### headerTitleStyle:object

标题组件的样式对象，如：

```react
<Stack.Screen
	headerTitleStyle:{
  	color:'red', // 设置标题的字体颜色
  	fontWeight:'bold', // 设置标题的字体字重
  }
/>
```

# 嵌套的导航

即：在一个 Stack.Screen 使用 component 属性指定的组件中，再继续嵌套另一个导航（Stack.Navigator）。

在 [snack](https://snack.expo.dev/yq_b56N0_?platform=android&name=Header%20buttons%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.4.5%2C%40react-navigation%2Fdrawer%40%5E5.7.5%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.5%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.5%2C%40react-navigation%2Fnative%40%5E5.4.0%2C%40react-navigation%2Fstack%40%5E5.3.7%2Creact-native-paper%40%5E3.10.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E0.7.3%2Creact-native-screens%40%5E2.4.0%2Creact-native-tab-view%40%5E2.14.0&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fnest-navigators.js) 上尝试一下。该示例中的 Root 组件嵌套了：

```react
<Stack.Navigator>
  <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="Settings" component={SettingsScreen} />
</Stack.Navigator>;
```

导致渲染 Root 组件时会先渲染 Profile 路由。

# Navigation 的生命周期

可以通过监听页面的 "blur"（离开）和 "focus"（进入）事件，去判断当前是否进入/离开了当前组件，从而触发一个事件。

在 [snack](https://snack.expo.dev/?platform=android&name=Nesting%20navigators%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.4.5%2C%40react-navigation%2Fdrawer%40%5E5.7.5%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.5%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.5%2C%40react-navigation%2Fnative%40%5E5.4.0%2C%40react-navigation%2Fstack%40%5E5.3.7%2Creact-native-paper%40%5E3.10.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E0.7.3%2Creact-native-screens%40%5E2.4.0%2Creact-native-tab-view%40%5E2.14.0&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Ffocus-and-blur.js) 上尝试。

# 打开full-screen模态

## [mode](https://reactnavigation.org/docs/stack-navigator/#mode) 

该字段使用在导航容器上，如：`<Stack.Navigator mode="modal"/>`

在导航容器上（如：Stack.Navigator）使用 `mode="modal"` 可以使得在 ios 设备上，屏幕将从下至上滑动，而非从右到左。

mode 有两个属性：card（默认）、modal

TIPS：Android 设备使用 mode="modal" 没有用处。



# Reference

- [React Navigation-EN](https://reactnavigation.org/docs/getting-started) 
- [React Navigation-CN（网友翻译）](https://juejin.cn/post/6844904190154653704) 