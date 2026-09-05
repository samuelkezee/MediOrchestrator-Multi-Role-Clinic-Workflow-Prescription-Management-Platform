using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MediOrchestratorAPI.Migrations
{
    /// <inheritdoc />
    public partial class RemoveRoleIdFromUserAccount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "user_account");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoleId",
                table: "user_account",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
