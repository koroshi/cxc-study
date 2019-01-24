#源镜像
FROM golang:latest
#作者
# MAINTAINER 
#设置工作目录
WORKDIR $GOPATH/src
#将服务器的go工程代码加入到docker容器docker
ADD ./src $GOPATH/src
#go构建可执行文件
RUN go build -o main ./
# ENV GOPATH=$GOPATH/src/github.com/mygohttp
ENV GOPATH=/go/src/
#暴露端口
EXPOSE 7080
#最终运行docker的命令
ENTRYPOINT  ["./main"]
#  docker build -t mytest:001 ./  #build
# docker run -d --name testshowunew -v C:/Users/chenxincong/Desktop/cow/config.json /go/src/config/config.json -p 7081:7080 mytest:001 #运行