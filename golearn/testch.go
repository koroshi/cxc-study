// _Channels_ are the pipes that connect concurrent
// goroutines. You can send values into channels from one
// goroutine and receive those values into another
// goroutine.

package main

import (
	"fmt"
	"time"
)

func main() {

	// Create a new channel with `make(chan val-type)`.
	// Channels are typed by the values they convey.
	messages := make(chan string)
	messages1 := make(chan string)

	// _Send_ a value into a channel using the `channel <-`
	// syntax. Here we send `"ping"`  to the `messages`
	// channel we made above, from a new goroutine.
	test := 0
	go func() {
		time.Sleep(10000 * time.Millisecond)
		fmt.Println("ok1")
		test = 1
		messages <- "step1"
	}()
	go func() {
		time.Sleep(5000 * time.Millisecond)
		fmt.Println("ok2")
		test = 2
		messages1 <- "step2"

	}()

	// The `<-channel` syntax _receives_ a value from the
	// channel. Here we'll receive the `"ping"` message
	// we sent above and print it out.
	fmt.Println("kjk")
	fmt.Println(time.Now())
	// msg := <-messages
	// msg1 := <-messages1
	// fmt.Println(msg, msg1)
	fmt.Println(test)
	select {
	case <-messages:
		fmt.Println("messages")
	case <-messages1:
		fmt.Println("messages1")
	}
}
