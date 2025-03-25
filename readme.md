# About The Project
This project was a passion project of mine to create a platform for people to learn to sgin in American Sign Language (ASL) on the go. This was my gateway to mobile development, coming from a web development background this project introduced me to mobile specific standards and mobile development good, and bad practices.

# The Tech Stack
### Frontend
- React Native (with Typescript)
- Gluestacks UI Library for React Native

### Backend
- Java Spring Boot API handling server
- Postgrsql Relational Database

### Misc
- Python for web scraping data (via BeatifulSoup 4 and Selenium)


# Install Guide

### Software Prerequisites
- Account registered on ngrok (https://ngrok.com)
- Postgresql software downloaded (https://www.postgresql.org/download/)
- Java JDK version >16 (https://www.oracle.com/uk/java/technologies/downloads/)
- IntelliJ (any version works fine) (https://www.jetbrains.com/idea/download/)

### Setup Guide
1) Extract zip file to a folder
2) Run command `ngrok http 8080` on the terminal
3) Copy the forwarding URL
4) Paste the forwarding URL to the .env file inside the extracted zip folder next to the `REACT_APP_SERVER_PROXY_URL` value
It should look something like this `REACT_APP_SERVER_PROXY_URL = https://74e4-2a01-4b00-8020-2600-898-f18e-9ff3-acb2.ngrok-free.app`
5) Open folder /server/ with intelliJ
6) Locate SpringBootApplication.java file under `server/src/main/java/com.signlink/` and run this java file
7) Inside the folder, in a terminal, client run the command `npm install` 
8) Inside the same terminal run `npm start`, and once its full loaded enter `a` to run android
9) Open Android Studio, click `More Actions` and run a virtual device (any works fine)
The application show now be installing or installed on the emulated device.

