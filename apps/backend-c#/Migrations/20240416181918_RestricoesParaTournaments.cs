using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_c_.Migrations
{
    /// <inheritdoc />
    public partial class RestricoesParaTournaments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "PrizeMoney",
                table: "Tournaments",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Tournament_Status",
                table: "Tournaments",
                sql: "Status IN ('Em andamento', 'Contínuo', 'Finalizado', 'Não iniciado')");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Game_Status",
                table: "Games",
                sql: "Status IN ('Em andamento', 'Finalizado', 'Não iniciado')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Tournament_Status",
                table: "Tournaments");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Game_Status",
                table: "Games");

            migrationBuilder.AlterColumn<int>(
                name: "PrizeMoney",
                table: "Tournaments",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldPrecision: 18,
                oldScale: 2);
        }
    }
}
