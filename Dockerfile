# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime Environment
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the jar from the build stage
# Note: Filename matches <artifactId>-<version>.jar from your pom.xml
COPY --from=build /app/target/myPortfolio-0.0.1-SNAPSHOT.jar app.jar

# Render uses port 10000 by default
ENV PORT=10000
EXPOSE 10000

# Run with the dynamic port assigned by Render
ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]