import React, { useState } from "react";
import DataTable from "react-data-table-component";
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

interface Props {
  advisors: Advisor[];
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

const TableComponent3: React.FC<Props> = ({ advisors }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Participant | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const columns = [
    {
      name: "Staff Name",
      selector: (row: Participant) => row.staffName,
      sortable: true,
    },
    {
      name: "Staff ID",
      selector: (row: Participant) => row.staffId,
      sortable: true,
    },
    {
      name: "Staff Reporting",
      selector: (row: Participant) => row.staffReporting,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row: Participant) => row.startDate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row: Participant) => row.endDate,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Participant) => (
        <div>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleEdit = (row: Participant) => {
    setSelectedRow(row);
    setStartDate(row.startDate);
    setEndDate(row.endDate);
    setModalIsOpen(true);
  };

  const handleDelete = (row: Participant) => {
    const updatedAdvisors = advisors.map((advisor) => {
      advisor.participantDist = advisor.participantDist.filter(
        (participant) => participant.staffId !== row.staffId
      );
      return advisor;
    });
    setModalIsOpen(false);
    setStartDate("");
    setEndDate("");
    setSelectedRow(null);
  };

  const handleUpdate = () => {
    if (selectedRow) {
      const updatedAdvisors = advisors.map((advisor) => {
        if (advisor.participantDist.includes(selectedRow)) {
          advisor.participantDist = advisor.participantDist.map(
            (participant) => {
              if (participant === selectedRow) {
                participant.startDate = startDate;
                participant.endDate = endDate;
              }
              return participant;
            }
          );
        }
        return advisor;
      });
      setModalIsOpen(false);
      setStartDate("");
      setEndDate("");
      setSelectedRow(null);
    }
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setStartDate("");
    setEndDate("");
    setSelectedRow(null);
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={advisors.flatMap((advisor) => advisor.participantDist)}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
        contentLabel="Edit Dates"
      >
        {selectedRow && (
          <div>
            <h2>Edit Dates</h2>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button onClick={handleUpdate}>Update</button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TableComponent3;
