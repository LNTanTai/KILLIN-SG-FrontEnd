import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@mui/material'
import { style } from '@mui/system'
import React from 'react'

const index = () => {
  return (
    <div className='cart-container'>
      <h1 style={{paddingLeft: '40px'}}>Your shopping cart</h1>
      <div className='cart'>
        <div className='cart-1'>
          <div className='cart-table'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '400px' }}>Item</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell style={{ width: '400px' }}>Sản phẩm abc</TableCell>
                <TableCell>10$</TableCell>
                <TableCell>10</TableCell>
                <TableCell>100$</TableCell>
              </TableBody>
            </Table>
          </div>
          <div className='cart-1-button'>
            <Button variant="contained" color="success">Update cart</Button>
          </div>
        </div>
        <div className='cart-2'>
          <div className='cart-table'>
            <Table>
            <TableBody>
              <TableCell>Total Items: </TableCell>
              <TableCell>10$  </TableCell>
            </TableBody>
            <TableBody>
              <TableCell>Tax total: </TableCell>
              <TableCell>1$ </TableCell>
            </TableBody>
            <TableBody>
              <TableCell>Total Bill: </TableCell>
              <TableCell>1000$</TableCell>
            </TableBody>
          </Table>
          </div>
          <div>
            <Button variant='contained' style={{width: '270px'}}>Check out</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index

