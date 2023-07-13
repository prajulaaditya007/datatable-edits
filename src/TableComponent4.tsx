import React, { useState, useEffect } from "react";
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
    display: "flex",
    flexDirection: "column",
  },
};

const TableComponent: React.FC<Props> = ({ advisors }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<
    (Advisor & Participant) | null
  >(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableData, setTableData] = useState<Participant[]>([]);

  useEffect(() => {
    const flattenedData = advisors.flatMap((advisor) =>
      advisor.participantDist.map((participant) => ({
        ...participant,
        advisorName: advisor.advisorName,
        advisorId: advisor.advisorId,
      }))
    );
    setTableData(flattenedData);
  }, [advisors]);

  const columns = [
    {
      name: "Advisor Name",
      selector: (row: Advisor) => row.advisorName,
      sortable: true,
    },
    {
      name: "Advisor ID",
      selector: (row: Advisor) => row.advisorId,
      sortable: true,
    },
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
      cell: (row: Participant & Advisor) => (
        <div>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleEdit = (row: Participant & Advisor) => {
    setSelectedRow(row);
    setStartDate(row.startDate);
    setEndDate(row.endDate);
    setModalIsOpen(true);
  };

  const handleDelete = (row: Participant) => {
    const updatedData = tableData.filter((participant) => participant !== row);
    setTableData(updatedData);
    setModalIsOpen(false);
    setStartDate("");
    setEndDate("");
    setSelectedRow(null);
  };

  const handleUpdate = () => {
    if (selectedRow) {
      const updatedData = tableData.map((participant) => {
        if (participant === selectedRow) {
          participant.startDate = startDate;
          participant.endDate = endDate;
        }
        return participant;
      });
      setTableData(updatedData);
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
      <DataTable columns={columns} data={tableData} />
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
              <label>Advisor Name:</label>
              <span>{selectedRow.advisorName}</span>
            </div>
            <div>
              <label>Advisor Name:</label>
              <span>{selectedRow.advisorId}</span>
            </div>
            <div>
              <label>Staff Name:</label>
              <span>{selectedRow.staffName}</span>
            </div>
            <div>
              <label>Staff ID:</label>
              <span>{selectedRow.staffId}</span>
            </div>
            <div>
              <label>Staff Reporting:</label>
              <span>{selectedRow.staffReporting}</span>
            </div>
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

export default TableComponent;
