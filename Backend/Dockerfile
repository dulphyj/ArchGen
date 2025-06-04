# Fase de construcción
FROM maven:3.9-eclipse-temurin-17 as builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Fase de ejecución
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/target/ArchGen-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]