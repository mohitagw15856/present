/** Wire a button to build a PDF on demand (jsPDF loaded lazily) and save it. Nothing leaves the device. */
export function pdfButton(btn, build, filename) {
  const label = btn.textContent;
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.textContent = 'Drawing…';
    try {
      const { jsPDF } = await import('jspdf');
      const doc = await build(jsPDF);
      doc.save(typeof filename === 'function' ? filename() : filename);
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  });
}

/** Save any blob as a file. */
export function saveBlob(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
