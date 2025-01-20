import React from 'react'
import { Table } from 'antd'
import { createStyles } from 'antd-style'
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token
  return {
    customTable: css`
      .ant-table-content {
        min-height: auto; /* Đặt chiều cao tối thiểu  480px*/
        padding-bottom: 10px;
        overflow-y: hidden;
      }
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  }
})

const TableAdmin = ({ columns, dataSource, loading, pagination, onTableChange, rowSelection, onRow, rowClassName }) => {
  const { styles } = useStyle()
  return (
    <Table
      className={`${styles.customTable}`}
      onRow={onRow}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      onChange={onTableChange}
      rowClassName={rowClassName}
      rowKey='id'
      scroll={{
        x: 'max-content',
      }}
    />
  )
}

export default TableAdmin
