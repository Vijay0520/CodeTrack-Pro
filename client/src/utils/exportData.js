import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// ================= PDF =================
export const exportPDF = (problems) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("CodeTrack-Pro Problems", 14, 20);

  const tableData = problems.map((problem) => [
    problem.title,
    problem.difficulty,
    problem.topic,
    problem.company,
    problem.status,
    problem.solvedAt
      ? new Date(problem.solvedAt).toLocaleDateString()
      : "-",
  ]);

  autoTable(doc, {
    head: [["Title", "Difficulty", "Topic", "Company", "Status", "Solved Date"]],
    body: tableData,
    startY: 30,
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: [41, 128, 185],
    },
  });

  doc.save("CodeTrack-Pro.pdf");
};

// ================= Excel =================
export const exportExcel = (problems) => {
  const data = problems.map((problem) => ({
    Title: problem.title,
    Difficulty: problem.difficulty,
    Topic: problem.topic,
    Company: problem.company,
    Status: problem.status,
    "Solved Date": problem.solvedAt
      ? new Date(problem.solvedAt).toLocaleDateString()
      : "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Problems");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "CodeTrack-Pro.xlsx");
};