import ActionIcon from "../Button/ActionIconBtn";

interface ActionItem {
  title: string;
  icon: React.ReactNode;
  color?: any;
  onClick: (rowData: any) => void;
}

interface ActionColumnProps {
  rowData: any;
  actions: ActionItem[];
}

const ActionColumn = ({ rowData, actions }: ActionColumnProps) => {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {actions.map((action, index) => (
        <ActionIcon
          key={index}
          title={action.title}
          icon={action.icon}
          color={action.color}
          size="small"
          sx={{ marginRight: "10px" }}
          onClick={() => action.onClick(rowData)}
        />
      ))}
    </div>
  );
};

export default ActionColumn;
