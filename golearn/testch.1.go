// _Channels_ are the pipes that connect concurrent
// goroutines. You can send values into channels from one
// goroutine and receive those values into another
// goroutine.

package main

import (
	"errors"
	"fmt"
	"time"
)

type Result struct {
	Count int32
	Error error
}

func testResult() (int32, int32, error) {
	cha1 := make(chan Result)
	cha2 := make(chan Result)
	// cha2 := make(chan Result)
	// defer func() (int32, int32, error) {
	// 	if e := recover(); e != nil {

	// 		fmt.Println("defer: ", e)
	// 		return 0, 0, e

	// 	}
	// }()
	go func() {
		result, err := chan1Func()
		cha1 <- Result{
			Count: result,
			Error: err,
		}
		// if err != nil {
		// 	cha1Err <- err // panic(err)
		// } else {
		// 	cha1 <- result
		// }

	}()
	go func() {
		result, err := chan2Func()
		cha2 <- Result{
			Count: result,
			Error: err,
		}

	}()
	result1 := <-cha1
	result2 := <-cha2
	if result1.Error != nil {
		return 0, 0, result1.Error
	}
	if result2.Error != nil {
		return 0, 0, result2.Error
	}
	return result1.Count, result2.Count, nil
}

func chan1Func() (int32, error) {
	time.Sleep(3000000000)
	return 0, errors.New("new error")
	// return 1, nil
}
func chan2Func() (int32, error) {
	time.Sleep(6000000000)
	return 0, errors.New("new error2")
	// return 2, nil
}

func main() {
	fmt.Println(time.Now())
	a, b, e := testResult()
	fmt.Println(time.Now())
	fmt.Println("a:", a)
	fmt.Println("b:", b)
	fmt.Println("e:", e)
}
