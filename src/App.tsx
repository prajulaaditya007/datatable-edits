import React from "react";
import TableComponent4 from "./TableComponent4";
import TableComponent from "./TableComponent";

const data = {
  advisors: [
    {
      advisorName: "John Doe",
      advisorId: "AD001",
      participantDist: [
        {
          staffName: "Alice Smith",
          staffId: "ST001",
          staffReporting: "John Snow",
          startDate: "2022-01-01",
          endDate: "2022-12-31",
        },
        {
          staffName: "Bob Johnson",
          staffId: "ST002",
          staffReporting: "Ned Stark",
          startDate: "2023-01-01",
          endDate: "2023-06-30",
        },
      ],
    },
    {
      advisorName: "Jane Smith",
      advisorId: "AD002",
      participantDist: [
        {
          staffName: "Emily Brown",
          staffId: "ST003",
          staffReporting: "Sarah Jones",
          startDate: "2022-03-15",
          endDate: "2023-02-28",
        },
        {
          staffName: "Michael Davis",
          staffId: "ST004",
          staffReporting: "Andrew Miller",
          startDate: "2023-04-01",
          endDate: "2023-12-31",
        },
      ],
    },
  ],
};

const App: React.FC = () => {
  return (
    <div className="App">
      <TableComponent advisors={data.advisors} />
      <br />
      <hr />
      <TableComponent4 advisors={data.advisors} />
    </div>
  );
};

export default App;
