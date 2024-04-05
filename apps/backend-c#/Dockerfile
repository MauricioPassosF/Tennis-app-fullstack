FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app-backend

COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

# # Copia o script de inicialização para o contêiner
# COPY init.sh ./
# # Torna o script de inicialização executável
# RUN chmod +x ./init.sh

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app-backend
COPY --from=build-env /app-backend/out .
# COPY --from=build-env /app-backend/init.sh .
EXPOSE 80
ENTRYPOINT [ "dotnet", "backend-c#.dll" ]
# ENTRYPOINT [ "/bin/bash", "-c", "./init.sh && dotnet backend-c#.dll" ]