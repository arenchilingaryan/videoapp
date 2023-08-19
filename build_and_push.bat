@echo off

REM Собираем Docker образ
echo Сборка Docker образа...
docker build -t arenchill/videoapp:latest .

REM Пушим образ на Docker Hub
echo Загрузка образа на Docker Hub...
docker push arenchill/videoapp:latest

echo Процесс завершен.
pause