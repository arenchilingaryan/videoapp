@echo off
echo Stopping services on port 8080...
FOR /F "tokens=5" %%T IN ('netstat -a -n -o ^| findstr :8080 ^| findstr LISTENING') DO (
    TASKKILL /F /PID %%T
)
echo Starting Minikube services
minikube start