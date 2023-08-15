@echo off
echo Stopping services on port 8080...
FOR /F "tokens=5" %%T IN ('netstat -a -n -o ^| findstr :8080 ^| findstr LISTENING') DO (
    TASKKILL /F /PID %%T
)
@echo off

FOR /F "tokens=* USEBACKQ" %%F IN (`minikube status --format "{{.Host}}"`) DO (
   SET status=%%F
)

docker compose down

IF "%status%" NEQ "Running" (
    echo Starting Minikube...
    minikube start
) ELSE (
    echo Minikube is already running.
)