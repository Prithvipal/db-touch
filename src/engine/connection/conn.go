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

func createConnUri(host string, port string) string {
	uri := "mongodb://" + host + ":" + port
	return uri
}

func connect(host string, port string) (*mongo.Client, error) {
	uri := createConnUri(host, port)
	client, err := mongo.Connect(context.TODO(), uri)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return nil, err
		log.Fatal(err)
	}
	return client, nil
}

var client *mongo.Client

func TestConn(host string, port string) bool {
	_, err := connect(host, port)
	if err != nil {
		log.Fatal(err)
		return false
	}
	return true
}

func Conn(host string, port string) (*mongo.Client, error) {
	if client == nil {
		fmt.Println("client not found so creating new")
		c, err := connect(host, port)
		client = c
		return client, err
	}
	fmt.Println("client found so returning existing")
	return client, nil
}

func main() {
	Conn("localhost", "27017")
	Conn("localhost", "27017")
}
