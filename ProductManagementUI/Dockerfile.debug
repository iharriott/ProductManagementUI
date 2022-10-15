#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM geiconp.azurecr.io/dctsys/dotnet/geico-aspnet:6.0-bullseye-slim as base

FROM base AS final
COPY --chown=appuser:appuser /publish .
RUN chmod -R 0500 ./


WORKDIR /app/ClientApp/dist/
RUN cp -r . /app/wwwroot/
WORKDIR /app



ENTRYPOINT ["dotnet", "ProductManagementUI.dll"]