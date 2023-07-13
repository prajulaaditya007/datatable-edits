import React from "react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const RowActions: React.FC<Props> = ({ onEdit, onDelete }) => {
  return (
    <div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default RowActions;
