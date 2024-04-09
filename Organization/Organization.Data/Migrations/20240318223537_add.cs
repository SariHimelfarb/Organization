using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Organization.Data.Migrations
{
    /// <inheritdoc />
    public partial class add : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Employees_EmployeeId",
                table: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_Positions_EmployeeId",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Positions");

            migrationBuilder.AddColumn<int>(
                name: "EmloyeeId",
                table: "Positions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Positions_EmloyeeId",
                table: "Positions",
                column: "EmloyeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Employees_EmloyeeId",
                table: "Positions",
                column: "EmloyeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Employees_EmloyeeId",
                table: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_Positions_EmloyeeId",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "EmloyeeId",
                table: "Positions");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "Positions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Positions_EmployeeId",
                table: "Positions",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Employees_EmployeeId",
                table: "Positions",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
