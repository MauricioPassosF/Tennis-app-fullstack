#!/bin/bash

# Função para verificar a disponibilidade do SQL Server
wait_for_sql_server() {
    local host="$1"
    local port="$2"
    local user="$3"
    local password="$4"
    local timeout=30
    local start_time=$(date +%s)
    while true; do
        /opt/mssql-tools/bin/sqlcmd -S "$host,$port" -U "$user" -P "$password" -Q "SELECT 1;" > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "SQL Server pronto."
            break
        fi
        sleep 1
        current_time=$(date +%s)
        elapsed_time=$((current_time - start_time))
        if [ $elapsed_time -ge $timeout ]; then
            echo "Timeout ao esperar pelo SQL Server."
            exit 1
        fi
    done
}

# Espera pelo SQL Server
echo "Aguardando o SQL Server..."
wait_for_sql_server "db" "1433" "sa" "SqlServer123@"

# Cria o banco de dados
echo "Criando o banco de dados..."
/opt/mssql-tools/bin/sqlcmd -S db -U sa -P SqlServer123@ -Q 'CREATE DATABASE IF NOT EXISTS tennis_app;'

# Executa as migrações
echo "Executando as migrações..."
dotnet ef database update --context TennisContext