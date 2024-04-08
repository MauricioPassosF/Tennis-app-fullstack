using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_c_.Migrations
{
    /// <inheritdoc />
    public partial class AlteracaoNN : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_Users_UserId",
                table: "Players");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_Users_UserId",
                table: "Tournaments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlayerTournaments",
                table: "PlayerTournaments");

            migrationBuilder.DropIndex(
                name: "IX_PlayerTournaments_PlayerId",
                table: "PlayerTournaments");

            migrationBuilder.DropColumn(
                name: "PlayerTournamentId",
                table: "PlayerTournaments");

            migrationBuilder.AlterColumn<int>(
                name: "TournamentId",
                table: "PlayerTournaments",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("Relational:ColumnOrder", 1);

            migrationBuilder.AlterColumn<int>(
                name: "PlayerId",
                table: "PlayerTournaments",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("Relational:ColumnOrder", 2);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlayerTournaments",
                table: "PlayerTournaments",
                columns: new[] { "PlayerId", "TournamentId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Users_UserId",
                table: "Players",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_Users_UserId",
                table: "Tournaments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_Users_UserId",
                table: "Players");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_Users_UserId",
                table: "Tournaments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlayerTournaments",
                table: "PlayerTournaments");

            migrationBuilder.AlterColumn<int>(
                name: "TournamentId",
                table: "PlayerTournaments",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("Relational:ColumnOrder", 1);

            migrationBuilder.AlterColumn<int>(
                name: "PlayerId",
                table: "PlayerTournaments",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("Relational:ColumnOrder", 2);

            migrationBuilder.AddColumn<int>(
                name: "PlayerTournamentId",
                table: "PlayerTournaments",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlayerTournaments",
                table: "PlayerTournaments",
                column: "PlayerTournamentId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerTournaments_PlayerId",
                table: "PlayerTournaments",
                column: "PlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Users_UserId",
                table: "Players",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_Users_UserId",
                table: "Tournaments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
