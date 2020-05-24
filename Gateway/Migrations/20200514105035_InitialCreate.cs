using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Group",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Group", x => x.apiId);
                });

            migrationBuilder.CreateTable(
                name: "Privilege1",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    privilegeOfApiId = table.Column<string>(nullable: false),
                    changePrivilege = table.Column<bool>(nullable: false),
                    read = table.Column<bool>(nullable: false),
                    write = table.Column<bool>(nullable: false),
                    add = table.Column<bool>(nullable: false),
                    delete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Privilege1", x => x.apiId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    name = table.Column<string>(nullable: false),
                    email = table.Column<string>(nullable: false),
                    token = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.apiId);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    roleType = table.Column<int>(nullable: false),
                    name = table.Column<string>(nullable: false),
                    defaultPrivilegeapiId = table.Column<string>(nullable: false),
                    UserapiId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.apiId);
                    table.ForeignKey(
                        name: "FK_Role_User_UserapiId",
                        column: x => x.UserapiId,
                        principalTable: "User",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Role_Privilege1_defaultPrivilegeapiId",
                        column: x => x.defaultPrivilegeapiId,
                        principalTable: "Privilege1",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GroupRoleLink",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    groupApiId = table.Column<string>(nullable: true),
                    roleApiId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupRoleLink", x => x.apiId);
                    table.ForeignKey(
                        name: "FK_GroupRoleLink_Group_groupApiId",
                        column: x => x.groupApiId,
                        principalTable: "Group",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GroupRoleLink_Role_roleApiId",
                        column: x => x.roleApiId,
                        principalTable: "Role",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Privilege",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    roleApiId = table.Column<string>(nullable: true),
                    prigilegApiId = table.Column<string>(nullable: true),
                    privilegeapiId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Privilege", x => x.apiId);
                    table.ForeignKey(
                        name: "FK_Privilege_Privilege1_privilegeapiId",
                        column: x => x.privilegeapiId,
                        principalTable: "Privilege1",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Privilege_Role_roleApiId",
                        column: x => x.roleApiId,
                        principalTable: "Role",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoleLink",
                columns: table => new
                {
                    apiId = table.Column<string>(nullable: false),
                    user_API_Id = table.Column<string>(nullable: true),
                    role_API_Id = table.Column<string>(nullable: true),
                    roleapiId = table.Column<string>(nullable: true),
                    userapiId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoleLink", x => x.apiId);
                    table.ForeignKey(
                        name: "FK_UserRoleLink_Role_roleapiId",
                        column: x => x.roleapiId,
                        principalTable: "Role",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserRoleLink_User_userapiId",
                        column: x => x.userapiId,
                        principalTable: "User",
                        principalColumn: "apiId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupRoleLink_groupApiId",
                table: "GroupRoleLink",
                column: "groupApiId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupRoleLink_roleApiId",
                table: "GroupRoleLink",
                column: "roleApiId");

            migrationBuilder.CreateIndex(
                name: "IX_Privilege_privilegeapiId",
                table: "Privilege",
                column: "privilegeapiId");

            migrationBuilder.CreateIndex(
                name: "IX_Privilege_roleApiId",
                table: "Privilege",
                column: "roleApiId");

            migrationBuilder.CreateIndex(
                name: "IX_Role_UserapiId",
                table: "Role",
                column: "UserapiId");

            migrationBuilder.CreateIndex(
                name: "IX_Role_defaultPrivilegeapiId",
                table: "Role",
                column: "defaultPrivilegeapiId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoleLink_roleapiId",
                table: "UserRoleLink",
                column: "roleapiId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoleLink_userapiId",
                table: "UserRoleLink",
                column: "userapiId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupRoleLink");

            migrationBuilder.DropTable(
                name: "Privilege");

            migrationBuilder.DropTable(
                name: "UserRoleLink");

            migrationBuilder.DropTable(
                name: "Group");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Privilege1");
        }
    }
}
