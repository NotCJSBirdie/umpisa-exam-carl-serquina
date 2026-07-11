import React from 'react'

export interface Column<T> {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string | number
}

export function DataTable<T>({ data, columns, keyExtractor }: DataTableProps<T>) {
  return (
    <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200 text-sm text-left'>
          <thead className='bg-gray-50 text-gray-700 font-medium'>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className='px-6 py-4 whitespace-nowrap'>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 text-gray-600'>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className='px-6 py-8 text-center text-gray-400'
                >
                  No data available.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className='hover:bg-gray-50 transition-colors'
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className='px-6 py-4 whitespace-nowrap'>
                      {typeof col.accessor === 'function'
                        ? col.accessor(item)
                        : (item[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
