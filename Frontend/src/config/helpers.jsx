import React from 'react';
import { useSnapshot } from 'valtio';
import { download } from '../assets';
import state from '../store';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DownloadButton = ({ logoDecal, fullDecal}) => {
  const snap = useSnapshot(state);

  const handleDownloadImage = () => {

    const color = snap.color ? snap.color : "default-color";
    const fileName = `tshirt-${color}.pdf`;

    html2canvas(document.body).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

      pdf.setFontSize(16);
      pdf.text(`T-Shirt Color: ${color}`, 10, 10);

      pdf.addPage();

      pdf.addImage(logoDecal, 'PNG', 5, 10, 100, 100);
      pdf.text("logo", 45, 10);
      pdf.addImage(fullDecal, 'PNG', 110, 10, 100, 100);
      pdf.text("full texture", 145, 10);

      
      pdf.save(fileName);
    });
  };


  return (
    <button onClick={handleDownloadImage} className="flex items-center bg-blue-500 py-2 px-2 rounded-3xl shadow hover:bg-blue-600">
      <img src={download} alt="Download" className="w-7 h-6 m-1" />
    </button>
  );
};

export default DownloadButton;


export const getContrastingColor = (color) => {

  const hexColor = color.replace('#', '');

  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? '#000000' : '#FFFFFF';
};

export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
