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
    display: "flex",
    flexDirection: "column",
    backgroundColor: "yellow",
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

  const { staffName, staffId, staffReporting, startDate, endDate } = rowData;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Edit Dates"
    >
      <div>
        <h2>Edit Dates</h2>
        <div>
          <label>Staff Name:</label>
          <span>{staffName}</span>
        </div>
        <div>
          <label>Staff ID:</label>
          <span>{staffId}</span>
        </div>
        <div>
          <label>Staff Reporting:</label>
          <span>{staffReporting}</span>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="text"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
          />
        </div>
        <button onClick={onUpdate}>Update</button>
      </div>
    </Modal>
  );
};

export default RowModal;
