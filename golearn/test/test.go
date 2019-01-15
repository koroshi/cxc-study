package main

import (
	"fmt" 
	"time"  
	// "github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"golang.org/x/net"
)

func main() {
	viper.SetDefault("ContentDir", "content")
	fmt.Println("Hello")
	time.Sleep(1000000000)  
	fmt.Println("world")
	time.Sleep(2000000000)  
	// a: = viper.GetString("runmode")
	// fmt.Println(" %s",a)
	time.Sleep(2000000000)  
}