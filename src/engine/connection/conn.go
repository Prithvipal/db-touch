package main

import (
	"context"
	"fmt"
	"log"

	"github.com/mongodb/mongo-go-driver/mongo"
)

type Trainer struct {
	Name string
	Age  int
	City string
}

func TestConn() bool {
	client, err := mongo.Connect(context.TODO(), "mongodb://localhost:27017")
	if err != nil {
		log.Fatal(err)
		return false
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return false
		log.Fatal(err)
	}
	return true
}

func Conn() {
	client, err := mongo.Connect(context.TODO(), "mongodb://localhost:27017")
	if err != nil {
		log.Fatal(err)
		//return false
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		//return false
		log.Fatal(err)
	}
	//return true
}

func main() {
	fmt.Println(TestConn())
}
