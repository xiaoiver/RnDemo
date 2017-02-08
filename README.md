# 安装

node和watchman
`brew install node`
`brew install watchman`

rn命令行
`npm install -g react-native-cli`

xcode更新

# 编译运行

rn命令行运行，启动ios模拟器
`react-native run-ios`

或者xcode打开`ios/.xcodeproj`

# 常见问题

`react-native run-ios`编译报错，使用xcode先编译一遍(clean后build)

启动模拟器后，报错找不到Button之类的：
* 清理掉`watchman watch-del-all`
* native-base版本固定在0.5.13

调出ios模拟器的键盘：
Hardware->Keyboard->Toggle
