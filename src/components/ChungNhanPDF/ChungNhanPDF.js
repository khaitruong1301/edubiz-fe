import React from "react";
import "./ChungNhan.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ContentChungNhan from "./ContentChungNhan";
export default function ChungNhanPDF({ chungNhan, userInfor }) {
  return (
    <div>
      <PDFDownloadLink
        document={
          <ContentChungNhan chungNhan={chungNhan} userInfor={userInfor} />
        }
        fileName="cybersoft.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <p className="hover:text-white">Xem chứng nhận</p>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}
