import React, { useCallback } from 'react';

import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import clsx from 'clsx';

type Props = {
  columns: {
    key: string;
    title: string;
    align?: 'right' | 'left' | 'center';
  }[];
  rows: {
    [key: string]: any;
  }[];
  page: number;
  limit: number;
  count?: number;
  onPageChange?: (newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  placeholder?: string;
  className?: string;
};

export default function Table({
  columns,
  rows,
  page,
  limit,
  count,
  onPageChange,
  onRowsPerPageChange,
  placeholder,
  className,
}: Props) {
  const getRowKey = useCallback(
    (row: (typeof rows)[0]) => {
      if ('id' in row) {
        return row.id;
      }
      return row[columns[0].key];
    },
    [columns],
  );

  return (
    <>
      <TableContainer className={clsx([className])}>
        <MuiTable sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  align={column.align ? column.align : 'left'}
                  key={`${column.title}-${index}`}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? (
              rows.map(row => (
                <TableRow
                  key={getRowKey(row)}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {columns.map((column, index) => (
                    <TableCell
                      align={column.align ? column.align : 'left'}
                      key={`${getRowKey(row)}-${column.key}-${index}`}
                    >
                      {row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <p className="text-center py-20 text-muted-foreground">
                    {placeholder || 'No data'}
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {!!count && count > limit && (
        <TablePagination
          component="div"
          count={count || 0}
          onPageChange={(_, newPage) => onPageChange?.(newPage)}
          onRowsPerPageChange={e =>
            onRowsPerPageChange?.(parseInt(e.target.value, 10))
          }
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </>
  );
}
