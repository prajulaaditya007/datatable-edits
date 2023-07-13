import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import RowActions from "./RowActions";
import RowModal from "./RowModal";

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

const TableComponent: React.FC<Props> = ({ advisors }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Participant | null>(null);
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

  const handleEdit = (row: Participant) => {
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

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

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
      cell: (row: Participant) => (
        <RowActions
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row)}
        />
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={tableData} />
      <RowModal
        isOpen={modalIsOpen}
        onClose={handleModalClose}
        rowData={selectedRow}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default TableComponent;
