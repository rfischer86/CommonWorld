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
                    apiId = table.Column<string>(nullable: false),
                    bodyId = table.Column<string>(nullable: true),
                    count = table.Column<int>(nullable: false),
                    link = table.Column<string>(nullable: true),
                    name = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    NavapiId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nav", x => x.apiId);
                    table.ForeignKey(
                        name: "FK_Nav_Nav_NavapiId",
                        column: x => x.NavapiId,
                        principalTable: "Nav",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NavNav",
                columns: table => new
                {
                    child_API_Id = table.Column<string>(nullable: false),
                    parent_API_Id = table.Column<string>(nullable: false),
                    childapiId = table.Column<string>(nullable: true),
                    parentapiId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NavNav", x => new { x.child_API_Id, x.parent_API_Id });
                    table.ForeignKey(
                        name: "FK_NavNav_Nav_childapiId",
                        column: x => x.childapiId,
                        principalTable: "Nav",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NavNav_Nav_parentapiId",
                        column: x => x.parentapiId,
                        principalTable: "Nav",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Nav_NavapiId",
                table: "Nav",
                column: "NavapiId");

            migrationBuilder.CreateIndex(
                name: "IX_NavNav_childapiId",
                table: "NavNav",
                column: "childapiId");

            migrationBuilder.CreateIndex(
                name: "IX_NavNav_parentapiId",
                table: "NavNav",
                column: "parentapiId");
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
