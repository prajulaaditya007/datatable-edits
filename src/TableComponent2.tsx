import React from "react";
import DataTable from "react-data-table-component";

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

const TableComponent2: React.FC<Props> = ({ advisors }) => {
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
  ];

  return (
    <DataTable
      columns={columns}
      data={advisors.flatMap((advisor) => advisor.participantDist)}
    />
  );
};

export default TableComponent2;
