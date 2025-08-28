import { cn } from "../../../utils/cn";
import ListItemColumn from "../List/TWListItemColumn";
import ListItem from "../List/TWListItem";

const Table = {
  Table: ({ children, className = "" }) => {
    const tableClasses = cn(
      "flex flex-col border border-gray-200 overflow-hidden border-collapse w-full",
      className
    );

    return <div className={tableClasses}>{children}</div>;
  },
  Header: ({ children, columns = "", className = "", ...props }) => {
    const headerClasses = cn(
      "bg-ifm-background-color-secondary font-bold text-sm text-ifm-text-color py-4 px-2",
      className
    );

    return (
      <ListItem defaultColumns={columns} className={headerClasses} {...props}>
        {children}
      </ListItem>
    );
  },
  HeaderCell: ({ children, align = "left", className = "", ...props }) => {
    const headerCellClasses = cn(
      "text-left font-bold text-sm px-2",
      "not-last:!border-r border-gray-200",
      className
    );

    return (
      <ListItemColumn align={align} className={headerCellClasses} {...props}>
        {children}
      </ListItemColumn>
    );
  },
  Row: ({ children, columns = "", className = "", ...props }) => {
    const rowClasses = cn("odd:!bg-ifm-background-color-secondary py-1 px-2", className);

    return (
      <ListItem defaultColumns={columns} className={rowClasses} {...props}>
        {children}
      </ListItem>
    );
  },
  Cell: ({ children, align = "left", className = "", ...props }) => {
    const cellClasses = cn(
      "not-last:!border-r border-gray-200 px-2",
      className
    );
    return (
      <ListItemColumn align={align} className={cellClasses} {...props}>
        {children}
      </ListItemColumn>
    );
  },
};

export default Table;
