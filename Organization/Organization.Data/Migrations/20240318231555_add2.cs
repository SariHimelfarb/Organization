using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Organization.Data.Migrations
{
    /// <inheritdoc />
    public partial class add2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Employees_EmloyeeId",
                table: "Positions");

            migrationBuilder.RenameColumn(
                name: "EmloyeeId",
                table: "Positions",
                newName: "EmployeeId");

            migrationBuilder.RenameIndex(
                name: "IX_Positions_EmloyeeId",
                table: "Positions",
                newName: "IX_Positions_EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Employees_EmployeeId",
                table: "Positions",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Employees_EmployeeId",
                table: "Positions");

            migrationBuilder.RenameColumn(
                name: "EmployeeId",
                table: "Positions",
                newName: "EmloyeeId");

            migrationBuilder.RenameIndex(
                name: "IX_Positions_EmployeeId",
                table: "Positions",
                newName: "IX_Positions_EmloyeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Employees_EmloyeeId",
                table: "Positions",
                column: "EmloyeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
