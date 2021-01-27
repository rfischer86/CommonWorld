using Microsoft.EntityFrameworkCore.Migrations;

namespace BuildLogger.Migrations
{
    public partial class Formular1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "activ",
                table: "Form",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isValid",
                table: "Form",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "local",
                table: "Form",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "activ",
                table: "Form");

            migrationBuilder.DropColumn(
                name: "isValid",
                table: "Form");

            migrationBuilder.DropColumn(
                name: "local",
                table: "Form");
        }
    }
}
