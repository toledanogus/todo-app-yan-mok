@echo off
cd C:\Users\G10xpg\Desktop\DocumentosEscritorio\programacion\todo-app-yan

rem Comprueba si la carpeta "tareasyan" existe
if exist "tareasyan" (
    rem Comprime la carpeta en un archivo ZIP
    powershell Compress-Archive -Path ".\tareasyan" -DestinationPath ".\tareasyan.zip" -Force
    echo Carpeta comprimida correctamente.
) else (
    echo La carpeta "tareasyan" no existe.
)

exit
