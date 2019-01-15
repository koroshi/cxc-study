package main

import (
	"fmt" 
	"time"  
	// "github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"github.com/spf13/pflag"
	// "golang.org/x/net"
)

func main() {
	var ip = pflag.Int("help", 1234, "help message for flagname")
	var flagvar int
	pflag.IntVar(&flagvar, "flagname", 1234, "help message for flagname")
	pflag.Parse()
	// var ip = pflag.Int("flagname", 1234, "help message for flagname")
	fmt.Printf("ip:%d",*ip)
	fmt.Println("flagvar:",flagvar)
	viper.SetDefault("ContentDir", "content")
	fmt.Println("Hello")
	time.Sleep(1000000000)  
	fmt.Println("world")
	time.Sleep(2000000000)  
	// a: = viper.GetString("runmode")
	id := viper.Get("ContentDir") // 13
	fmt.Println("njlkll ",id)
	fmt.Printf("njlkll %s",id)
	// time.Sleep(2000000000)  
}