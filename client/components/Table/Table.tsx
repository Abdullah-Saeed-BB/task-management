"use client";
import { useState } from "react";
import TableFilter from "./TableFilter";
import TableDeleteAction from "./TableDeleteAction";
import TableTd from "./TableTd";
import TableViewAction from "./TableViewAction";
import Link from "next/link";

type Props = {
  columns: string[];
  title: string;
  children: Function;
  data: Object[];
  filter?: { label: string; name: string; logic: { [key: string]: boolean } };
  deleteAction?: Function;
  viewAction?: string;
  create?: boolean;
};

function Table({
  columns,
  title,
  children,
  data,
  filter,
  deleteAction,
  viewAction,
  create,
}: Props) {
  // const [items, setItems] = useState(data);

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-bold text-slate-700">
          {title} ({data.length})
        </h2>
        <div className="flex gap-2">
          {/* {filter ? (
            <TableFilter filter={filter} setItems={setItems} data={data} />
          ) : (
            <></>
          )} */}
          {create ? (
            <Link
              className="bg-blue-500 text-white rounded-md text-center px-3 py-2 text-sm uppercase"
              href={`${viewAction}/create`}
            >
              Create
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-slate-200 space-x-6">
            {columns.map((c: string) => (
              <th
                key={c}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        {data.length ? (
          <tbody className="*:border-b">
            {data.map((item: any, i: number) => (
              <tr key={i}>
                {children(item)}
                <TableTd isAction={true}>
                  {viewAction ? (
                    <TableViewAction link={`${viewAction}/${item.id}`} />
                  ) : (
                    <></>
                  )}
                  {deleteAction ? (
                    <TableDeleteAction
                      id={item.id}
                      deleteAction={deleteAction}
                    />
                  ) : (
                    <></>
                  )}
                </TableTd>
              </tr>
            ))}
          </tbody>
        ) : (
          <tfoot>
            <tr>
              <td
                colSpan={columns.length}
                className="p-10 text-center text-xl text-slate-600"
              >
                No rows to display
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

export default Table;
