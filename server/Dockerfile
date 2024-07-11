
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY ./target/server-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 3000

ENTRYPOINT ["java","-jar","app.jar"]