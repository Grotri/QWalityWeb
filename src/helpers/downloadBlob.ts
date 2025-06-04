export const downloadBlob = (blob: Blob | string, filename: string) => {
  let finalBlob: Blob;

  if (typeof blob === "string" && filename.endsWith(".csv")) {
    const fixedCsv = blob.replace(/,/g, ";");
    const BOM = "\uFEFF";
    finalBlob = new Blob([BOM + fixedCsv], { type: "text/csv;charset=utf-8;" });
  } else if (typeof blob === "string") {
    finalBlob = new Blob([blob]);
  } else {
    finalBlob = blob;
  }

  const url = window.URL.createObjectURL(finalBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};
