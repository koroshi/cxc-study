### vscode 编写go

##### [使用cow](https://github.com/cyfdecyf/cow)

1. 配置rc.txtwindows(系统需要启动ss)

   ```
   listen = http://127.0.0.1:7777
   proxy = socks5://127.0.0.1:1080
   ```

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

4. 安装依赖

   - 在项目目录执行go mod init ，
   - 然后go mod vendor
   - 然后把vendor复制到外面



