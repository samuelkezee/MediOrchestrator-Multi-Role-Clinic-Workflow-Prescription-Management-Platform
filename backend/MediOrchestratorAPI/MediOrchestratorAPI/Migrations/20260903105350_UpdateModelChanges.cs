using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MediOrchestratorAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModelChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "user_account");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "user_account",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "user_account",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "user_account",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "user_account",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MobileNo",
                table: "user_account",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "user_account",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RoleId",
                table: "user_account",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RoleName",
                table: "user_account",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "user_account",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "user_account");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "user_account");

            migrationBuilder.DropColumn(
                name: "MobileNo",
                table: "user_account");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "user_account");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "user_account");

            migrationBuilder.DropColumn(
                name: "RoleName",
                table: "user_account");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "user_account");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "user_account",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "user_account",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "user_account",
                type: "text",
                nullable: true);
        }
    }
}
