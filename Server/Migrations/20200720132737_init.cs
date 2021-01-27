using Microsoft.EntityFrameworkCore.Migrations;

namespace BuildLogger.Migrations
{
    public partial class init : Migration
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
                name: "Form",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    parentFormularId = table.Column<string>(nullable: true),
                    version = table.Column<string>(nullable: true),
                    FormapiId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Form", x => x.apiId);
                    table.ForeignKey(
                        name: "FK_Form_Form_FormapiId",
                        column: x => x.FormapiId,
                        principalTable: "Form",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Nav",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    state = table.Column<string>(nullable: true),
                    link = table.Column<string>(nullable: true),
                    name = table.Column<string>(nullable: true),
                    type = table.Column<string>(nullable: true),
                    contentType = table.Column<string>(nullable: true),
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
                name: "Text",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    contentData = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Text", x => x.apiId);
                });

            migrationBuilder.CreateTable(
                name: "FormElement",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    label = table.Column<string>(nullable: true),
                    value = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    widthClass = table.Column<string>(nullable: true),
                    metaData = table.Column<string>(nullable: true),
                    defaultValue = table.Column<string>(nullable: true),
                    unit = table.Column<string>(nullable: true),
                    version = table.Column<string>(nullable: true),
                    required = table.Column<bool>(nullable: false),
                    valid = table.Column<bool>(nullable: false),
                    formType = table.Column<int>(nullable: false),
                    FormapiId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormElement", x => x.apiId);
                    table.ForeignKey(
                        name: "FK_FormElement_Form_FormapiId",
                        column: x => x.FormapiId,
                        principalTable: "Form",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FormForm",
                columns: table => new
                {
                    child_API_Id = table.Column<string>(nullable: false),
                    parent_API_Id = table.Column<string>(nullable: false),
                    apiId = table.Column<string>(nullable: true),
                    childapiId = table.Column<string>(nullable: true),
                    parentapiId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormForm", x => new { x.child_API_Id, x.parent_API_Id });
                    table.ForeignKey(
                        name: "FK_FormForm_Form_childapiId",
                        column: x => x.childapiId,
                        principalTable: "Form",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FormForm_Form_parentapiId",
                        column: x => x.parentapiId,
                        principalTable: "Form",
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

            migrationBuilder.CreateTable(
                name: "FormFormElement",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    parent_API_Id = table.Column<string>(nullable: true),
                    child_API_Id = table.Column<string>(nullable: true),
                    parentapiId = table.Column<string>(nullable: true),
                    childapiId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormFormElement", x => x.apiId);
                    table.ForeignKey(
                        name: "FK_FormFormElement_FormElement_childapiId",
                        column: x => x.childapiId,
                        principalTable: "FormElement",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FormFormElement_Form_parentapiId",
                        column: x => x.parentapiId,
                        principalTable: "Form",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Form_FormapiId",
                table: "Form",
                column: "FormapiId");

            migrationBuilder.CreateIndex(
                name: "IX_FormElement_FormapiId",
                table: "FormElement",
                column: "FormapiId");

            migrationBuilder.CreateIndex(
                name: "IX_FormForm_childapiId",
                table: "FormForm",
                column: "childapiId");

            migrationBuilder.CreateIndex(
                name: "IX_FormForm_parentapiId",
                table: "FormForm",
                column: "parentapiId");

            migrationBuilder.CreateIndex(
                name: "IX_FormFormElement_childapiId",
                table: "FormFormElement",
                column: "childapiId");

            migrationBuilder.CreateIndex(
                name: "IX_FormFormElement_parentapiId",
                table: "FormFormElement",
                column: "parentapiId");

            migrationBuilder.CreateIndex(
                name: "IX_FormFormElement_child_API_Id_parent_API_Id",
                table: "FormFormElement",
                columns: new[] { "child_API_Id", "parent_API_Id" });

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
                name: "FormForm");

            migrationBuilder.DropTable(
                name: "FormFormElement");

            migrationBuilder.DropTable(
                name: "NavNav");

            migrationBuilder.DropTable(
                name: "Text");

            migrationBuilder.DropTable(
                name: "FormElement");

            migrationBuilder.DropTable(
                name: "Nav");

            migrationBuilder.DropTable(
                name: "Form");
        }
    }
}
