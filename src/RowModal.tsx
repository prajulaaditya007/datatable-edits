import React from "react";
import Modal from "react-modal";

interface Participant {
  staffName: string;
  staffId: string;
  staffReporting: string;
  startDate: string;
  endDate: string;
}

interface Advisor {
  advisorName: string;
  advisorId: string;
  participantDist: Participant[];
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
  },
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rowData: (Advisor & Participant) | null;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onUpdate: () => void;
}

const RowModal: React.FC<Props> = ({
  isOpen,
  onClose,
  rowData,
  onStartDateChange,
  onEndDateChange,
  onUpdate,
}) => {
  if (!rowData) return null;

  const {
    advisorName,
    advisorId,
    staffName,
    staffId,
    staffReporting,
    startDate,
    endDate,
  } = rowData;

  const handleCancel = () => {
    onClose();
    onStartDateChange("");
    onEndDateChange("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Edit Dates"
    >
      <div>
        <h2>Edit Dates</h2>
        <hr />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <label>Advisor Name:</label>
          <span>{advisorName}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <label>Advisor Name:</label>
          <span>{advisorId}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <label>Staff Name:</label>
          <span>{staffName}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <label>Staff ID:</label>
          <span>{staffId}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <label>Staff Reporting:</label>
          <span>{staffReporting}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
          />
        </div>
        <div style={{ textAlign: "right" }}>
          <button onClick={onUpdate}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default RowModal;
