using Microsoft.EntityFrameworkCore.Migrations;

namespace BuildLogger.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BuildLog",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    description = table.Column<string>(nullable: true),
                    buildStatus = table.Column<int>(nullable: true),
                    errorId = table.Column<string>(nullable: true),
                    projectId = table.Column<string>(nullable: true),
                    serverId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildLog", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Error",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    code = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Error", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Nav",
                columns: table => new
                {
                    APIid = table.Column<string>(nullable: false),
                    BodyId = table.Column<string>(nullable: true),
                    count = table.Column<int>(nullable: false),
                    link = table.Column<string>(nullable: true),
                    name = table.Column<string>(nullable: true),
                    NavAPIid = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nav", x => x.APIid);
                    table.ForeignKey(
                        name: "FK_Nav_Nav_NavAPIid",
                        column: x => x.NavAPIid,
                        principalTable: "Nav",
                        principalColumn: "APIid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NavNav",
                columns: table => new
                {
                    child_API_Id = table.Column<string>(nullable: false),
                    parent_API_Id = table.Column<string>(nullable: false),
                    childAPIid = table.Column<string>(nullable: true),
                    parentAPIid = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NavNav", x => new { x.child_API_Id, x.parent_API_Id });
                    table.ForeignKey(
                        name: "FK_NavNav_Nav_childAPIid",
                        column: x => x.childAPIid,
                        principalTable: "Nav",
                        principalColumn: "APIid",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NavNav_Nav_parentAPIid",
                        column: x => x.parentAPIid,
                        principalTable: "Nav",
                        principalColumn: "APIid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Nav_NavAPIid",
                table: "Nav",
                column: "NavAPIid");

            migrationBuilder.CreateIndex(
                name: "IX_NavNav_childAPIid",
                table: "NavNav",
                column: "childAPIid");

            migrationBuilder.CreateIndex(
                name: "IX_NavNav_parentAPIid",
                table: "NavNav",
                column: "parentAPIid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuildLog");

            migrationBuilder.DropTable(
                name: "Error");

            migrationBuilder.DropTable(
                name: "NavNav");

            migrationBuilder.DropTable(
                name: "Nav");
        }
    }
}
