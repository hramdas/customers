import { Pagination as PaginationComponent } from '@mui/material';
import React from 'react';
const style = { padding: '20px', display: 'flex', justifyContent: 'right' };
export default function Pagination({ handlePage, page, limit, listCount }) {
  const count = Math.ceil(listCount / limit) || 1;
  console.log( page, limit, listCount)
  return <PaginationComponent
      sx={style}
      count={count}
      page={page}
      onChange={handlePage}
    />
  
}