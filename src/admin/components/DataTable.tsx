import React, { useState, type ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  keyExtractor: (item: T) => string;
  expandableRow?: (row: T) => ReactNode;
}

function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyMessage = "No data available",
  keyExtractor,
  expandableRow,
}: DataTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
        <div className="p-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2563eb] border-r-transparent" />
          <p className="mt-4 text-gray-400">Loading data...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  const renderCell = (row: T, column: Column<T>): ReactNode => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    const value = row[column.accessor];
    if (value === null || value === undefined) {
      return <span className="text-gray-500">-</span>;
    }
    if (typeof value === "boolean") {
      return (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            value
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {value ? "Yes" : "No"}
        </span>
      );
    }
    return String(value);
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-800/50">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 ${
                    column.className || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.map((row) => {
              const rowId = keyExtractor(row);
              const isExpanded = expandedRows.has(rowId);
              return (
                <React.Fragment key={rowId}>
                  <tr
                    onClick={() => expandableRow && toggleRow(rowId)}
                    className={`transition ${expandableRow ? "cursor-pointer hover:bg-gray-800/50" : "hover:bg-gray-800/30"} ${isExpanded ? "bg-gray-800/20" : ""}`}
                  >
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={`px-6 py-4 text-sm text-white ${
                      column.className || ""
                    }`}
                  >
                    {renderCell(row, column)}
                  </td>
                ))}
              </tr>
              {expandableRow && isExpanded && (
                <tr className="bg-gray-900/50 border-b border-gray-800/50">
                  <td colSpan={columns.length} className="px-6 py-4">
                    {expandableRow(row)}
                  </td>
                </tr>
              )}
            </React.Fragment>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;