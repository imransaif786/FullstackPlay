Add ef global tool
dotnet tool install --global dotnet-ef

dotnet ef tools add
Migrations
create migration
dotnet ef migrations add initial
create/update database
dotnet ef database update