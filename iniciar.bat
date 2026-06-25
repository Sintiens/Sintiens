@echo off
:: Cambiar al directorio donde esta guardado este archivo
cd /d "%~dp0"

echo ====================================================
echo   Iniciando el servidor de Sintiens...
echo ====================================================

:: Abrir la pagina web en el navegador predeterminado (como Chrome)
start http://localhost:3000

:: Iniciar el servidor de desarrollo
npm run dev
