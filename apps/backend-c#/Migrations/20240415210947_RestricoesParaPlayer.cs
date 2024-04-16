using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_c_.Migrations
{
    /// <inheritdoc />
    public partial class RestricoesParaPlayer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddCheckConstraint(
                name: "CK_Player_Status",
                table: "Players",
                sql: "Status IN ('Apto', 'Ausente', 'Lesionado')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Player_Status",
                table: "Players");
        }
    }
}
