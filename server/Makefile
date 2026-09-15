PROJECT := src/PortfolioApi/PortfolioApi.csproj
SOLUTION := PortfolioApi.slnx

.PHONY: help restore build run watch clean publish mongo-status

help:
	@echo "Targets:"
	@echo "  make restore      Restore NuGet packages"
	@echo "  make build        Build the solution (Debug)"
	@echo "  make run          Run the API (http://localhost:5000)"
	@echo "  make watch        Run the API with hot reload"
	@echo "  make clean        Remove bin/obj artifacts"
	@echo "  make publish      Publish a Release build"
	@echo "  make mongo-status Check the local mongod service status"

restore:
	dotnet restore $(SOLUTION)

build: restore
	dotnet build $(SOLUTION)

run:
	dotnet run --project $(PROJECT)

watch:
	dotnet watch --project $(PROJECT) run

clean:
	dotnet clean $(SOLUTION)
	find . -type d \( -name bin -o -name obj \) -not -path "*/node_modules/*" -exec rm -rf {} +

publish:
	dotnet publish $(PROJECT) -c Release -o publish

mongo-status:
	systemctl is-active mongod
