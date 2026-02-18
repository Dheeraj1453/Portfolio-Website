# ===============================
# Stage 1: Build the Application
# ===============================
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy the project files
COPY . .

# Build the application (skipping tests to avoid env var errors during build)
RUN mvn clean package -DskipTests

# ===============================
# Stage 2: Run the Application
# ===============================
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the Jar file from the build stage
# We use a wildcard *.jar to match whatever version is in your pom.xml
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 (Render will map this automatically)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]