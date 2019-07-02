### vscode 编写go(go 1.11以上)

##### [使用cow](https://github.com/cyfdecyf/cow)

1. 配置rc.txtwindows(系统需要启动ss)

   ```
   listen = http://127.0.0.1:7777
   proxy = socks5://127.0.0.1:1080
   ```
   $env:HTTPS_PROXY="http://127.0.0.1:1080"

   $env:HTTP_PROXY="http://127.0.0.1:1080"

2. 安装go插件

3. 配置启动lunch

   ```
   {
   	// 使用 IntelliSense 了解相关属性。 
   	// 悬停以查看现有属性的描述。
   	// 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
   	"version": "0.2.0",
   	"configurations": [
   		
   		{
   			"name": "goLaunch",
   			"type": "go",
   			"request": "launch",
   			"mode": "auto",
   			"cwd": "D:/project/xxx/xx/src",
   			"program": "D:/project/xx/xx/src/main.go",
   			"env": {
   				"GOPATH":"D:/project/xx/xx/"
   			},
   			"args": []
   		}
   	]
   }
   ```

4. 安装依赖（go mod 可以设置 [代理需要powershell](https://goproxy.io/)）
   上一步翻墙成功这里不需要ss，不过因为这个代理是局部的可以每次打开终端开启就可以不需要ss
   - 在项目目录执行go mod init ，
   - 然后go mod vendor
   - 然后把vendor复制到外面




```
学习资料
https://docs.hacknode.org/gopl-zh/ch5/ch5-06.html

字符串拼接效率
https://studygolang.com/articles/3427
```
