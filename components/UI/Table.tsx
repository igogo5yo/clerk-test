import { flexRender, useReactTable } from "@tanstack/react-table";
import { getCoreRowModel } from "@tanstack/table-core";
import { ColumnDef } from "@tanstack/table-core/src/types";
import styles from '../../styles/Table.module.css';

export interface ITableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
}


function Table<T>({ data, columns }: ITableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
            </th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody className={styles.tbody}>
      {table.getRowModel().rows.length ? table.getRowModel().rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      )) : <tr><td className={styles.noData} colSpan={4}>No members</td></tr>}
      </tbody>
    </table>
  )
}

export default Table;
