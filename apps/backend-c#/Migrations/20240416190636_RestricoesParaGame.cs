using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_c_.Migrations
{
    /// <inheritdoc />
    public partial class RestricoesParaGame : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Game_Status",
                table: "Games");

            migrationBuilder.AddColumn<DateTime>(
                name: "GameDateTime",
                table: "Games",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddCheckConstraint(
                name: "CK_Game_Status",
                table: "Games",
                sql: "Status IN ('Não agendado','Em andamento', 'Finalizado', 'Não iniciado')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Game_Status",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "GameDateTime",
                table: "Games");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Game_Status",
                table: "Games",
                sql: "Status IN ('Em andamento', 'Finalizado', 'Não iniciado')");
        }
    }
}
