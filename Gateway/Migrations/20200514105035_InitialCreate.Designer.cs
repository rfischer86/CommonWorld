﻿// <auto-generated />
using Auth_DB_Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace WebApi.Migrations
{
    [DbContext(typeof(AuthContext))]
    [Migration("20200514105035_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3");

            modelBuilder.Entity("Auth_DB_Context.Group", b =>
                {
                    b.Property<string>("apiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("name")
                        .HasColumnType("TEXT");

                    b.HasKey("apiId");

                    b.ToTable("Group");
                });

            modelBuilder.Entity("Auth_DB_Context.GroupRoleLink", b =>
                {
                    b.Property<string>("apiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("groupApiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("roleApiId")
                        .HasColumnType("TEXT");

                    b.HasKey("apiId");

                    b.HasIndex("groupApiId");

                    b.HasIndex("roleApiId");

                    b.ToTable("GroupRoleLink");
                });

            modelBuilder.Entity("Auth_DB_Context.Privilege", b =>
                {
                    b.Property<string>("apiId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("add")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("changePrivilege")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("delete")
                        .HasColumnType("INTEGER");

                    b.Property<string>("privilegeOfApiId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("read")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("write")
                        .HasColumnType("INTEGER");

                    b.HasKey("apiId");

                    b.ToTable("Privilege1");
                });

            modelBuilder.Entity("Auth_DB_Context.Role", b =>
                {
                    b.Property<string>("apiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserapiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("defaultPrivilegeapiId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("roleType")
                        .HasColumnType("INTEGER");

                    b.HasKey("apiId");

                    b.HasIndex("UserapiId");

                    b.HasIndex("defaultPrivilegeapiId");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("Auth_DB_Context.RolePrivilegeLink", b =>
                {
                    b.Property<string>("apiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("prigilegApiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("privilegeapiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("roleApiId")
                        .HasColumnType("TEXT");

                    b.HasKey("apiId");

                    b.HasIndex("privilegeapiId");

                    b.HasIndex("roleApiId");

                    b.ToTable("Privilege");
                });

            modelBuilder.Entity("Auth_DB_Context.User", b =>
                {
                    b.Property<string>("apiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("token")
                        .HasColumnType("TEXT");

                    b.HasKey("apiId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Auth_DB_Context.UserRoleLink", b =>
                {
                    b.Property<string>("apiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("role_API_Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("roleapiId")
                        .HasColumnType("TEXT");

                    b.Property<string>("user_API_Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("userapiId")
                        .HasColumnType("TEXT");

                    b.HasKey("apiId");

                    b.HasIndex("roleapiId");

                    b.HasIndex("userapiId");

                    b.ToTable("UserRoleLink");
                });

            modelBuilder.Entity("Auth_DB_Context.GroupRoleLink", b =>
                {
                    b.HasOne("Auth_DB_Context.Group", "group")
                        .WithMany()
                        .HasForeignKey("groupApiId");

                    b.HasOne("Auth_DB_Context.Role", "role")
                        .WithMany()
                        .HasForeignKey("roleApiId");
                });

            modelBuilder.Entity("Auth_DB_Context.Role", b =>
                {
                    b.HasOne("Auth_DB_Context.User", null)
                        .WithMany("roles")
                        .HasForeignKey("UserapiId");

                    b.HasOne("Auth_DB_Context.Privilege", "defaultPrivilege")
                        .WithMany()
                        .HasForeignKey("defaultPrivilegeapiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Auth_DB_Context.RolePrivilegeLink", b =>
                {
                    b.HasOne("Auth_DB_Context.Privilege", "privilege")
                        .WithMany()
                        .HasForeignKey("privilegeapiId");

                    b.HasOne("Auth_DB_Context.Role", "role")
                        .WithMany()
                        .HasForeignKey("roleApiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Auth_DB_Context.UserRoleLink", b =>
                {
                    b.HasOne("Auth_DB_Context.Role", "role")
                        .WithMany()
                        .HasForeignKey("roleapiId");

                    b.HasOne("Auth_DB_Context.User", "user")
                        .WithMany()
                        .HasForeignKey("userapiId");
                });
#pragma warning restore 612, 618
        }
    }
}
