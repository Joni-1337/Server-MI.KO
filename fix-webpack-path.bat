@echo off
chcp 65001 >nul
setlocal

echo.
echo Webpack не поддерживает символ "!" в пути папки.
echo Переименуем родительскую папку и очистим кэш сборки.
echo.
echo Сначала остановите dev-сервер (Ctrl+C в терминале), затем нажмите любую клавишу...
pause >nul

set "OLD=F:\Нужное\Утилиты\3\Программы\Запущенные сайты!"
set "NEW=F:\Нужное\Утилиты\3\Программы\Запущенные сайты"

if not exist "%OLD%" (
    if exist "%NEW%" (
        echo Папка уже переименована: "%NEW%"
        goto cleanup
    )
    echo Не найдена папка: "%OLD%"
    pause
    exit /b 1
)

ren "%OLD%" "Запущенные сайты"
if errorlevel 1 (
    echo Не удалось переименовать. Закройте Cursor/терминалы в этой папке и повторите.
    pause
    exit /b 1
)

echo OK: "%NEW%"

:cleanup
if exist "%NEW%\Мой сайт\.next" (
    rmdir /s /q "%NEW%\Мой сайт\.next"
    echo Кэш .next удалён.
)

subst M: /D >nul 2>&1

echo.
echo Готово. Откройте проект заново из:
echo %NEW%\Мой сайт
echo.
echo Затем: npm run dev
echo.
pause
